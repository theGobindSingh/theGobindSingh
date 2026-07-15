import type { Block } from "payload";

export const SignatureBlock: Block = {
  slug: "signature",
  interfaceName: "CaseStudySignatureBlock",
  labels: { singular: "Signature", plural: "Signatures" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "imageAlt", type: "text" },
  ],
};
