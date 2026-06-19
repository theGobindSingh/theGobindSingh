"use client";

import ColorShowcase from "@app/temp/color-showcase";
import FullWidthWrapper from "@components/full-width-wrapper";
import { useState } from "react";
import { Row, SectionHead } from "./components";
import { ALL_TYPE_SCALE, FONTS, MISC, SEMANTIC, SPACING } from "./constants";

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
  items: T[],
  extract: (item: T) => string[],
): T[] => {
  if (!query) return items;
  return items.filter((item) => {
    return includes(query, ...extract(item));
  });
};

const SEMANTIC_EXTRACT = ([label, maps, role]: [string, string, string]) => {
  return [label, maps, role];
};
const TYPE_EXTRACT = ([label, cssVar, value, source]: [
  string,
  string,
  string,
  string,
]) => {
  return [label, cssVar, value, source];
};
const SPACING_EXTRACT = ([label, value, px]: [string, string, number]) => {
  return [label, value, String(px)];
};

const FontLabel = ({
  label,
  name,
  family,
  weight,
  style,
}: (typeof FONTS)[number]) => {
  return (
    <div className="bg-[var(--color-bg)] p-8">
      <span className="mb-5 block font-mono text-[10px] font-medium uppercase tracking-[0.12em] opacity-20">
        {label}
      </span>
      <p
        className="mb-4 text-[56px] leading-[0.9]"
        style={{ fontFamily: family, fontWeight: weight, fontStyle: style }}
      >
        Aa
      </p>
      <p className="font-mono text-xs opacity-35">
        {name} &middot; {weight}
        {style === "italic" ? " italic" : ""}
      </p>
    </div>
  );
};

const TempPage = () => {
  const [query, setQuery] = useState("");

  const filteredSemantic = filtered(query, SEMANTIC, SEMANTIC_EXTRACT);
  const filteredFonts = filtered(query, FONTS, (f) => {
    return [f.label, f.name, f.family, f.weight, f.style];
  });
  const filteredType = filtered(query, ALL_TYPE_SCALE, TYPE_EXTRACT);
  const filteredSpacing = filtered(query, SPACING, SPACING_EXTRACT);
  const filteredMisc = MISC.map((group) => {
    return {
      ...group,
      rows: filtered(query, group.rows, ([l, r]) => {
        return [l, r];
      }),
    };
  }).filter((g) => {
    return g.rows.length > 0;
  });

  return (
    <FullWidthWrapper element="main" className="pt-24">
      {/* ── Hero ── */}
      <header className="mb-24">
        <span className="mb-6 block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] opacity-20">
          globals.css Reference
        </span>
        <h1 className="overflow-hidden font-display text-[72px] leading-[0.95] tracking-[-0.02em] lg:text-[112px]">
          Design
          <br />
          Tokens
        </h1>
        <p className="mt-10 font-mono text-sm leading-relaxed opacity-30">
          Every color, type scale, spacing step, radius, z-index, and motion
          value defined in the project. Hover any swatch to inspect &middot;
          click to copy its CSS variable.
        </p>

        <div className="mt-10">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              return setQuery(e.target.value);
            }}
            placeholder="Search tokens (e.g. accent, 500, grey, radius, ease)..."
            className="w-full border border-[var(--color-border-strong)] bg-transparent px-5 py-3 font-mono text-sm text-[var(--color-text)] placeholder:opacity-25 focus:outline-2 focus:outline-[var(--color-focus)]"
          />
          {query && (
            <p className="mt-2 font-mono text-[11px] opacity-25">
              Filtering: &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </header>

      {/* ── Color Palette ── */}
      <SectionHead label="01 &mdash; Color Palette" id="colors" />
      <ColorShowcase filter={query || undefined} />

      {/* ── Semantic Roles ── */}
      {filteredSemantic.length > 0 && (
        <>
          <SectionHead label="02 &mdash; Semantic Roles" id="semantic" />
          {filteredSemantic.map(([label, maps, role]) => {
            return <Row key={label} left={label} right={maps} hint={role} />;
          })}
        </>
      )}

      {/* ── Typography ── */}
      {(filteredFonts.length > 0 || filteredType.length > 0) && (
        <>
          <SectionHead label="03 &mdash; Typography" id="typography" />

          {filteredFonts.length > 0 && (
            <div className="mb-14 grid gap-px bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-5">
              {filteredFonts.map((font) => {
                return <FontLabel key={font.label} {...font} />;
              })}
            </div>
          )}

          {filteredType.length > 0 && (
            <div>
              {filteredType.map(([label, cssVar, value, source]) => {
                return (
                  <div
                    key={cssVar}
                    className="group border-b border-(--color-border) py-6"
                  >
                    <div className="mb-2 flex items-baseline gap-4 font-mono text-[12px] text-grey-300">
                      <span className="w-12 text-right font-medium">
                        {label}
                      </span>
                      <span className="w-56">{cssVar}</span>
                      <span>{value}</span>
                      <span className="ml-auto shrink-0">{source}</span>
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
          )}
        </>
      )}

      {/* ── Spacing ── */}
      {filteredSpacing.length > 0 && (
        <>
          <SectionHead label="04 &mdash; Spacing" id="spacing" />
          <div>
            {filteredSpacing.map(([label, value, px]) => {
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
        </>
      )}

      {/* ── Misc Tokens ── */}
      {filteredMisc.length > 0 && (
        <>
          <SectionHead
            label="05 &mdash; Radii, Z-Index, Motion, Borders &amp; Layout"
            id="misc"
          />
          <div className="grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {filteredMisc.map((group) => {
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
        </>
      )}

      {/* ── Footer ── */}
      <div className="mt-32 border-t-2 border-[var(--color-border-strong)] pt-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-10">
          &mdash; end of token reference &mdash;
        </span>
      </div>
    </FullWidthWrapper>
  );
};

export default TempPage;
