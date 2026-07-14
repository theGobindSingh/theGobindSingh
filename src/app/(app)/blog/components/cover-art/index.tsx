/**
 * Deterministic abstract line-art used as a cover image fallback when a post
 * has no `cover` in frontmatter. Purely decorative technical/schematic marks
 * (nodes, paths, grid) built from design tokens — no external image request.
 */
const VARIANTS = ["nodes", "circuit", "grid"] as const;

const pickVariant = (slug: string): (typeof VARIANTS)[number] => {
  const hash = slug.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  return VARIANTS[hash % VARIANTS.length] ?? VARIANTS[0];
};

const CoverArt = ({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) => {
  const variant = pickVariant(slug);

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center bg-grey-100 ${className ?? ""}`.trim()}
    >
      <svg viewBox="0 0 400 240" className="size-2/3 text-grey-400" fill="none">
        {variant === "nodes" && (
          <>
            <circle cx="80" cy="120" r="6" className="fill-accent-600" />
            <circle cx="200" cy="60" r="6" stroke="currentColor" />
            <circle cx="200" cy="180" r="6" stroke="currentColor" />
            <circle cx="320" cy="120" r="6" className="fill-accent-600" />
            <path
              d="M86 120H194M206 63 320 116M206 177 320 124"
              stroke="currentColor"
              strokeDasharray="4 4"
            />
          </>
        )}
        {variant === "circuit" && (
          <>
            <rect x="40" y="90" width="60" height="60" stroke="currentColor" />
            <rect
              x="300"
              y="60"
              width="60"
              height="60"
              className="stroke-accent-600"
            />
            <path
              d="M100 120H180V90H300M180 120V150H300"
              stroke="currentColor"
              strokeDasharray="4 4"
            />
            <circle cx="180" cy="120" r="4" className="fill-accent-600" />
          </>
        )}
        {variant === "grid" && (
          <>
            {[0, 1, 2, 3].map((row) => {
              return (
                <line
                  key={`row-${row}`}
                  x1="40"
                  x2="360"
                  y1={60 + row * 40}
                  y2={60 + row * 40}
                  stroke="currentColor"
                />
              );
            })}
            <rect
              x="160"
              y="100"
              width="80"
              height="40"
              className="fill-accent-600/10 stroke-accent-600"
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default CoverArt;
