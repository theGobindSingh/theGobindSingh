"use client";

import { clientCookies } from "@utils/cookies";
import { tw } from "@utils/tailwind";
import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const COOKIE = "theme";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(() => {
    const next = !dark;
    setDark(next);
    const theme = next ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.classList.toggle("light", !next);
    clientCookies.set(COOKIE, theme, {
      days: 365,
      path: "/",
      sameSite: "Lax",
    });
  }, [dark]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none sticky bottom-4 z-(--z-nav) mb-4 flex justify-end px-4">
      <button
        onClick={toggle}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        className={tw`
        pointer-events-auto
        flex size-11 cursor-pointer items-center justify-center
        rounded-xl border border-(--color-border)
        text-(--color-text)
        backdrop-blur-xs transition-colors duration-(--dur-fast)
        ease-out hover:border-(--color-focus)
        hover:text-(--color-focus) focus-visible:border-(--color-focus) focus-visible:text-(--color-focus)
        focus-visible:outline-hidden motion-reduce:transition-none
        `}
      >
        <Sun
          className="absolute size-5 shrink-0 transition-all
          duration-(--dur-slow) ease-out motion-reduce:transition-none"
          style={{
            opacity: dark ? 1 : 0,
            transform: dark
              ? "scale(1) rotate(0deg)"
              : "scale(0.4) rotate(90deg)",
            pointerEvents: dark ? "auto" : "none",
          }}
        />
        <Moon
          className="absolute size-5 shrink-0 transition-all
          duration-(--dur-slow) ease-out motion-reduce:transition-none"
          style={{
            opacity: dark ? 0 : 1,
            transform: dark
              ? "scale(0.4) rotate(-90deg)"
              : "scale(1) rotate(0deg)",
            pointerEvents: dark ? "none" : "auto",
          }}
        />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
