import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mammoth from "mammoth";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SOURCES = [
  {
    documentId: "business-plan",
    documentTitle: "Las Cruces Culinary Innovation Hub Comprehensive Business Plan",
    sourceFileName: "Las-Cruces-Culinary-Hub-Business-Plan-Combined-Financials-and-Strategy-Updated.docx",
    filePath: path.join(
      root,
      "private",
      "docs",
      "Las-Cruces-Culinary-Hub-Business-Plan-Combined-Financials-and-Strategy-Updated.docx",
    ),
  },
  {
    documentId: "incubator-playbook",
    documentTitle: "Food Hall Incubator Operations Playbook",
    sourceFileName: "Food-Hall-Incubator-Operations-Playbook-Concept-to-Graduation.docx",
    filePath: path.join(
      root,
      "private",
      "docs",
      "Food-Hall-Incubator-Operations-Playbook-Concept-to-Graduation.docx",
    ),
  },
  {
    documentId: "commercial-kitchen-manual",
    documentTitle: "Commercial Kitchen Operations Manual",
    sourceFileName: "Commercial-Kitchen-Operations-Manual-Full-Workflow.docx",
    filePath: path.join(
      root,
      "private",
      "docs",
      "Commercial-Kitchen-Operations-Manual-Full-Workflow.docx",
    ),
  },
];

function slugify(value) {
  const slug = value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || "section";
}

function isHeading(line) {
  if (line.length > 120) return false;
  if (/^(section|appendix|supplement|phase|step|chapter|part)\s+[\w.:-]+/i.test(line)) return true;
  if (/^\d+(\.\d+)*\s+[\w(]/.test(line)) return true;
  if (/^[A-Z][A-Z0-9 /&().,'’:-]{8,}$/.test(line) && !line.includes("|")) return true;
  return false;
}

function splitIntoSections(text, source) {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sections = [];
  let current = {
    title: "Overview",
    level: 2,
    lines: [],
  };

  for (const line of lines) {
    if (isHeading(line) && current.lines.length > 0) {
      sections.push(current);
      current = { title: line, level: /^\d+\.\d+/.test(line) ? 3 : 2, lines: [] };
    } else if (isHeading(line) && current.lines.length === 0 && current.title === "Overview") {
      current.title = line;
      current.level = /^\d+\.\d+/.test(line) ? 3 : 2;
    } else {
      current.lines.push(line);
    }
  }

  if (current.lines.length > 0) sections.push(current);

  const seen = new Map();
  return sections.map((section, index) => {
    const base = slugify(`${source.documentId}-${section.title}`);
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);

    return {
      id: count ? `${base}-${count + 1}` : base,
      documentId: source.documentId,
      documentTitle: source.documentTitle,
      sourceFileName: source.sourceFileName,
      title: section.title,
      level: section.level,
      content: section.lines.join("\n"),
      order: index,
    };
  });
}

function chunkSection(section, startOrder) {
  const paragraphs = section.content.split("\n").filter(Boolean);
  const chunks = [];
  let buffer = [];
  let size = 0;

  function flush() {
    if (buffer.length === 0) return;
    chunks.push({
      id: `${section.id}-chunk-${chunks.length}`,
      documentId: section.documentId,
      documentTitle: section.documentTitle,
      sourceFileName: section.sourceFileName,
      sectionId: section.id,
      sectionTitle: section.title,
      heading: section.title,
      text: buffer.join("\n"),
      order: startOrder + chunks.length,
    });
    buffer = [];
    size = 0;
  }

  for (const paragraph of paragraphs) {
    const nextSize = size + paragraph.length;
    if (nextSize > 2200 && buffer.length > 0) flush();
    buffer.push(paragraph);
    size += paragraph.length;
  }

  flush();
  return chunks;
}

async function extractSource(source) {
  const result = await mammoth.extractRawText({ path: source.filePath });
  return splitIntoSections(result.value, source);
}

const documents = [];
const sections = [];
const chunks = [];

for (const source of SOURCES) {
  const extractedSections = await extractSource(source);
  documents.push({
    id: source.documentId,
    title: source.documentTitle,
    sourceFileName: source.sourceFileName,
    sectionIds: extractedSections.map((section) => section.id),
  });
  sections.push(...extractedSections);
}

sections.forEach((section) => {
  chunks.push(...chunkSection(section, chunks.length));
});

const corpus = {
  title: "Las Cruces Culinary Innovation Hub Diligence Library",
  generatedAt: new Date().toISOString(),
  documents,
  sections,
  chunks,
};

await fs.mkdir(path.join(root, "data"), { recursive: true });
await fs.writeFile(path.join(root, "data", "business-plan.json"), `${JSON.stringify(corpus)}\n`);

console.log(
  `Generated business-plan corpus with ${documents.length} documents, ${sections.length} sections, and ${chunks.length} chunks.`,
);
