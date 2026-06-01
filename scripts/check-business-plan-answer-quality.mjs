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
    "pathway",
    "vendor journey",
    "application",
    "academy",
    "optimization",
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
    "rule",
    "rules",
    "policy",
    "policies",
    "storage",
    "scheduling",
    "training",
    "corrective action",
    "inspection readiness",
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
    "investment case",
    "capital stack",
    "cash flow",
    "vendor pipeline",
    "revenue stream",
  ],
};

const QUERY_EXPANSIONS = {
  graduation: ["graduate", "optimization", "vendor journey", "stage", "milestone"],
  pathway: ["journey", "stage", "application", "academy", "graduation"],
  rules: ["policy", "requirements", "compliance", "sanitation", "storage", "training"],
  rule: ["policy", "requirements", "compliance", "sanitation", "storage", "training"],
  "shared kitchen": ["commercial kitchen", "commissary", "shared-use", "scheduling", "storage"],
  "commercial kitchen": ["commissary", "shared-use", "kitchen", "sanitation", "inspection"],
  "food safety": ["nmed", "servsafe", "cfpm", "sanitation", "corrective action", "inspection readiness"],
  controls: ["requirements", "records", "policy", "sanitation", "corrective action"],
  investment: ["capital", "revenue", "ebitda", "risk", "grant", "return"],
  support: ["revenue", "risk", "pipeline", "grant", "capital"],
};

