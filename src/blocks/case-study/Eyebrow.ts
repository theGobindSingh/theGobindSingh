import type { Block } from "payload";

export const EyebrowBlock: Block = {
  slug: "eyebrow",
  interfaceName: "CaseStudyEyebrowBlock",
  labels: { singular: "Eyebrow", plural: "Eyebrows" },
  fields: [
    { name: "src", type: "text", required: true },
    { name: "icon", type: "text" },
  ],
};
