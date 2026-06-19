"use client";

import { useLenis } from "lenis/react";

const HeaderScrollHandler = () => {
  useLenis(({ velocity, scroll }) => {
    const header = document.querySelector<HTMLDivElement>("header#app-header");

    if (!header) return;

    if (velocity === 0) return;
    const scrollingDown = velocity > 0;

    if (scrollingDown && scroll > 50) {
      // header.style.setProperty("transform", "scale(0.9)");
      header.style.setProperty("top", "1rem");
      header.style.setProperty("left", "5%");
      header.style.setProperty("width", "90%");
      header.style.setProperty("border-radius", "12px");
      header.style.setProperty("background-color", "rgba(0, 0, 0, 0.2)");
      header.classList.remove(
        "border-t-transparent",
        "border-l-transparent",
        "border-r-transparent",
      );
    } else if (!scrollingDown) {
      // header.style.removeProperty("transform");
      header.style.removeProperty("top");
      header.style.removeProperty("left");
      header.style.removeProperty("width");
      header.style.removeProperty("border-radius");
      header.style.removeProperty("background-color");
      header.classList.add(
        "border-t-transparent",
        "border-l-transparent",
        "border-r-transparent",
      );
    }
  });

  return null;
};

export default HeaderScrollHandler;
