import {
  convertLexicalToHTML,
  type HTMLConvertersFunction,
} from "@payloadcms/richtext-lexical/html";

import type {
  CalloutGridBlock,
  CodeBlock,
  QuoteBlock,
  RawHtmlBlock,
  TableBlock,
} from "@/payload-types";

import type { BlogOutlineItem } from "./types";

type LexicalContent = Parameters<typeof convertLexicalToHTML>[0]["data"];

const WORDS_PER_MINUTE = 200;

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

const extractText = (node: unknown): string => {
  if (!node || typeof node !== "object") return "";
  const record = node as Record<string, unknown>;
  if (typeof record.text === "string") return record.text;
  if (Array.isArray(record.children)) {
    return record.children.map(extractText).join("");
  }
  return "";
};

const escapeHtml = (raw: string): string => {
  return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const renderQuoteBlock = (fields: QuoteBlock): string => {
  const citation = fields.citation
    ? `<cite>${escapeHtml(fields.citation)}</cite>`
    : "";
  return `<blockquote>${escapeHtml(fields.quote)}${citation}</blockquote>`;
};

const renderCodeBlock = (fields: CodeBlock): string => {
  const lines = escapeHtml(fields.code)
    .split("\n")
    .map((line) => {
      return `<span class="code-line">${line}</span>`;
    })
    .join("\n");
  const langClass = fields.language ? ` language-${fields.language}` : "";
  return `<pre><code class="code-block${langClass}">${lines}</code></pre>`;
};

const renderTableBlock = (fields: TableBlock): string => {
  const headRow = fields.headers
    .map((header) => {
      return `<th>${escapeHtml(header.label)}</th>`;
    })
    .join("");
  const bodyRows = fields.rows
    .map((row) => {
      const cells = row.cells
        .map((cell) => {
          return `<td>${escapeHtml(cell.value)}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");
  return `<table><thead><tr>${headRow}</tr></thead><tbody>${bodyRows}</tbody></table>`;
};

const renderCalloutGridBlock = (fields: CalloutGridBlock): string => {
  const items = fields.items
    .map((item) => {
      const className = item.accent ? "callout callout-accent" : "callout";
      return `<div class="${className}"><h4>${escapeHtml(item.heading)}</h4><p>${escapeHtml(item.body)}</p></div>`;
    })
    .join("");
  return `<div class="callout-grid">${items}</div>`;
};

/**
 * Renders Payload Lexical content to HTML, giving every h2 a stable,
 * deduped anchor id and collecting them as an outline for the sticky nav —
 * mirrors the previous markdown renderer's heading behavior.
 */
export const renderLexicalContent = (
  content: LexicalContent,
): { html: string; outline: BlogOutlineItem[]; plainText: string } => {
  const outline: BlogOutlineItem[] = [];
  const seenIds = new Map<string, number>();

  const converters: HTMLConvertersFunction = ({ defaultConverters }) => {
    return {
      ...defaultConverters,
      heading: ({ node, nodesToHTML, providedStyleTag }) => {
        const tag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tag)
          ? node.tag
          : "h1";
        const text = extractText(node);
        const baseId = slugify(text);
        const count = seenIds.get(baseId) ?? 0;
        seenIds.set(baseId, count + 1);
        const id = count === 0 ? baseId : `${baseId}-${count}`;

        if (tag === "h2") {
          outline.push({ id, text });
        }

        const children = nodesToHTML({ nodes: node.children }).join("");
        return `<${tag} id="${id}"${providedStyleTag}>${children}</${tag}>`;
      },
      blocks: {
        quote: ({ node }: { node: { fields: QuoteBlock } }) => {
          return renderQuoteBlock(node.fields);
        },
        code: ({ node }: { node: { fields: CodeBlock } }) => {
          return renderCodeBlock(node.fields);
        },
        table: ({ node }: { node: { fields: TableBlock } }) => {
          return renderTableBlock(node.fields);
        },
        calloutGrid: ({ node }: { node: { fields: CalloutGridBlock } }) => {
          return renderCalloutGridBlock(node.fields);
        },
        rawHtml: ({ node }: { node: { fields: RawHtmlBlock } }) => {
          return node.fields.html;
        },
      },
    };
  };

  const html = convertLexicalToHTML({ data: content, converters });
  const plainText = content.root.children.map(extractText).join(" ");

  return { html, outline, plainText };
};

export const readingTimeFor = (plainText: string): string => {
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
};
