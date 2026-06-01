import corpus from "../data/business-plan.json" with { type: "json" };

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

const TOPIC_BOOSTS = {
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
  investor: ["investment", "investor", "revenue", "ebitda", "grant", "capital", "sba", "risk", "return"],
};

const CHECKS = [
  {
    question: "How does the incubator graduation pathway work?",
    requiredDocuments: ["incubator-playbook"],
  },
  {
    question: "What are the shared commercial kitchen rules?",
    requiredDocuments: ["commercial-kitchen-manual"],
  },
  {
    question: "What food safety controls are in the kitchen manual?",
    requiredDocuments: ["commercial-kitchen-manual"],
  },
  {
    question: "How do the incubator and kitchen support the investment case?",
    requiredDocuments: ["business-plan", "incubator-playbook", "commercial-kitchen-manual"],
  },
];

function tokenize(value) {
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

function scoreChunk(chunk, queryTokens) {
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
    const topicIsAsked = terms.some(
      (term) => queryTokens.includes(term) || queryTokens.includes(term.replace(/\s+/g, "-")),
    );
    if (!topicIsAsked) continue;

    for (const term of terms) {
      if (text.includes(term)) score += 3;
      if (sectionTitle.includes(term)) score += 4;
      if (documentTitle.includes(term)) score += 5;
    }
  }

  return score;
}

function retrieve(question, limit = 12) {
  const queryTokens = tokenize(question);
  const ranked = corpus.chunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, queryTokens) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.chunk.order - b.chunk.order)
    .map((result) => result.chunk);

  const selected = [];
  const seenDocuments = new Set();

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

let failed = false;

for (const check of CHECKS) {
  const results = retrieve(check.question);
  const documentIds = new Set(results.map((chunk) => chunk.documentId));
  const missing = check.requiredDocuments.filter((documentId) => !documentIds.has(documentId));

  console.log(`\n${check.question}`);
  console.log(results.slice(0, 5).map((chunk) => `- ${chunk.documentId}: ${chunk.sectionTitle}`).join("\n"));

  if (missing.length > 0) {
    failed = true;
    console.error(`Missing expected source document(s): ${missing.join(", ")}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log("\nBusiness plan retrieval smoke checks passed.");
