import type { Block } from "payload";

export const TableBlock: Block = {
  slug: "table",
  interfaceName: "TableBlock",
  labels: { singular: "Table", plural: "Tables" },
  fields: [
    {
      name: "headers",
      type: "array",
      required: true,
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "rows",
      type: "array",
      required: true,
      fields: [
        {
          name: "cells",
          type: "array",
          required: true,
          fields: [{ name: "value", type: "text", required: true }],
        },
      ],
    },
  ],
};
