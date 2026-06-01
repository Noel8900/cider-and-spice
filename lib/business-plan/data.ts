import rawBusinessPlan from "@/data/business-plan.json";
import type { BusinessPlanData } from "./types";

export const businessPlan = rawBusinessPlan as BusinessPlanData;

export function getBusinessPlanForReader() {
  return {
    title: businessPlan.title,
    generatedAt: businessPlan.generatedAt,
    documents: businessPlan.documents,
    sections: businessPlan.sections,
  };
}

export function getSectionById(sectionId: string) {
  return businessPlan.sections.find((section) => section.id === sectionId);
}

export function getDocumentById(documentId: string) {
  return businessPlan.documents.find((document) => document.id === documentId);
}
