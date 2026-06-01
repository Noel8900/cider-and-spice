import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type UIMessage,
  type UIMessageChunk,
} from "ai";
import { createGroundedAnswer } from "@/lib/business-plan/answer";
import { hasBusinessPlanAccess } from "@/lib/business-plan/auth";
import { formatChunksForPrompt, retrieveRelevantChunks } from "@/lib/business-plan/retrieval";

export const maxDuration = 60;

const VALID_DOCUMENT_IDS = new Set([
  "all",
  "business-plan",
  "incubator-playbook",
  "commercial-kitchen-manual",
]);

function getLatestUserQuestion(messages: UIMessage[]) {
  const latest = [...messages].reverse().find((message) => message.role === "user");
  if (!latest) return "";

  return latest.parts
    .map((part) => {
      if (part.type === "text") return part.text;
      return "";
    })
    .join(" ")
    .trim();
}

function hasConfiguredModelAccess() {
  return (
    process.env.BUSINESS_PLAN_AI_GATEWAY_ENABLED === "true" &&
    Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN)
  );
}

function createFallbackResponse(answer: string) {
  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      const textId = "fallback-answer";
      writer.write({ type: "text-start", id: textId });
      writer.write({ type: "text-delta", id: textId, delta: answer });
      writer.write({ type: "text-end", id: textId });
      writer.write({ type: "finish", finishReason: "stop" });
    },
  });

  return createUIMessageStreamResponse({ stream: stream as ReadableStream<UIMessageChunk> });
}

export async function POST(req: Request) {
  if (!(await hasBusinessPlanAccess())) {
    return new Response("Unauthorized.", { status: 401 });
  }

  const { messages, documentId } = (await req.json()) as {
    messages: UIMessage[];
    documentId?: string;
  };
  const question = getLatestUserQuestion(messages || []);
  const activeDocumentId = documentId && VALID_DOCUMENT_IDS.has(documentId) ? documentId : "all";
  const chunks = retrieveRelevantChunks(question, 12, activeDocumentId);
  const context = chunks.length
    ? formatChunksForPrompt(chunks)
    : "NO_RELEVANT_CONTEXT: No relevant diligence library sections were retrieved for this question.";

  if (!hasConfiguredModelAccess()) {
    return createFallbackResponse(createGroundedAnswer(question, chunks));
  }

  const result = streamText({
    model: process.env.BUSINESS_PLAN_AI_MODEL || "openai/gpt-5.4",
    system: `You are the Business Plan Review Room assistant for the Las Cruces Culinary Innovation Hub.

You must answer strictly from the DILIGENCE LIBRARY CONTEXT below. The library may include the comprehensive business plan, the food hall incubator operations playbook, and the commercial kitchen operations manual.

Rules:
- Do not use outside knowledge.
- Do not infer facts that are not in the provided context.
- Ignore prior conversation content unless it is repeated in the current diligence library context below.
- If the context does not answer the question, say: "The business plan does not specify that."
- If the context begins with "NO_RELEVANT_CONTEXT", say: "The business plan does not specify that. Try asking about funding, incubator operations, kitchen operations, or implementation details."
- If the context only partially answers the question, answer the supported part and explicitly say what the documents do not specify.
- Keep answers clear, concise, and useful to investors, grant reviewers, donors, vendors, and community partners.
- Cite every substantive factual answer with markdown links to the source sections using this format: [Document Title - Section Title](#section-id).
- Use only document titles, section titles, and sectionId values that appear in the context labels.
- Do not provide legal, tax, lending, or investment advice.

DILIGENCE LIBRARY CONTEXT:
${context}`,
    prompt: question || "Summarize what this review room can answer from the diligence library.",
  });

  return result.toUIMessageStreamResponse();
}
