export const heroSection = {
  kicker: "Internal reference",
  title: "One system.\nEvery surface.",
  description:
    "Every color, type step, spacing unit, radius, z-index, and motion value used across this site, pulled straight from globals.css. Hover a swatch to inspect it, click to copy its CSS variable.",
};

export const SEMANTIC: [string, string, string][] = [
  ["--color-bg", "var(--color-grey-50)", "page background"],
  ["--color-surface", "var(--color-grey-200)", "muted panels"],
  ["--color-surface-raised", "var(--color-grey-400)", "cards / elevated"],
  ["--color-text", "var(--color-grey-950)", "primary ink"],
  ["--color-text-muted", "var(--color-grey-800)", "secondary text"],
  ["--color-text-subtle", "var(--color-grey-700)", "captions"],
  ["--color-text-inverse", "var(--color-grey-50)", "text on dark fills"],
  ["--color-border", "hsl(var(--color-grey-700-base)/0.3)", "hairline rules"],
  ["--color-border-strong", "var(--color-grey-700)", "solid borders"],
  ["--color-focus", "var(--color-accent-500)", "focus ring"],
];

export interface FontSpec {
  label: string;
  family: string;
  name: string;
  weight: string;
  style: "normal" | "italic";
  usage: string;
}

export const FONTS: FontSpec[] = [
  {
    label: "Display",
    family: "var(--ff-display)",
    name: "Anton",
    weight: "400",
    style: "normal",
    usage: "homepage hero only",
  },
  {
    label: "Sans",
    family: "var(--ff-sans)",
    name: "Epilogue",
    weight: "500",
    style: "normal",
    usage: "body / UI workhorse",
  },
  {
    label: "Mono",
    family: "var(--ff-mono)",
    name: "JetBrains Mono",
    weight: "500",
    style: "normal",
    usage: "labels, dates, section numbers",
  },
  {
    label: "Serif",
    family: "var(--ff-serif)",
    name: "Newsreader",
    weight: "400",
    style: "italic",
    usage: "editorial / pull-quote emphasis",
  },
  {
    label: "Cursive",
    family: "var(--ff-cursive)",
    name: "Reenie Beanie",
    weight: "400",
    style: "normal",
    usage: "hand-written accent touch",
  },
];

export const TYPE_SCALE: [string, string, string][] = [
  ["4XS", "--fs-4xs", "0.75rem"],
  ["3XS", "--fs-3xs", "0.875rem"],
  ["2XS", "--fs-2xs", "1rem"],
  ["1XS", "--fs-1xs", "1.125rem"],
  ["S", "--fs-s", "1.25rem"],
  ["M", "--fs-m", "1.5rem"],
  ["L", "--fs-l", "1.875rem"],
  ["1XL", "--fs-1xl", "2.25rem"],
  ["2XL", "--fs-2xl", "2.75rem"],
  ["3XL", "--fs-3xl", "3.25rem"],
  ["4XL", "--fs-4xl", "3.75rem"],
];

export const DISPLAY_TYPE_SCALE: [string, string, string][] = [
  ["Display section", "--fs-display-section", "clamp(2.5rem, 8vw, 9rem)"],
  ["Display hero", "--fs-display-hero", "clamp(3rem, 14vw, 16rem)"],
];

export const SPACING: [string, string, number][] = [
  ["--space-1", "0.25rem", 4],
  ["--space-2", "0.5rem", 8],
  ["--space-3", "0.75rem", 12],
  ["--space-4", "1rem", 16],
  ["--space-6", "1.5rem", 24],
  ["--space-8", "2rem", 32],
  ["--space-12", "3rem", 48],
  ["--space-16", "4rem", 64],
  ["--space-24", "6rem", 96],
  ["--space-32", "8rem", 128],
];

export const RADII: [string, string][] = [
  ["--radius-none", "0px"],
  ["--radius-sm", "2px"],
  ["--radius-pill", "9999px"],
];

export const BORDERS: [string, string][] = [
  ["--border-hairline", "1px"],
  ["--border-strong", "2px"],
];

export const Z_INDEX: [string, string][] = [
  ["--z-grid", "0"],
  ["--z-content", "10"],
  ["--z-overlay", "40"],
  ["--z-nav", "50"],
  ["--z-wipe", "9998"],
  ["--z-cursor", "9999"],
];

export const MOTION: [string, string][] = [
  ["--dur-fast", "0.2s"],
  ["--dur-base", "0.3s"],
  ["--dur-slow", "0.5s"],
  ["--dur-reveal", "0.7s"],
  ["--ease-out", "cubic-bezier(0.16, 1, 0.3, 1)"],
  ["--ease-inout", "cubic-bezier(0.65, 0, 0.35, 1)"],
];

export const LAYOUT: [string, string][] = [
  ["--container-max", "1800px"],
  ["--content-max", "1400px"],
  ["--gutter", "clamp(1.5rem, 4vw, 3rem)"],
  ["--section-pad-y", "clamp(6rem, 12vw, 12rem)"],
  ["--leading-display", "0.8"],
  ["--tracking-display", "-0.02em"],
];

export const downloadSection = {
  title: "Take the source.",
  description:
    "The full DESIGN.md that this page renders: brand voice, color and type rationale, spacing and motion principles, written for anyone extending the system without guessing.",
};

export const ctaSection = {
  title: "Read the system in the wild.",
  description:
    "Every token here backs the case studies, the about page, and this one. See it composed, or start a project of your own.",
};
