import { marked, Renderer } from "marked";

export interface OutlineItem {
  id: string;
  text: string;
}

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

const escapeHtml = (raw: string): string => {
  return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

/**
 * Parses markdown to HTML while giving every h2 a stable, deduped anchor id
 * and collecting them as an outline for the article's sticky nav.
 */
export const renderMarkdown = (
  content: string,
): { html: string; outline: OutlineItem[] } => {
  const outline: OutlineItem[] = [];
  const seenIds = new Map<string, number>();
  const renderer = new Renderer();

  renderer.heading = ({ tokens, depth, text }) => {
    const baseId = slugify(text);
    const count = seenIds.get(baseId) ?? 0;
    seenIds.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count}`;

    if (depth === 2) {
      outline.push({ id, text });
    }

    return `<h${depth} id="${id}">${renderer.parser.parseInline(tokens)}</h${depth}>`;
  };

  renderer.code = ({ text, lang }) => {
    const numbered = escapeHtml(text)
      .split("\n")
      .map((line) => {
        return `<span class="code-line">${line}</span>`;
      })
      .join("\n");
    const langClass = lang ? ` language-${lang}` : "";

    return `<pre><code class="code-block${langClass}">${numbered}</code></pre>`;
  };

  const html = marked.parse(content, { async: false, renderer });

  return { html, outline };
};
