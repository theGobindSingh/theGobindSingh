"use client";

import { useEffect, useRef } from "react";

const HeaderScrollHandler = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  const scrollHandler = () => {
    const header = headerRef.current;
    if (!header) return;
    if (window.scrollY > 50) {
      header.style.setProperty("transform", "scale(0.9)");
      header.style.setProperty("top", "1rem");
      header.style.setProperty("border-radius", "12px");

      header.classList.remove(
        "border-t-[transparent]",
        "border-l-[transparent]",
        "border-r-[transparent]",
      );
    } else {
      header.style.removeProperty("transform");
      header.style.removeProperty("top");
      header.style.removeProperty("border-radius");

      header.classList.add(
        "border-t-[transparent]",
        "border-l-[transparent]",
        "border-r-[transparent]",
      );
    }
  };

  useEffect(() => {
    headerRef.current = document.querySelector("header#app-header");
    if (!headerRef.current) return;
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return null;
};

export default HeaderScrollHandler;
