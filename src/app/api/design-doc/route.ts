import { readFile } from "node:fs/promises";
import path from "node:path";

export const GET = async () => {
  const file = await readFile(
    path.join(process.cwd(), "docs", "DESIGN.md"),
    "utf-8",
  );

  return new Response(file, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'attachment; filename="DESIGN.md"',
    },
  });
};
