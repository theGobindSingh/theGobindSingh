import type { Block } from "payload";

import { leafBlocks } from "./registry";

export const ContainerBlock: Block = {
  slug: "container",
  interfaceName: "CaseStudyContainerBlock",
  labels: { singular: "Container", plural: "Containers" },
  fields: [
    {
      name: "cols",
      type: "select",
      defaultValue: "1",
      options: [
        { label: "1 column", value: "1" },
        { label: "2 columns", value: "2" },
        { label: "3 columns", value: "3" },
      ],
    },
    { name: "items", type: "blocks", blocks: leafBlocks, required: true },
  ],
};
