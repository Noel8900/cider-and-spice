import { readFile } from "node:fs/promises";
import path from "node:path";
import { hasBusinessPlanAccess } from "@/lib/business-plan/auth";
import { getDocumentById } from "@/lib/business-plan/data";

const DOCUMENT_FILES: Record<string, string> = {
  "business-plan": "Las-Cruces-Culinary-Hub-Business-Plan-Combined-Financials-and-Strategy-Updated.docx",
  "incubator-playbook": "Food-Hall-Incubator-Operations-Playbook-Concept-to-Graduation.docx",
  "commercial-kitchen-manual": "Commercial-Kitchen-Operations-Manual-Full-Workflow.docx",
};

export async function GET(req: Request) {
  if (!(await hasBusinessPlanAccess())) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const documentId = searchParams.get("document") || "business-plan";
  const fileName = DOCUMENT_FILES[documentId];
  const document = getDocumentById(documentId);

  if (!fileName || !document) {
    return Response.json({ error: "Document not found." }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "private", "docs", fileName);
  const file = await readFile(filePath);

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${document.sourceFileName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
