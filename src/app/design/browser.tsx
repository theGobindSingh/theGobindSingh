"use client";

import ColorShowcase from "@app/design/color-showcase";
import { Row } from "@app/design/components";
import {
  BORDERS,
  ctaSection,
  DISPLAY_TYPE_SCALE,
  FONTS,
  type FontSpec,
  heroSection,
  LAYOUT,
  MOTION,
  RADII,
  SEMANTIC,
  SPACING,
  TYPE_SCALE,
  Z_INDEX,
} from "@app/design/constants";
import FullWidthWrapper from "@components/full-width-wrapper";
import { Link } from "@components/link";
import RailSection from "@components/rail-section";
import ScrollReveal from "@components/scroll-reveal";
import { useMemo, useState } from "react";

const includes = (query: string, ...fields: string[]): boolean => {
  if (!query) return true;
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const lower = fields.map((f) => {
    return f.toLowerCase();
  });
  return words.every((word) => {
    return lower.some((f) => {
      return f.includes(word);
    });
  });
};

const filtered = <T,>(
  query: string,
  items: readonly T[],
  extract: (item: T) => string[],
): T[] => {
  if (!query) return [...items];
  return items.filter((item) => {
    return includes(query, ...extract(item));
  });
};

const FontSpecimen = ({
  label,
  name,
  family,
  weight,
  style,
  usage,
}: FontSpec) => {
  return (
    <div className="border border-grey-300 bg-grey-100 p-6">
      <span className="mb-5 block font-mono text-(size:--fs-4xs) font-medium tracking-wide text-grey-500 uppercase">
        {label}
      </span>
      <p
        className="mb-4 text-[52px] leading-[0.9] text-grey-900"
        style={{ fontFamily: family, fontWeight: weight, fontStyle: style }}
      >
        Aa
      </p>
      <p className="font-mono text-(size:--fs-4xs) text-grey-700">
        {name} &middot; {weight}
        {style === "italic" ? " italic" : ""}
      </p>
      <p className="mt-1 text-(size:--fs-4xs) text-grey-500">{usage}</p>
    </div>
  );
};

