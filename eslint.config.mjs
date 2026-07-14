import config from "@kami-ui/eslint-config/next";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";

/** @type {import("eslint").Linter.Config[]}*/
export default [
  ...config,
  betterTailwindcss.configs["recommended"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "/^_[A-Za-z0-9]+$/" },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true, allowExportNames: ["metadata"] },
      ],
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "better-tailwindcss/no-unknown-classes": [
        "warn",
        {
          ignore: ["^custom:[A-Za-z0-9]+$"],
        },
      ],
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/styles/globals.css",
      },
    },
  },
  {
    ignores: ["src/payload-types.ts", "src/app/(payload)/admin/importMap.js"],
  },
];
