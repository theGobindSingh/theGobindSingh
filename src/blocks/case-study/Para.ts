import type { Block } from "payload";

export const ParaBlock: Block = {
  slug: "para",
  interfaceName: "CaseStudyParaBlock",
  labels: { singular: "Paragraph", plural: "Paragraphs" },
  fields: [
    { name: "src", type: "textarea", required: true },
    {
      name: "variant",
      type: "select",
      defaultValue: "body",
      options: [
        { label: "Body", value: "body" },
        { label: "Lead", value: "lead" },
      ],
    },
  ],
};