const DesignBrowser = () => {
  const [query, setQuery] = useState("");

  const filteredSemantic = filtered(query, SEMANTIC, ([label, maps, role]) => {
    return [label, maps, role];
  });
  const filteredFonts = filtered(query, FONTS, (f) => {
    return [f.label, f.name, f.family, f.weight, f.style, f.usage];
  });
  const filteredType = filtered(query, TYPE_SCALE, ([label, cssVar, value]) => {
    return [label, cssVar, value];
  });
  const filteredDisplayType = filtered(
    query,
    DISPLAY_TYPE_SCALE,
    ([label, cssVar, value]) => {
      return [label, cssVar, value];
    },
  );
  const filteredSpacing = filtered(query, SPACING, ([label, value, px]) => {
    return [label, value, String(px)];
  });
  const filteredRadii = filtered(query, RADII, ([l, r]) => {
    return [l, r];
  });
  const filteredBorders = filtered(query, BORDERS, ([l, r]) => {
    return [l, r];
  });
  const filteredMotion = filtered(query, MOTION, ([l, r]) => {
    return [l, r];
  });
  const filteredZIndex = filtered(query, Z_INDEX, ([l, r]) => {
    return [l, r];
  });
  const filteredLayout = filtered(query, LAYOUT, ([l, r]) => {
    return [l, r];
  });

  const showTypography =
    filteredFonts.length > 0 ||
    filteredType.length > 0 ||
    filteredDisplayType.length > 0;
  const showElevation = filteredRadii.length > 0 || filteredBorders.length > 0;
  const showMotion = filteredMotion.length > 0 || filteredZIndex.length > 0;

  const noResults = useMemo(() => {
    return (
      query !== "" &&
      filteredSemantic.length === 0 &&
      !showTypography &&
      filteredSpacing.length === 0 &&
      !showElevation &&
      !showMotion &&
      filteredLayout.length === 0
    );
  }, [
    query,
    filteredSemantic.length,
    showTypography,
    filteredSpacing.length,
    showElevation,
    showMotion,
    filteredLayout.length,
  ]);

  return (
    <main>
      {/* ── Hero ── */}
      <FullWidthWrapper
        element="section"
        className="grid grid-cols-1 gap-8 py-24 md:grid-cols-12"
        wrapperProps={{
          "aria-label": "Design system reference",
          id: "design-hero",
        }}
      >
        <div className="flex flex-col justify-start md:col-span-4">
          <p className="mb-4 font-mono text-(size:--fs-3xs) font-medium tracking-widest text-grey-500 uppercase">
            {heroSection.kicker}
          </p>
          <hr className="border-grey-300" />
        </div>
        <div className="flex flex-col gap-8 md:col-span-8">
          <h1 className="max-w-2xl text-(size:--fs-3xl) leading-[0.95] font-extrabold tracking-[-0.03em] text-balance text-grey-900">
            {heroSection.title.split("\n").map((line, i) => {
              return (
                <span key={line} className="block">
                  {i === 1 ? (
                    <span className="text-accent-500">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              );
            })}
          </h1>
          <p className="max-w-xl text-(size:--fs-1xs) text-grey-700">
            {heroSection.description}
          </p>
          <div className="max-w-md">
            <label htmlFor="design-search" className="sr-only">
              Search tokens
            </label>
            <input
              id="design-search"
              type="text"
              value={query}
              onChange={(e) => {
                return setQuery(e.target.value);
              }}
              placeholder="Search tokens (accent, 500, radius, ease)…"
              className="
                w-full border-0 border-b border-grey-300 bg-transparent py-3
                text-(size:--fs-1xs) text-grey-900 outline-offset-4
                transition-colors duration-(--dur-base) ease-out placeholder:text-grey-400
                focus-visible:border-accent-600 focus-visible:outline-2
                focus-visible:outline-(--color-focus)
              "
            />
            <p
              className="mt-2 h-4 font-mono text-(size:--fs-4xs) text-grey-500"
              aria-live="polite"
            >
              {query && `Filtering “${query}”`}
            </p>
          </div>
        </div>
      </FullWidthWrapper>

      {noResults && (
        <FullWidthWrapper className="pb-16">
          <p className="font-mono text-(size:--fs-3xs) text-grey-500">
            No tokens match “{query}”.
          </p>
        </FullWidthWrapper>
      )}

      {/* ── Color ── */}
      {(filteredSemantic.length > 0 || !query) && (
        <RailSection
          titleNumber="01"
          title="Color"
          description="Seven ramps, eleven stops each, resolved from raw HSL. Semantic roles map onto the ramp so components never touch a raw stop by accident."
          wrapperProps={{ "aria-label": "Color ramps", id: "colors" }}
        >
          <ScrollReveal className="flex flex-col gap-14">
            <ColorShowcase filter={query || undefined} />

            {filteredSemantic.length > 0 && (
              <div>
                <h3 className="mb-4 font-mono text-(size:--fs-3xs) font-medium tracking-wider text-grey-500 uppercase">
                  / Semantic roles
                </h3>
                {filteredSemantic.map(([label, maps, role]) => {
                  return (
                    <Row key={label} left={label} right={maps} hint={role} />
                  );
                })}
              </div>
            )}
          </ScrollReveal>
        </RailSection>
      )}

      {/* ── Typography ── */}
      {showTypography && (
        <RailSection
          titleNumber="02"
          title="Typography"
          description="Five families, each with one job. Only the --fs-* UI scale is live; the display tier is reserved for the homepage hero."
          wrapperProps={{ "aria-label": "Typography", id: "typography" }}
        >
          <ScrollReveal className="flex flex-col gap-10">
            {filteredFonts.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredFonts.map((font) => {
                  return <FontSpecimen key={font.label} {...font} />;
                })}
              </div>
            )}

            {filteredType.length > 0 && (
              <div>
                <h3 className="mb-4 font-mono text-(size:--fs-3xs) font-medium tracking-wider text-grey-500 uppercase">
                  / UI scale
                </h3>
                {filteredType.map(([label, cssVar, value]) => {
                  return (
                    <div key={cssVar} className="border-b border-grey-200 py-5">
                      <div className="mb-2 flex items-baseline gap-4 font-mono text-(size:--fs-4xs) text-grey-500">
                        <span className="w-10 shrink-0 font-medium text-grey-900">
                          {label}
                        </span>
                        <span className="w-40">{cssVar}</span>
                        <span>{value}</span>
                      </div>
                      <p
                        className="truncate leading-[1.2] text-grey-900"
                        style={{ fontSize: `var(${cssVar})` }}
                      >
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {filteredDisplayType.length > 0 && (
              <div>
                <h3 className="mb-4 font-mono text-(size:--fs-3xs) font-medium tracking-wider text-grey-500 uppercase">
                  / Display tier — reserved, do not use outside the hero
                </h3>
                {filteredDisplayType.map(([label, cssVar, value]) => {
                  return (
                    <Row
                      key={cssVar}
                      left={label}
                      right={cssVar}
                      hint={value}
                    />
                  );
                })}
              </div>
            )}
          </ScrollReveal>
        </RailSection>
      )}

      {/* ── Spacing ── */}
      {filteredSpacing.length > 0 && (
        <RailSection
          titleNumber="03"
          title="Spacing"
          description="Tailwind's default scale drives internal rhythm; these are the raw steps it's built from."
          wrapperProps={{ "aria-label": "Spacing scale", id: "spacing" }}
        >
          <ScrollReveal>
            {filteredSpacing.map(([label, value, px]) => {
              return (
                <div
                  key={label}
                  className="flex items-center gap-4 border-b border-grey-200 py-3.5 font-mono text-(size:--fs-4xs)"
                >
                  <span className="w-32 shrink-0 font-medium text-grey-900">
                    {label}
                  </span>
                  <div className="flex flex-1 items-center">
                    <span
                      className="h-3 shrink-0 bg-accent-500/30"
                      style={{ width: `${Math.min(px, 160)}px` }}
                    />
                  </div>
                  <span className="shrink-0 text-grey-500">{value}</span>
                </div>
              );
            })}
          </ScrollReveal>
        </RailSection>
      )}

      {/* ── Elevation ── */}
      {showElevation && (
        <RailSection
          titleNumber="04"
          title="Shape & elevation"
          description="Flat and structural: depth comes from borders and tone, never shadows. Radius is tokenized, not zero everywhere."
          wrapperProps={{ "aria-label": "Radii and borders", id: "elevation" }}
        >
          <ScrollReveal className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {filteredRadii.length > 0 && (
              <div>
                <h3 className="mb-4 font-mono text-(size:--fs-3xs) font-medium tracking-wider text-grey-500 uppercase">
                  / Radii
                </h3>
                {filteredRadii.map(([l, r]) => {
                  return <Row key={l} left={l} right={r} />;
                })}
              </div>
            )}
            {filteredBorders.length > 0 && (
              <div>
                <h3 className="mb-4 font-mono text-(size:--fs-3xs) font-medium tracking-wider text-grey-500 uppercase">
                  / Borders
                </h3>
                {filteredBorders.map(([l, r]) => {
                  return <Row key={l} left={l} right={r} />;
                })}
              </div>
            )}
          </ScrollReveal>
        </RailSection>
      )}

      {/* ── Motion & z-index ── */}
      {showMotion && (
        <RailSection
          titleNumber="05"
          title="Motion & layering"
          description="CSS transitions only, no animation library. The z-index ladder is a fixed vocabulary, never an arbitrary number."
          wrapperProps={{ "aria-label": "Motion and z-index", id: "motion" }}
        >
          <ScrollReveal className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {filteredMotion.length > 0 && (
              <div>
                <h3 className="mb-4 font-mono text-(size:--fs-3xs) font-medium tracking-wider text-grey-500 uppercase">
                  / Motion
                </h3>
                {filteredMotion.map(([l, r]) => {
                  return <Row key={l} left={l} right={r} />;
                })}
              </div>
            )}
            {filteredZIndex.length > 0 && (
              <div>
                <h3 className="mb-4 font-mono text-(size:--fs-3xs) font-medium tracking-wider text-grey-500 uppercase">
                  / Z-index
                </h3>
                {filteredZIndex.map(([l, r]) => {
                  return <Row key={l} left={l} right={r} />;
                })}
              </div>
            )}
          </ScrollReveal>
        </RailSection>
      )}

      {/* ── Layout ── */}
      {filteredLayout.length > 0 && (
        <RailSection
          titleNumber="06"
          title="Layout"
          description="FullWidthWrapper and Tailwind's spacing utilities do the real work; these tokens are the ceiling they're built against."
          wrapperProps={{ "aria-label": "Layout tokens", id: "layout" }}
        >
          <ScrollReveal>
            {filteredLayout.map(([l, r]) => {
              return <Row key={l} left={l} right={r} />;
            })}
          </ScrollReveal>
        </RailSection>
      )}

      {/* ── Closing CTA ── */}
      <FullWidthWrapper
        element="section"
        className="relative py-24"
        wrapperClassName="bg-accent-600 overflow-hidden"
        wrapperProps={{ "aria-label": "See the system in use" }}
      >
        <div className="relative z-2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-3xl text-(size:--fs-3xl) leading-tight font-bold text-balance text-grey-50">
              {ctaSection.title}
            </h2>
            <p className="max-w-xl text-(size:--fs-1xs) text-grey-50/80">
              {ctaSection.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/work"
              variant="filled"
              size="lg"
              color="grey"
              colorWeight={50}
              textColor="accent"
              textColorWeight={600}
              hoverBgColor="grey"
              hoverBgColorWeight={100}
            >
              See the case studies
            </Link>
            <Link
              href="/contact"
              variant="outlined"
              size="lg"
              color="grey"
              colorWeight={50}
              hoverTextColor="accent"
              hoverTextColorWeight={600}
            >
              Start a project
            </Link>
          </div>
        </div>
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -bottom-10 font-mono text-[12rem] leading-none font-bold whitespace-nowrap text-grey-50/10 select-none not-md:hidden"
        >
          TOKENS / TRACED
        </p>
      </FullWidthWrapper>
    </main>
  );
};

export default DesignBrowser;
