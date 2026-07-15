import type { Block } from "payload";

export const BulletListBlock: Block = {
  slug: "bulletList",
  interfaceName: "CaseStudyBulletListBlock",
  labels: { singular: "Bullet List", plural: "Bullet Lists" },
  fields: [{ name: "items", type: "text", hasMany: true, required: true }],
};
