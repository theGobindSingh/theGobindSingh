import type { Block } from "payload";

export const StatBlock: Block = {
  slug: "stat",
  interfaceName: "CaseStudyStatBlock",
  labels: { singular: "Stat", plural: "Stats" },
  fields: [
    { name: "value", type: "text", required: true },
    { name: "label", type: "text", required: true },
  ],
};
