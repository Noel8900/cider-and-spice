export type BusinessPlanSection = {
  id: string;
  documentId: string;
  documentTitle: string;
  sourceFileName: string;
  title: string;
  level: number;
  content: string;
  order: number;
};

export type BusinessPlanChunk = {
  id: string;
  documentId: string;
  documentTitle: string;
  sourceFileName: string;
  sectionId: string;
  sectionTitle: string;
  heading: string;
  text: string;
  order: number;
};

export type BusinessPlanDocument = {
  id: string;
  title: string;
  sourceFileName: string;
  sectionIds: string[];
};

export type BusinessPlanData = {
  title: string;
  generatedAt: string;
  documents: BusinessPlanDocument[];
  sections: BusinessPlanSection[];
  chunks: BusinessPlanChunk[];
};

export type BusinessPlanCitation = {
  documentId: string;
  documentTitle: string;
  sectionId: string;
  sectionTitle: string;
};
