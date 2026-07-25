import type { Field } from "payload";

export const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

export const slugField = (urlHint: string): Field => {
  return {
    name: "slug",
    type: "text",
    required: true,
    unique: true,
    index: true,
    admin: {
      description: `Used in the URL: ${urlHint}. Leave blank to generate from title.`,
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (value) return slugify(value);
          if (data?.title) return slugify(data.title as string);
          return value;
        },
      ],
    },
  };
};
