/**
 * One-off migration: reads the legacy public/blogs/*.md posts and creates
 * matching entries in the Payload `blogs` collection.
 *
 * Plain markdown converts via `convertMarkdownToLexical`. The legacy posts
 * also embed raw HTML for things Lexical has no markdown syntax for
 * (blockquote+cite, fenced code, GFM tables, an inline SVG diagram, a
 * callout grid) — those chunks are parsed out and turned into the matching
 * custom Lexical Blocks (see src/blocks/) instead of being escaped as text.
 *
 * Run once with: npx payload run scripts/migrate-blogs.ts
 */
import config from "@payload-config";
import {
  convertMarkdownToLexical,
  defaultEditorFeatures,
  sanitizeServerEditorConfig,
} from "@payloadcms/richtext-lexical";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getPayload } from "payload";

import { BlogsContentEditorFeatures } from "@/collections/Blogs";
import type { Blog } from "@/payload-types";

interface LegacyFrontmatter {
  title: string;
  date: string;
  updated?: string;
  tags: string[];
  excerpt: string;
  cover?: string;
  featured?: boolean;
  seo?: { title?: string; description?: string; ogImage?: string };
}

type LexicalChildren = Blog["content"]["root"]["children"];
type SanitizedEditorConfig = Awaited<
  ReturnType<typeof sanitizeServerEditorConfig>
>;

const BLOG_DIR = path.join(process.cwd(), "public/blogs");

const blockNode = (
  blockType: string,
  fields: Record<string, unknown>,
): LexicalChildren[number] => {
  return {
    type: "block",
    version: 2,
    format: "",
    fields: { blockType, ...fields },
  };
};

const parseQuoteChunk = (lines: string[]) => {
  const raw = lines.join("\n");
  const quote = /<span>([\s\S]*?)<\/span>/.exec(raw)?.[1]?.trim() ?? "";
  const citation = /<cite>([\s\S]*?)<\/cite>/.exec(raw)?.[1]?.trim();
  return blockNode("quote", { quote, ...(citation ? { citation } : {}) });
};

