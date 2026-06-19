"use client";

import { useLenis } from "lenis/react";

const HeaderScrollHandler = () => {
  useLenis(({ velocity, scroll }) => {
    const header = document.querySelector<HTMLDivElement>("header#app-header");

    if (!header) return;

    if (velocity === 0) return;
    const scrollingDown = velocity > 0;

    if (scrollingDown && scroll > 50) {
      header.style.setProperty("transform", "scale(0.9)");
      header.style.setProperty("top", "1rem");
      header.style.setProperty("border-radius", "12px");
      header.classList.remove(
        "border-t-[transparent]",
        "border-l-[transparent]",
        "border-r-[transparent]",
      );
    } else if (!scrollingDown) {
      header.style.removeProperty("transform");
      header.style.removeProperty("top");
      header.style.removeProperty("border-radius");
      header.classList.add(
        "border-t-[transparent]",
        "border-l-[transparent]",
        "border-r-[transparent]",
      );
    }
  });

  return null;
};

export default HeaderScrollHandler;
