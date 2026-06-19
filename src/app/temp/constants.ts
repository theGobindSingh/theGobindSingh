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

export const FONTS = [
  {
    label: "Display",
    family: "var(--ff-display)",
    name: "Anton",
    weight: "400",
    style: "normal",
  },
  {
    label: "Sans",
    family: "var(--ff-sans)",
    name: "Space Grotesk",
    weight: "500",
    style: "normal",
  },
  {
    label: "Serif",
    family: "var(--ff-serif)",
    name: "Newsreader",
    weight: "400",
    style: "italic",
  },
  {
    label: "Mono",
    family: "var(--ff-mono)",
    name: "DM Mono",
    weight: "500",
    style: "normal",
  },
  {
    label: "Cursive",
    family: "var(--ff-cursive)",
    name: "Caveat",
    weight: "600",
    style: "normal",
  },
];

export const ALL_TYPE_SCALE: [string, string, string, string][] = [
  ["Display Hero", "--fs-display-hero", "clamp(3rem, 14vw, 16rem)", "fs-*"],
  [
    "Display Section",
    "--fs-display-section",
    "clamp(2.5rem, 8vw, 9rem)",
    "fs-*",
  ],
  ["9XL", "--text-9xl", "4.5rem", "text-*"],
  ["4XL", "--fs-4xl", "3.75rem", "fs-*"],
  ["8XL", "--text-8xl", "3.75rem", "text-*"],
  ["3XL", "--fs-3xl", "3.25rem", "fs-*"],
  ["7XL", "--text-7xl", "3rem", "text-*"],
  ["2XL", "--fs-2xl", "2.75rem", "fs-*"],
  ["1XL", "--fs-1xl", "2.25rem", "fs-*"],
  ["Headline", "--text-headline", "var(--fs-1xl) → 2.25rem", "text-* alias"],
  ["6XL", "--text-6xl", "2.25rem", "text-*"],
  ["L", "--fs-l", "1.875rem", "fs-*"],
  ["5XL", "--text-5xl", "1.875rem", "text-*"],
  ["M", "--fs-m", "1.5rem", "fs-*"],
  ["Title", "--text-title", "var(--fs-m) → 1.5rem", "text-* alias"],
  ["4XL", "--text-4xl", "1.5rem", "text-*"],
  ["S", "--fs-s", "1.25rem", "fs-*"],
  ["3XL", "--text-3xl", "1.25rem", "text-*"],
  ["1XS", "--fs-1xs", "1.125rem", "fs-*"],
  ["2XL", "--text-2xl", "1.125rem", "text-*"],
  ["2XS", "--fs-2xs", "1rem", "fs-*"],
  ["XL", "--text-xl", "1rem", "text-*"],
  ["3XS", "--fs-3xs", "0.875rem", "fs-*"],
  ["LG", "--text-lg", "0.875rem", "text-*"],
  ["4XS", "--fs-4xs", "0.75rem", "fs-*"],
  ["Base", "--text-base", "0.75rem", "text-*"],
  ["SM", "--text-sm", "0.6875rem", "text-*"],
  ["XS", "--text-xs", "0.625rem", "text-*"],
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

export const MISC: { title: string; rows: [string, string][] }[] = [
  {
    title: "Radii",
    rows: [
      ["--radius-none", "0px"],
      ["--radius-sm", "2px"],
      ["--radius-pill", "9999px"],
    ],
  },
  {
    title: "Z-Index",
    rows: [
      ["--z-grid", "0"],
      ["--z-content", "10"],
      ["--z-overlay", "40"],
      ["--z-nav", "50"],
      ["--z-wipe", "9998"],
      ["--z-cursor", "9999"],
    ],
  },
  {
    title: "Motion",
    rows: [
      ["--dur-fast", "0.2s"],
      ["--dur-base", "0.3s"],
      ["--dur-slow", "0.5s"],
      ["--dur-reveal", "0.7s"],
      ["--ease-out", "cubic-bezier(0.16, 1, 0.3, 1)"],
      ["--ease-inout", "cubic-bezier(0.65, 0, 0.35, 1)"],
    ],
  },
  {
    title: "Borders",
    rows: [
      ["--border-hairline", "1px"],
      ["--border-strong", "2px"],
    ],
  },
  {
    title: "Layout",
    rows: [
      ["--container-max", "1800px"],
      ["--content-max", "1400px"],
      ["--gutter", "clamp(1.5rem, 4vw, 3rem)"],
      ["--section-pad-y", "clamp(6rem, 12vw, 12rem)"],
      ["--leading-display", "0.8"],
      ["--tracking-display", "-0.02em"],
    ],
  },
];
