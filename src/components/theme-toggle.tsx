"use client";

import { clientCookies } from "@utils/cookies";
import { useCallback, useEffect, useState } from "react";

const COOKIE = "theme";

const ThemeToggle = () => {
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
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? "switch to light" : "switch to dark"}
    </button>
  );
};

export default ThemeToggle;
