/**
 * Case study content model, backed by the Payload `case-studies` collection
 * (see src/collections/CaseStudies.ts and src/lib/case-studies/map.ts for the
 * mapping). `sections` is a small recursive block AST: a fixed set of
 * primitive `Block` types composed via `container`, so new layouts are new
 * compositions, not new block types.
 */

export type Block =
  | { type: "para"; src: string; variant?: "body" | "lead" }
  | { type: "numbered-list"; src: string[] }
  | { type: "bullet-list"; src: string[] }
  | { type: "eyebrow"; src: string; icon?: string }
  | { type: "h3"; src: string }
  | { type: "code"; src: string; language?: string }
  | {
      type: "image";
      src: string;
      alt: string;
      aspect?: "square" | "video";
    }
  | {
      type: "simple-card";
      src: { chip?: string; title: string; desc: string };
    }
  | { type: "chip-list"; src: string[] }
  | { type: "stat"; src: { value: string; label: string } }
  | {
      type: "signature";
      src: {
        image?: { src: string; alt: string };
        name: string;
        role: string;
      };
    }
  | { type: "container"; cols?: 1 | 2 | 3; items: Block[] };

export interface CaseStudySection {
  /** Sticky sidebar label, e.g. "The Problem". Numeral prefix ("01.") is derived from array index. */
  sectionTitle: string;
  /** Section headline, e.g. "The friction of scale." Omit if the section has no h2 (e.g. Challenges, Impact, Learnings in the reference). */
  title?: string;
  /** Background treatment. "inverted" = the Impact-style accent block. */
  variant?: "default" | "dim" | "inverted";
  /** "full-width" drops the sticky sidebar + 8-col content split for a full-bleed block (the Impact section in the reference). */
  layout?: "standard" | "full-width";
  items: Block[];
}

export interface CaseStudyTimeframe {
  /** ISO date, e.g. "2025-07-01". */
  start: string;
  /** ISO date, or null if ongoing/present. */
  end: string | null;
}

export type CaseStudyWithSlug = CaseStudy & { slug: string };

export interface CaseStudy {
  title: string;
  description: string;
  client: string | null;
  category: "build" | "rebuild" | "integration" | "frontend";
  role: string;
  stack: string[];
  timeframe: CaseStudyTimeframe;
  coverImage?: string;
  featured?: boolean;
  order?: number;
  links?: { github?: string; live?: string };
  seo?: { title?: string; description?: string; ogImage?: string };
  sections: CaseStudySection[];
}
