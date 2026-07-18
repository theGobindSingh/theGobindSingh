"use client";

import useGetHeader from "@components/header/use-get-header";
import { tw } from "@utils/tailwind";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useState } from "react";

const NAV_ID = "app-header-nav";

const Hamburger = () => {
  const lenis = useLenis();
  const { getHeader } = useGetHeader();
  const [isOpen, setIsOpen] = useState(false);

  const applyNavState = useCallback(
    (open: boolean) => {
      const nav = getHeader()?.querySelector<HTMLElement>(`#${NAV_ID}`);
      if (!nav) return;
      nav.classList.toggle("not-md:translate-x-full", !open);
      if (open) lenis?.stop();
      else lenis?.start();
    },
    [getHeader, lenis],
  );

  const setOpen = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      applyNavState(open);
    },
    [applyNavState],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    // Following a link leaves the menu open over the new page otherwise.
    const onNavClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("a")) setOpen(false);
    };

    const nav = getHeader()?.querySelector<HTMLElement>(`#${NAV_ID}`);
    window.addEventListener("keydown", onKeyDown);
    nav?.addEventListener("click", onNavClick);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      nav?.removeEventListener("click", onNavClick);
    };
  }, [isOpen, setOpen, getHeader]);

  return (
    <button
      type="button"
      onClick={() => {
        setOpen(!isOpen);
      }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls={NAV_ID}
      data-open={isOpen}
      className="group z-2 cursor-pointer md:hidden"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className={tw`
          h-[2em] transition-transform duration-600 ease-in-out
          group-data-[open=true]:-rotate-45
        `}
      >
        <path
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          className={tw`
            fill-none stroke-current stroke-2
            transition-[stroke-dasharray,stroke-dashoffset] duration-600
            ease-in-out [stroke-dasharray:12_63] [stroke-linecap:round]
            [stroke-linejoin:round]
            group-data-[open=true]:[stroke-dasharray:20_300]
            group-data-[open=true]:[stroke-dashoffset:-32.42]
            `}
        />
        <path
          d="M7 16 27 16"
          className={tw`
            fill-none stroke-current stroke-2
            transition-[stroke-dasharray,stroke-dashoffset] duration-600
            ease-in-out [stroke-linecap:round] [stroke-linejoin:round]
            `}
        />
      </svg>
    </button>
  );
};

export default Hamburger;
