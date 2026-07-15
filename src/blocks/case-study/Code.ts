import type { Block } from "payload";

export const CaseStudyCodeBlock: Block = {
  slug: "code",
  interfaceName: "CaseStudyCodeBlock",
  labels: { singular: "Code", plural: "Code" },
  fields: [
    { name: "src", type: "textarea", required: true },
    { name: "language", type: "text" },
  ],
};
