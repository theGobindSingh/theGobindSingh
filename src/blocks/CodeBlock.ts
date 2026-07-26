import type { Block } from "payload";

export const CodeBlock: Block = {
  slug: "code",
  interfaceName: "CodeBlock",
  labels: { singular: "Code", plural: "Code blocks" },
  fields: [
    {
      name: "code",
      type: "textarea",
      required: true,
    },
    {
      name: "language",
      type: "text",
      admin: {
        description: "e.g. ts, tsx, bash, css, json",
      },
    },
  ],
};
