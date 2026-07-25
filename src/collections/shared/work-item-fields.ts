import type { Field } from "payload";

/**
 * Fields shared by Projects and Freelance — both back the same WorkItem
 * shape in the app (src/data.ts), split into two collections instead of one
 * with a category filter because they're edited and listed independently.
 */
export const workItemFields: Field[] = [
  { name: "description", type: "textarea", required: true },
  { name: "stack", type: "text", hasMany: true, required: true },
  { name: "metrics", type: "text", hasMany: true },
  {
    name: "timeframe",
    type: "text",
    required: true,
    admin: { description: 'Display label, e.g. "2024" or "2026".' },
  },
  {
    name: "sortDate",
    type: "text",
    required: true,
    admin: { description: 'Sort key, "YYYY-MM" (e.g. "2026-03").' },
  },
  { name: "problem", type: "textarea", required: true },
  { name: "approach", type: "textarea", required: true },
  { name: "outcome", type: "textarea", required: true },
  {
    name: "links",
    type: "group",
    fields: [
      { name: "github", type: "text" },
      { name: "live", type: "text" },
    ],
  },
];
