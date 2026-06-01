import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type UIMessage,
  type UIMessageChunk,
} from "ai";
import { hasBusinessPlanAccess } from "@/lib/business-plan/auth";
import { formatChunksForPrompt, retrieveRelevantChunks } from "@/lib/business-plan/retrieval";
import type { BusinessPlanChunk } from "@/lib/business-plan/types";

export const maxDuration = 60;

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

function toCitation(chunk: BusinessPlanChunk) {
  return `[${chunk.documentTitle} - ${chunk.sectionTitle}](#${chunk.sectionId})`;
}

function getQuestionTerms(question: string) {
  const stopWords = new Set([
    "about",
    "and",
    "are",
    "does",
    "from",
    "how",
    "into",
    "manual",
    "plan",
    "question",
    "the",
    "this",
    "what",
    "with",
  ]);

  return question
    .toLowerCase()
    .replace(/[^a-z0-9 -]+/g, " ")
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 2 && !stopWords.has(term));
}

function trimEvidence(text: string, maxLength = 420) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const sentenceEnd = normalized.slice(0, maxLength).lastIndexOf(". ");
  return `${normalized.slice(0, sentenceEnd > 180 ? sentenceEnd + 1 : maxLength).trim()}...`;
}

function selectEvidence(question: string, chunk: BusinessPlanChunk) {
  const terms = getQuestionTerms(question);
  const candidates = chunk.text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 40);

  const ranked = candidates
    .map((line) => {
      const lowerLine = line.toLowerCase();
      const score = terms.reduce((total, term) => total + (lowerLine.includes(term) ? 1 : 0), 0);
      return { line, score };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score);

  const selected = ranked.length ? ranked[0].line : chunk.text;
  return trimEvidence(selected);
}

function createGroundedFallbackAnswer(question: string, chunks: BusinessPlanChunk[]) {
  if (!question || chunks.length === 0) {
    return "The business plan does not specify that. Try asking about funding, incubator operations, kitchen operations, or implementation details.";
  }

  const uniqueChunks = chunks
    .filter((chunk, index, all) => all.findIndex((candidate) => candidate.sectionId === chunk.sectionId) === index)
    .slice(0, 4);

  const sourceLines = uniqueChunks.map(
    (chunk) => `- ${selectEvidence(question, chunk)} ${toCitation(chunk)}`,
  );

  return [
    "Based on the available diligence library:",
    "",
    ...sourceLines,
    "",
    "The diligence library does not specify details beyond the cited sections.",
  ].join("\n");
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

  const { messages } = (await req.json()) as { messages: UIMessage[] };
  const question = getLatestUserQuestion(messages || []);
  const chunks = retrieveRelevantChunks(question);
  const context = chunks.length
    ? formatChunksForPrompt(chunks)
    : "NO_RELEVANT_CONTEXT: No relevant diligence library sections were retrieved for this question.";

  if (!hasConfiguredModelAccess()) {
    return createFallbackResponse(createGroundedFallbackAnswer(question, chunks));
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
