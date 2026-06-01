import { businessPlan } from "./data";
import type { BusinessPlanChunk } from "./types";

const STOP_WORDS = new Set([
  "about",
  "after",
  "also",
  "and",
  "any",
  "are",
  "ask",
  "can",
  "cruces",
  "does",
  "document",
  "explain",
  "for",
  "from",
  "have",
  "how",
  "into",
  "its",
  "las",
  "more",
  "plan",
  "question",
  "review",
  "room",
  "say",
  "tell",
  "that",
  "the",
  "this",
  "what",
  "when",
  "where",
  "which",
  "with",
  "would",
]);

const TOPIC_BOOSTS: Record<string, string[]> = {
  incubator: [
    "incubator",
    "cohort",
    "vendor lifecycle",
    "selection",
    "academy",
    "mentor",
    "mentorship",
    "graduation",
    "graduate",
    "semilla",
    "mariposa",
  ],
  kitchen: [
    "kitchen",
    "commercial kitchen",
    "commissary",
    "shared-use",
    "shared use",
    "sanitation",
    "food safety",
    "nmed",
    "compliance",
    "haccp",
    "sop",
    "cleaning",
    "inspection",
  ],
  investor: [
    "investment",
    "investor",
    "revenue",
    "ebitda",
    "grant",
    "capital",
    "sba",
    "risk",
    "return",
  ],
};

function tokenize(value: string) {
  const tokens = value
    .toLowerCase()
    .replace(/[^a-z0-9$%.-]+/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));

  return Array.from(
    new Set(tokens.flatMap((token) => (token.endsWith("s") ? [token, token.slice(0, -1)] : [token]))),
  );
}

function scoreChunk(chunk: BusinessPlanChunk, queryTokens: string[]) {
  const text = `${chunk.documentTitle} ${chunk.sectionTitle} ${chunk.heading} ${chunk.text}`.toLowerCase();
  const sectionTitle = chunk.sectionTitle.toLowerCase();
  const documentTitle = chunk.documentTitle.toLowerCase();
  let score = 0;

  for (const token of queryTokens) {
    if (text.includes(token)) score += 1;
    if (sectionTitle.includes(token)) score += 2;
    if (documentTitle.includes(token)) score += 2;
  }

  for (const terms of Object.values(TOPIC_BOOSTS)) {
    const topicIsAsked = terms.some((term) => queryTokens.includes(term) || queryTokens.includes(term.replace(/\s+/g, "-")));
    if (!topicIsAsked) continue;

    for (const term of terms) {
      if (text.includes(term)) score += 3;
      if (sectionTitle.includes(term)) score += 4;
      if (documentTitle.includes(term)) score += 5;
    }
  }

  return score;
}

export function retrieveRelevantChunks(question: string, limit = 12) {
  const queryTokens = Array.from(new Set(tokenize(question)));
  if (queryTokens.length === 0) return [];

  const matches = businessPlan.chunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, queryTokens) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.chunk.order - b.chunk.order)
    .map((result) => result.chunk);

  const substantiveMatches = matches.filter(
    (chunk) => chunk.sectionId !== "cover-and-table-of-contents",
  );

  const ranked = substantiveMatches.length ? substantiveMatches : matches;
  const selected: BusinessPlanChunk[] = [];
  const seenDocuments = new Set<string>();

  for (const chunk of ranked) {
    if (selected.length >= Math.min(3, limit) && seenDocuments.has(chunk.documentId)) continue;
    selected.push(chunk);
    seenDocuments.add(chunk.documentId);
    if (selected.length >= limit) return selected;
  }

  for (const chunk of ranked) {
    if (selected.includes(chunk)) continue;
    selected.push(chunk);
    if (selected.length >= limit) break;
  }

  return selected;
}

export function formatChunksForPrompt(chunks: BusinessPlanChunk[]) {
  return chunks
    .map(
      (chunk, index) =>
        `[Source ${index + 1}: ${chunk.documentTitle} | ${chunk.sectionTitle} | documentId=${chunk.documentId} | sectionId=${chunk.sectionId}]\n${chunk.text}`,
    )
    .join("\n\n---\n\n");
}
