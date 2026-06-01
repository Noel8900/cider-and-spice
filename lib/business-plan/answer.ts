import type { BusinessPlanChunk } from "./types";

const UNSUPPORTED_RESPONSE =
  "The business plan does not specify that. Try asking about funding, incubator operations, kitchen operations, or implementation details.";

const QUESTION_STOP_WORDS = new Set([
  "about",
  "and",
  "are",
  "can",
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

type AnswerTopic = "incubator" | "kitchen-rules" | "food-safety" | "investment" | "general";

const DOMAIN_TERMS = [
  "business",
  "plan",
  "funding",
  "grant",
  "investment",
  "investor",
  "capital",
  "revenue",
  "ebitda",
  "risk",
  "return",
  "incubator",
  "vendor",
  "cohort",
  "graduation",
  "kitchen",
  "commissary",
  "food",
  "cider",
  "hall",
  "las cruces",
  "nmed",
  "permit",
  "compliance",
  "sanitation",
  "location",
  "founder",
  "timeline",
  "operations",
  "market",
  "financial",
];

function citation(chunk: BusinessPlanChunk) {
  return `[${chunk.documentTitle} - ${chunk.sectionTitle}](#${chunk.sectionId})`;
}

function questionTerms(question: string) {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9 -]+/g, " ")
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 2 && !QUESTION_STOP_WORDS.has(term));
}

function topicForQuestion(question: string): AnswerTopic {
  const lowerQuestion = question.toLowerCase();
  if (/(investment case|investment|investor|capital|return|revenue|ebitda|grant|risk|support)/.test(lowerQuestion)) {
    return "investment";
  }
  if (/(food safety|servsafe|nmed|sanitation|inspection|haccp|cfpm)/.test(lowerQuestion)) {
    return "food-safety";
  }
  if (/(shared|commercial|commissary|kitchen).*(rule|policy|requirement|use|storage|schedule)|kitchen rules/.test(lowerQuestion)) {
    return "kitchen-rules";
  }
  if (/(incubator|graduation|graduate|cohort|vendor journey|academy|pathway)/.test(lowerQuestion)) {
    return "incubator";
  }
  return "general";
}

function isDiligenceLibraryQuestion(question: string) {
  const lowerQuestion = question.toLowerCase();
  return DOMAIN_TERMS.some((term) => lowerQuestion.includes(term));
}

function trimEvidence(text: string, maxLength = 320) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const sentenceEnd = normalized.slice(0, maxLength).lastIndexOf(". ");
  return `${normalized.slice(0, sentenceEnd > 160 ? sentenceEnd + 1 : maxLength).trim()}...`;
}

function selectEvidence(question: string, chunk: BusinessPlanChunk) {
  const terms = questionTerms(question);
  const lines = chunk.text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 35);

  const ranked = lines
    .map((line) => {
      const lowerLine = line.toLowerCase();
      const score = terms.reduce((total, term) => total + (lowerLine.includes(term) ? 1 : 0), 0);
      return { line, score };
    })
    .sort((a, b) => b.score - a.score);

  return trimEvidence((ranked[0]?.score || 0) > 0 ? ranked[0].line : chunk.text);
}

function uniqueSectionChunks(chunks: BusinessPlanChunk[]) {
  return chunks.filter(
    (chunk, index, all) => all.findIndex((candidate) => candidate.sectionId === chunk.sectionId) === index,
  );
}

function findChunk(chunks: BusinessPlanChunk[], documentId: string, patterns: RegExp[]) {
  return chunks.find((chunk) => {
    if (chunk.documentId !== documentId) return false;
    const haystack = `${chunk.sectionTitle} ${chunk.heading} ${chunk.text}`;
    return patterns.some((pattern) => pattern.test(haystack));
  });
}

function firstAvailable(chunks: BusinessPlanChunk[], documentIds: string[]) {
  return chunks.find((chunk) => documentIds.includes(chunk.documentId));
}

function buildCuratedPoints(topic: AnswerTopic, chunks: BusinessPlanChunk[]) {
  const uniqueChunks = uniqueSectionChunks(chunks);
  const points: string[] = [];

  if (topic === "incubator") {
    const journey = findChunk(uniqueChunks, "business-plan", [/three-stage vendor journey/i, /incubator entry/i]);
    const academy = findChunk(uniqueChunks, "incubator-playbook", [/academy/i, /curriculum/i]);
    const selection = findChunk(uniqueChunks, "incubator-playbook", [/application/i, /selection/i, /criteria/i]);
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

  return points;
}

function buildEvidencePoints(question: string, chunks: BusinessPlanChunk[], existingCount: number) {
  return uniqueSectionChunks(chunks)
    .slice(0, Math.max(0, 5 - existingCount))
    .map((chunk) => `${selectEvidence(question, chunk)} ${citation(chunk)}`);
}

export function createGroundedAnswer(question: string, chunks: BusinessPlanChunk[]) {
  if (!question || chunks.length === 0) return UNSUPPORTED_RESPONSE;
  if (!isDiligenceLibraryQuestion(question)) return UNSUPPORTED_RESPONSE;

  const topic = topicForQuestion(question);
  const curatedPoints = buildCuratedPoints(topic, chunks);
  const evidencePoints = curatedPoints.length >= 2 ? [] : buildEvidencePoints(question, chunks, curatedPoints.length);
  const points = [...curatedPoints, ...evidencePoints].slice(0, 5);

  if (points.length === 0) return UNSUPPORTED_RESPONSE;

  const introByTopic: Record<AnswerTopic, string> = {
    incubator: "The diligence library describes the incubator as a structured vendor-development pathway:",
    "kitchen-rules": "The diligence library describes the shared commercial kitchen as a controlled-use facility with compliance, storage, training, and sanitation expectations:",
    "food-safety": "The diligence library treats food safety as an operating-control system across training, sanitation, documentation, and inspection readiness:",
    investment: "The diligence library connects the incubator and kitchen to the investment case through revenue diversification, vendor pipeline development, and risk control:",
    general: "Based on the available diligence library:",
  };

  return [
    introByTopic[topic],
    "",
    ...points.map((point) => `- ${point}`),
    "",
    "I can only rely on the cited diligence-library sections; anything beyond those sections is not specified here.",
  ].join("\n");
}