const parseCodeChunk = (lines: string[]) => {
  const language = /^```(\S*)/.exec(lines[0] ?? "")?.[1] ?? undefined;
  const code = lines.slice(1, -1).join("\n");
  return blockNode("code", { code, ...(language ? { language } : {}) });
};

const parseTableChunk = (lines: string[]) => {
  const toCells = (line: string) => {
    return line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => {
        return cell.trim();
      });
  };
  const headers = toCells(lines[0] ?? "").map((label) => {
    return { label };
  });
  const rows = lines.slice(2).map((line) => {
    return {
      cells: toCells(line).map((value) => {
        return { value };
      }),
    };
  });
  return blockNode("table", { headers, rows });
};

const parseFigureChunk = (lines: string[]) => {
  return blockNode("rawHtml", { html: lines.join("\n") });
};

const parseCalloutGridChunk = (lines: string[]) => {
  const raw = lines.join("\n");
  const itemPattern =
    /<div class="callout( callout-accent)?">\s*<h4>([\s\S]*?)<\/h4>\s*<p>([\s\S]*?)<\/p>\s*<\/div>/g;
  const items = Array.from(raw.matchAll(itemPattern)).map((match) => {
    return {
      accent: Boolean(match[1]),
      heading: (match[2] ?? "").trim(),
      body: (match[3] ?? "").trim(),
    };
  });
  return blockNode("calloutGrid", { items });
};

/**
 * Splits legacy markdown into plain-text chunks (converted via
 * `convertMarkdownToLexical`) and raw-HTML chunks for constructs Lexical
 * markdown parsing doesn't understand, mapping the latter to custom Blocks.
 */
const parseMarkdownToLexicalChildren = (
  markdown: string,
  editorConfig: SanitizedEditorConfig,
): LexicalChildren => {
  const lines = markdown.split("\n");
  const children: LexicalChildren = [];
  let plainBuffer: string[] = [];

  const flushPlain = () => {
    const text = plainBuffer.join("\n").trim();
    plainBuffer = [];
    if (!text) return;
    const state = convertMarkdownToLexical({ editorConfig, markdown: text });
    children.push(...(state.root.children as LexicalChildren));
  };

  const consumeUntil = (
    startIndex: number,
    isEnd: (line: string) => boolean,
  ) => {
    const collected: string[] = [];
    let index = startIndex;
    while (index < lines.length) {
      const line = lines[index] ?? "";
      collected.push(line);
      if (isEnd(line)) break;
      index += 1;
    }
    return { collected, nextIndex: index + 1 };
  };

  /** Consumes lines while tracking `<div>` nesting depth, stopping once the opening div at `startIndex` closes. */
  const consumeDivBlock = (startIndex: number) => {
    const collected: string[] = [];
    let depth = 0;
    let index = startIndex;
    while (index < lines.length) {
      const line = lines[index] ?? "";
      collected.push(line);
      depth += (line.match(/<div\b/g) ?? []).length;
      depth -= (line.match(/<\/div>/g) ?? []).length;
      index += 1;
      if (depth <= 0) break;
    }
    return { collected, nextIndex: index };
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i] ?? "";

    if (line.startsWith("<blockquote>")) {
      const { collected, nextIndex } = consumeUntil(i, (l) => {
        return l.includes("</blockquote>");
      });
      flushPlain();
      children.push(parseQuoteChunk(collected));
      i = nextIndex;
      continue;
    }

    if (line.startsWith("```")) {
      const { collected, nextIndex } = consumeUntil(i + 1, (l) => {
        return l.trim() === "```";
      });
      flushPlain();
      children.push(parseCodeChunk([line, ...collected]));
      i = nextIndex;
      continue;
    }

    if (line.startsWith("<figure")) {
      const { collected, nextIndex } = consumeUntil(i, (l) => {
        return l.includes("</figure>");
      });
      flushPlain();
      children.push(parseFigureChunk(collected));
      i = nextIndex;
      continue;
    }

    if (line.startsWith('<div class="callout-grid">')) {
      const { collected, nextIndex } = consumeDivBlock(i);
      flushPlain();
      children.push(parseCalloutGridChunk(collected));
      i = nextIndex;
      continue;
    }

    if (/^\|.*\|\s*$/.test(line)) {
      const tableLines: string[] = [];
      let j = i;
      while (j < lines.length && /^\|.*\|\s*$/.test(lines[j] ?? "")) {
        tableLines.push(lines[j] ?? "");
        j += 1;
      }
      flushPlain();
      children.push(parseTableChunk(tableLines));
      i = j;
      continue;
    }

    plainBuffer.push(line);
    i += 1;
  }

  flushPlain();
  return children;
};

const run = async () => {
  const payload = await getPayload({ config });
  const editorConfig = await sanitizeServerEditorConfig(
    {
      features: BlogsContentEditorFeatures({
        defaultFeatures: defaultEditorFeatures,
      }),
    },
    payload.config,
  );

  const files = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter((file) => {
        return file.endsWith(".md");
      })
    : [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter<LegacyFrontmatter>(raw);

    const existing = await payload.find({
      collection: "blogs",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`Skipping "${slug}" — already exists`);
      continue;
    }

    const children = parseMarkdownToLexicalChildren(content, editorConfig);
    const richText = {
      root: {
        type: "root",
        children,
        direction: null,
        format: "",
        indent: 0,
        version: 1,
      },
    } as unknown as Blog["content"];

    await payload.create({
      collection: "blogs",
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: richText,
        tags: data.tags ?? [],
        featured: data.featured ?? false,
        publishedDate: new Date(data.date).toISOString(),
        ...(data.updated
          ? { updatedDate: new Date(data.updated).toISOString() }
          : {}),
        ...(data.seo
          ? {
              seo: {
                ...(data.seo.title ? { title: data.seo.title } : {}),
                ...(data.seo.description
                  ? { description: data.seo.description }
                  : {}),
              },
            }
          : {}),
      },
    });

    console.log(`Migrated "${slug}"`);
  }
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
