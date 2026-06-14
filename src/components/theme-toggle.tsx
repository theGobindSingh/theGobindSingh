"use client";

import { useCallback, useEffect, useState } from "react";

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
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }, [dark]);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggle}
      className=""
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* 
      This is a simple example of a theme toggle button.
      */}
      {dark ? "switch to light" : "switch to dark"}
    </button>
  );
};

export default ThemeToggle;
