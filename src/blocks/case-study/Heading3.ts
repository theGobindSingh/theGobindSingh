import type { Block } from "payload";

export const Heading3Block: Block = {
  slug: "h3",
  interfaceName: "CaseStudyHeading3Block",
  labels: { singular: "Heading", plural: "Headings" },
  fields: [{ name: "src", type: "text", required: true }],
};
