"use client";

import { useCallback, useMemo, useRef, useState } from "react";

const RAMPS = [
  "grey",
  "primary",
  "secondary",
  "accent",
  "success",
  "caution",
  "info",
  "error",
] as const;

const STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const ColorShowcase = ({ filter }: { filter: string | undefined }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleCopy = useCallback(async (varName: string) => {
    try {
      await navigator.clipboard.writeText(varName);
    } catch {
      /* clipboard unavailable */
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCopied(varName);
    timeoutRef.current = setTimeout(() => {
      return setCopied(null);
    }, 1600);
  }, []);

  const q = (filter ?? "").toLowerCase();

  const visibleRamps = useMemo(() => {
    const words = q.split(/\s+/).filter(Boolean);
    const matches = (s: string) => {
      const lower = s.toLowerCase();
      return words.every((w) => {
        return lower.includes(w);
      });
    };

    if (!q)
      return RAMPS.map((family) => {
        return { family, stops: [...STOPS] };
      });

    return RAMPS.map((family) => {
      const familyMatch = matches(family);
      const matchingStops = STOPS.filter((stop) => {
        if (familyMatch) return true;
        const varName = `--color-${family}-${stop}`;
        return matches(varName);
      });
      return { family, stops: matchingStops };
    }).filter((r) => {
      return r.stops.length > 0;
    });
  }, [q]);

  return (
    <div>
      <p className="mb-2 font-mono text-(size:--fs-4xs) text-grey-500 sm:hidden">
        Swipe to see every stop &rarr;
      </p>
      <div className="overflow-x-auto overscroll-x-contain border border-grey-300">
        <div className="min-w-[640px]">
          {visibleRamps.map(({ family, stops }, i) => {
            return (
              <div
                key={family}
                className={i > 0 ? "border-t border-grey-200" : ""}
              >
                <div className="flex">
                  <div className="flex w-20 shrink-0 items-center border-r border-grey-200 px-4 py-3">
                    <span className="font-mono text-(size:--fs-4xs) font-medium tracking-wide text-grey-600 uppercase">
                      {family}
                    </span>
                  </div>
                  <div className="flex flex-1">
                    {stops.map((stop) => {
                      const varName = `--color-${family}-${stop}`;
                      const isHovered = hovered === varName;
                      const isCopied = copied === varName;
                      return (
                        <button
                          key={varName}
                          type="button"
                          onClick={() => {
                            return void handleCopy(varName);
                          }}
                          onMouseEnter={() => {
                            return setHovered(varName);
                          }}
                          onMouseLeave={() => {
                            return setHovered(null);
                          }}
                          className="
                          group relative flex-1 cursor-pointer border-0
                          bg-transparent p-0 -outline-offset-2
                          transition-[filter] duration-(--dur-fast)
                          hover:z-10 hover:brightness-110
                          focus-visible:z-10 focus-visible:outline-2
                          focus-visible:outline-(--color-focus)
                        "
                          title={`${varName} — click to copy`}
                        >
                          <div
                            className="flex h-14 w-full items-end justify-center pb-2"
                            style={{
                              backgroundColor: `var(${varName})`,
                              outline: isHovered
                                ? "2px solid var(--color-accent-500)"
                                : isCopied
                                  ? "2px solid var(--color-text)"
                                  : undefined,
                              outlineOffset: -2,
                            }}
                          >
                            <span
                              className="
                              font-mono text-[10px] leading-none font-semibold
                              transition-all duration-(--dur-fast) select-none
                            "
                              style={{
                                color: `var(${varName})`,
                                filter: "invert(1) grayscale(1) contrast(9)",
                                opacity: isHovered || isCopied ? 0 : 0.15,
                              }}
                            >
                              {stop}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-20 shrink-0 border-r border-grey-200" />
                  <div className="flex flex-1">
                    {stops.map((stop) => {
                      const varName = `--color-${family}-${stop}`;
                      const isHovered = hovered === varName;
                      return (
                        <div
                          key={`lbl-${varName}`}
                          className="flex flex-1 justify-center py-1.5"
                        >
                          <span
                            className={`font-mono text-[9px] leading-none transition-colors select-none ${
                              isHovered ? "text-grey-800" : "text-grey-400"
                            }`}
                          >
                            {stop}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex h-6 items-center font-mono text-(size:--fs-4xs)">
        {copied ? (
          <span>
            <span className="text-grey-500">Copied to clipboard &rarr; </span>
            <span className="font-medium text-accent-600">{copied}</span>
          </span>
        ) : hovered ? (
          <span>
            <span className="text-grey-500">
              {hovered.split("-").slice(0, -1).join("-")}-
            </span>
            <span className="font-medium text-grey-900">
              {hovered.split("-").pop()}
            </span>
            <span className="ml-3 text-grey-500">click to copy</span>
          </span>
        ) : (
          <span className="text-grey-500">
            Hover a swatch to inspect &middot; click to copy the CSS variable
          </span>
        )}
      </div>
    </div>
  );
};

export default ColorShowcase;
