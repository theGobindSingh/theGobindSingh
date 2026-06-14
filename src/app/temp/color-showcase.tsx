"use client";

import { useCallback, useRef, useState } from "react";

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

const ColorShowcase = () => {
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

  return (
    <div>
      <div className="overflow-hidden border border-[var(--color-border-strong)]">
        {RAMPS.map((family, i) => {
          return (
            <div
              key={family}
              className={i > 0 ? "border-t border-[var(--color-border)]" : ""}
            >
              <div className="flex">
                <div className="flex w-20 shrink-0 items-center border-r border-[var(--color-border)] px-4 py-3">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] opacity-35">
                    {family}
                  </span>
                </div>
                <div className="flex flex-1">
                  {STOPS.map((stop) => {
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
                        className="group relative flex-1 cursor-pointer border-0 bg-transparent p-0 outline-offset-[-2px] transition-[filter] hover:z-10 hover:brightness-110 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
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
                            className="select-none font-mono text-[10px] font-semibold leading-none transition-all duration-150"
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
                <div className="w-20 shrink-0 border-r border-[var(--color-border)]" />
                <div className="flex flex-1">
                  {STOPS.map((stop) => {
                    const varName = `--color-${family}-${stop}`;
                    const isHovered = hovered === varName;
                    return (
                      <div
                        key={`lbl-${varName}`}
                        className="flex flex-1 justify-center py-1.5"
                      >
                        <span
                          className={`select-none font-mono text-[8px] leading-none transition-opacity ${
                            isHovered ? "opacity-60" : "opacity-15"
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

      <div className="mt-5 flex h-6 items-center font-mono text-xs">
        {copied ? (
          <span>
            <span className="opacity-40">Copied to clipboard &rarr; </span>
            <span className="font-medium text-[var(--color-accent-500)]">
              {copied}
            </span>
          </span>
        ) : hovered ? (
          <span>
            <span className="opacity-25">
              {hovered.split("-").slice(0, -1).join("-")}-
            </span>
            <span className="font-medium">{hovered.split("-").pop()}</span>
            <span className="ml-3 opacity-25">click to copy</span>
          </span>
        ) : (
          <span className="opacity-20">
            Hover a swatch to inspect &middot; click to copy the CSS variable
          </span>
        )}
      </div>
    </div>
  );
};

export default ColorShowcase;
