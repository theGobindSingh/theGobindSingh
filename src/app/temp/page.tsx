import ColorShowcase from "@app/temp/color-showcase";

/* ── data ── */

const SEMANTIC: [string, string, string][] = [
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

const FONTS = [
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

const TYPE_SCALE: [string, string, string][] = [
  ["Display Hero", "--fs-display-hero", "clamp(3rem, 14vw, 16rem)"],
  ["Display Section", "--fs-display-section", "clamp(2.5rem, 8vw, 9rem)"],
  ["4XL", "--fs-4xl", "3.75rem"],
  ["3XL", "--fs-3xl", "3.25rem"],
  ["2XL", "--fs-2xl", "2.75rem"],
  ["1XL", "--fs-1xl", "2.25rem"],
  ["L", "--fs-l", "1.875rem"],
  ["M", "--fs-m", "1.5rem"],
  ["S", "--fs-s", "1.25rem"],
  ["1XS", "--fs-1xs", "1.125rem"],
  ["2XS", "--fs-2xs", "1rem"],
  ["3XS", "--fs-3xs", "0.875rem"],
  ["4XS", "--fs-4xs", "0.75rem"],
];

const SPACING: [string, string, number][] = [
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

const MISC: { title: string; rows: [string, string][] }[] = [
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

/* ── micro-components ── */

const SectionHead = ({ label, id }: { label: string; id?: string }) => {
  return (
    <div
      id={id}
      className="mb-12 border-t-2 border-[var(--color-border-strong)] pt-6"
    >
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] opacity-30">
        {label}
      </span>
    </div>
  );
};

const Row = ({
  left,
  right,
  hint = "",
}: {
  left: string;
  right: string;
  hint?: string;
}) => {
  return (
    <div className="flex items-baseline gap-4 border-b border-[var(--color-border)] py-2.5 font-mono text-[13px]">
      <span className="w-64 shrink-0 font-medium">{left}</span>
      <span className="opacity-45">{right}</span>
      {hint !== "" ? (
        <span className="ml-auto shrink-0 text-[11px] opacity-20">{hint}</span>
      ) : null}
    </div>
  );
};

const TempPage = () => {
  return (
    <main className="mx-auto max-w-[var(--container-max)] px-[var(--gutter)] pb-40 pt-24">
      {/* ── Hero ── */}
      <header className="mb-24">
        <span className="mb-6 block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] opacity-20">
          globals.css Reference
        </span>
        <h1 className="overflow-hidden font-[var(--ff-display)] text-[72px] leading-[0.95] tracking-[-0.02em] lg:text-[112px]">
          Design
          <br />
          Tokens
        </h1>
        <p className="mt-10 max-w-xl font-mono text-sm leading-relaxed opacity-30">
          Every color, type scale, spacing step, radius, z-index, and motion
          value defined in the project. Hover any swatch to inspect &middot;
          click to copy its CSS variable.
        </p>
      </header>

      {/* ── Color Palette ── */}
      <SectionHead label="01 &mdash; Color Palette" id="colors" />
      <ColorShowcase />

      {/* ── Semantic Roles ── */}
      <SectionHead label="02 &mdash; Semantic Roles" id="semantic" />
      {SEMANTIC.map(([label, maps, role]) => {
        return <Row key={label} left={label} right={maps} hint={role} />;
      })}

      {/* ── Typography ── */}
      <SectionHead label="03 &mdash; Typography" id="typography" />

      {/* font specimens */}
      <div className="mb-14 grid gap-px bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-5">
        {FONTS.map((font) => {
          return (
            <div key={font.label} className="bg-[var(--color-bg)] p-8">
              <span className="mb-5 block font-mono text-[10px] font-medium uppercase tracking-[0.12em] opacity-20">
                {font.label}
              </span>
              <p
                className="mb-4 text-[56px] leading-[0.9]"
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight,
                  fontStyle: font.style,
                }}
              >
                Aa
              </p>
              <p className="font-mono text-xs opacity-35">
                {font.name} &middot; {font.weight}
                {font.style === "italic" ? " italic" : ""}
              </p>
            </div>
          );
        })}
      </div>

      {/* type scale */}
      <div>
        {TYPE_SCALE.map(([label, cssVar, value]) => {
          return (
            <div
              key={cssVar}
              className="group border-b border-[var(--color-border)] py-6"
            >
              <div className="mb-2 flex items-baseline gap-4 font-mono text-[11px] opacity-25">
                <span className="w-12 text-right font-medium">{label}</span>
                <span className="w-56">{cssVar}</span>
                <span>{value}</span>
              </div>
              <p
                className="truncate leading-[1.2]"
                style={{ fontSize: `var(${cssVar})` }}
              >
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Spacing ── */}
      <SectionHead label="04 &mdash; Spacing" id="spacing" />
      <div>
        {SPACING.map(([label, value, px]) => {
          return (
            <div
              key={label}
              className="flex items-center gap-4 border-b border-[var(--color-border)] py-3.5 font-mono text-[13px]"
            >
              <span className="w-36 shrink-0 font-medium">{label}</span>
              <div className="flex flex-1 items-center">
                <span
                  className="h-3 shrink-0"
                  style={{
                    width: `${Math.min(px, 160)}px`,
                    backgroundColor: "var(--color-accent-500)",
                    opacity: 0.3,
                  }}
                />
              </div>
              <span className="shrink-0 opacity-35">{value}</span>
            </div>
          );
        })}
      </div>

      {/* ── Misc Tokens ── */}
      <SectionHead
        label="05 &mdash; Radii, Z-Index, Motion, Borders &amp; Layout"
        id="misc"
      />
      <div className="grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {MISC.map((group) => {
          return (
            <div key={group.title}>
              <h3 className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] opacity-20">
                {group.title}
              </h3>
              {group.rows.map(([l, r]) => {
                return <Row key={l} left={l} right={r} />;
              })}
            </div>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div className="mt-32 border-t-2 border-[var(--color-border-strong)] pt-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-10">
          &mdash; end of token reference &mdash;
        </span>
      </div>
    </main>
  );
};

export default TempPage;