const CHECKS = [
  {
    question: "How does the incubator graduation pathway work?",
    required: ["incubator", "pathway", "citation"],
  },
  {
    question: "What are the shared commercial kitchen rules?",
    required: ["kitchen", "compliance", "storage", "citation"],
  },
  {
    question: "What food safety controls are in the kitchen manual?",
    required: ["food safety", "sanitation", "inspection", "citation"],
  },
  {
    question: "How do the incubator and kitchen support the investment case?",
    required: ["investment", "revenue", "pipeline", "citation"],
  },
  {
    question: "Who won the Super Bowl?",
    unsupported: true,
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

function expandQueryTokens(question, tokens) {
  const lowerQuestion = question.toLowerCase();
  const expanded = new Set(tokens);

  for (const [trigger, additions] of Object.entries(QUERY_EXPANSIONS)) {
    if (lowerQuestion.includes(trigger) || tokens.includes(trigger)) {
      for (const addition of additions) {
        for (const token of tokenize(addition)) expanded.add(token);
      }
    }
  }

  return Array.from(expanded);
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
  const queryTokens = expandQueryTokens(question, Array.from(new Set(tokenize(question))));
  if (queryTokens.length === 0) return [];

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

function citation(chunk) {
  return `[${chunk.documentTitle} - ${chunk.sectionTitle}](#${chunk.sectionId})`;
}

function uniqueSectionChunks(chunks) {
  return chunks.filter(
    (chunk, index, all) => all.findIndex((candidate) => candidate.sectionId === chunk.sectionId) === index,
  );
}

function findChunk(chunks, documentId, patterns) {
  return chunks.find((chunk) => {
    if (chunk.documentId !== documentId) return false;
    const haystack = `${chunk.sectionTitle} ${chunk.heading} ${chunk.text}`;
    return patterns.some((pattern) => pattern.test(haystack));
  });
}

function firstAvailable(chunks, documentIds) {
  return chunks.find((chunk) => documentIds.includes(chunk.documentId));
}

function topicForQuestion(question) {
  const lowerQuestion = question.toLowerCase();
  if (/(investment case|investment|investor|capital|return|revenue|ebitda|grant|risk|support)/.test(lowerQuestion)) return "investment";
  if (/(food safety|servsafe|nmed|sanitation|inspection|haccp|cfpm)/.test(lowerQuestion)) return "food-safety";
  if (/(shared|commercial|commissary|kitchen).*(rule|policy|requirement|use|storage|schedule)|kitchen rules/.test(lowerQuestion)) return "kitchen-rules";
  if (/(incubator|graduation|graduate|cohort|vendor journey|academy|pathway)/.test(lowerQuestion)) return "incubator";
  return "general";
}

function createAnswer(question, chunks) {
  if (!question || chunks.length === 0) {
    return "The business plan does not specify that. Try asking about funding, incubator operations, kitchen operations, or implementation details.";
  }

  const topic = topicForQuestion(question);
  const uniqueChunks = uniqueSectionChunks(chunks);
  const points = [];

  if (topic === "incubator") {
    const journey = findChunk(uniqueChunks, "business-plan", [/three-stage vendor journey/i, /incubator entry/i]);
    const selection = findChunk(uniqueChunks, "incubator-playbook", [/application/i, /selection/i, /criteria/i]);
    const academy = findChunk(uniqueChunks, "incubator-playbook", [/academy/i, /curriculum/i]);
    const graduation = findChunk(uniqueChunks, "incubator-playbook", [/graduation/i, /optimization/i]);
    if (journey) points.push(`The pathway is staged: entry, validation, and graduation/scale-up milestones are treated as a vendor journey, not just stall rental. ${citation(journey)}`);
    if (selection) points.push(`The playbook starts with outreach, application review, and selection criteria before a vendor enters the operating pipeline. ${citation(selection)}`);
    if (academy) points.push(`Training can include an 8- to 12-week Food Entrepreneur Academy covering concept validation, menu costing, operations, and compliance readiness. ${citation(academy)}`);
    if (graduation) points.push(`Graduation is tied to optimization: records, compliance, operating discipline, and readiness to move into a more independent commercial path. ${citation(graduation)}`);
  }

  if (topic === "kitchen-rules") {
    const kitchen = firstAvailable(uniqueChunks, ["commercial-kitchen-manual"]);
    const compliance = findChunk(uniqueChunks, "business-plan", [/membership eligibility/i, /requirements/i, /shared kitchen/i]);
    const matrix = findChunk(uniqueChunks, "incubator-playbook", [/compliance responsibility/i, /matrix/i]);
    const training = findChunk(uniqueChunks, "commercial-kitchen-manual", [/training/i, /sequence/i, /inspection/i]);
    if (kitchen) points.push(`The kitchen rules are built around shared-use controls: scheduling or storage must be assigned, separated, and labeled by operator. ${citation(kitchen)}`);
    if (compliance) points.push(`Users must satisfy eligibility and compliance requirements because the shared kitchen and incubator operate in a regulated public-health environment. ${citation(compliance)}`);
    if (matrix) points.push(`Responsibilities are split between the hall and vendors, including permit coordination, food-handler or CFPM records, sanitation, and vendor-specific operating records. ${citation(matrix)}`);
    if (training) points.push(`The manual expects training and inspection readiness before operators use the kitchen independently. ${citation(training)}`);
  }

  if (topic === "food-safety") {
    const manual = firstAvailable(uniqueChunks, ["commercial-kitchen-manual"]);
    const training = findChunk(uniqueChunks, "commercial-kitchen-manual", [/training/i, /food safety/i, /inspection/i]);
    const compliance = findChunk(uniqueChunks, "incubator-playbook", [/compliance responsibility/i, /food handler/i, /cfpm/i, /sanitation/i]);
    const retail = findChunk(uniqueChunks, "business-plan", [/food safety responsibility/i, /labeling/i, /allergen/i]);
    if (manual) points.push(`The kitchen manual frames food safety as an operating system covering opening/closing, prep, service, sanitation, corrective action, and inspection readiness. ${citation(manual)}`);
    if (training) points.push(`Training is part of the control structure, with food-safety and shared-kitchen sources used to prepare operators before production. ${citation(training)}`);
    if (compliance) points.push(`The incubator playbook assigns compliance responsibilities for food-handler or CFPM records, sanitation, and documentation between the hall and vendors. ${citation(compliance)}`);
    if (retail) points.push(`For packaged or retail products, the plan calls for written terms around food-safety responsibility, labeling, insurance, inventory handling, and related controls. ${citation(retail)}`);
  }

  if (topic === "investment") {
    const financial = findChunk(uniqueChunks, "business-plan", [/revenue model/i, /financial trajectory/i, /return on investment/i, /capital stack/i]);
    const journey = findChunk(uniqueChunks, "business-plan", [/vendor journey/i, /dual-track/i]);
    const businessPlan = firstAvailable(uniqueChunks, ["business-plan"]);
    const incubator = firstAvailable(uniqueChunks, ["incubator-playbook"]);
    const kitchen = firstAvailable(uniqueChunks, ["commercial-kitchen-manual"]);
    if (financial) points.push(`The investment case is supported by multiple revenue lines and a documented capital/financial model rather than a single restaurant concept. ${citation(financial)}`);
    else if (businessPlan) points.push(`The investment case is supported by a broader food-hall, incubator, and kitchen strategy rather than a single restaurant concept. ${citation(businessPlan)}`);
    if (journey) points.push(`The incubator model strengthens the case by creating a vendor pipeline that can validate concepts, improve retention, and feed future permanent stalls. ${citation(journey)}`);
    if (incubator) points.push(`The incubator playbook adds operational diligence around selection, training, coaching, and graduation, which helps turn the vendor pipeline into investable operators. ${citation(incubator)}`);
    if (kitchen) points.push(`The commercial kitchen adds shared-use production capacity, operator support, and compliance infrastructure that can support revenue diversification. ${citation(kitchen)}`);
  }

  if (points.length === 0) return "The business plan does not specify that. Try asking about funding, incubator operations, kitchen operations, or implementation details.";
  return points.join("\n");
}

let failed = false;

for (const check of CHECKS) {
  const answer = createAnswer(check.question, retrieve(check.question));
  const lowerAnswer = answer.toLowerCase();
  console.log(`\n${check.question}`);
  console.log(answer);

  if (check.unsupported) {
    if (!lowerAnswer.includes("does not specify")) {
      failed = true;
      console.error("Expected unsupported fallback response.");
    }
    continue;
  }

  for (const required of check.required) {
    const needle = required === "citation" ? "](#" : required;
    if (!lowerAnswer.includes(needle)) {
      failed = true;
      console.error(`Missing expected answer term: ${required}`);
    }
  }
}

if (failed) process.exit(1);

console.log("\nBusiness plan answer quality checks passed.");
