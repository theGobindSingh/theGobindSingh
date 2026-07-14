"use client";

import { clientCookies } from "@utils/cookies";
import { useEffect } from "react";

const COOKIE = "theme";

const resolveTheme = (): "dark" | "light" => {
  const cookie = clientCookies.get(COOKIE);
  if (cookie === "dark" || cookie === "light") return cookie;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme: "dark" | "light") => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
};

const persistTheme = (theme: "dark" | "light") => {
  clientCookies.set(COOKIE, theme, {
    days: 365,
    path: "/",
    sameSite: "Lax",
  });
};

export default function ThemeSetter() {
  useEffect(() => {
    const theme = resolveTheme();
    applyTheme(theme);
    persistTheme(theme);
  }, []);

  return null;
}
