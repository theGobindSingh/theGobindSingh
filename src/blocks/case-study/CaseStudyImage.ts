import type { Block } from "payload";

export const CaseStudyImageBlock: Block = {
  slug: "image",
  interfaceName: "CaseStudyImageBlock",
  labels: { singular: "Image", plural: "Images" },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "alt", type: "text", required: true },
    {
      name: "aspect",
      type: "select",
      options: [
        { label: "Square", value: "square" },
        { label: "Video", value: "video" },
      ],
    },
  ],
};
