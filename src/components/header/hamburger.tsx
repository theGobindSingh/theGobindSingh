"use client";

import { tw } from "@utils/tailwind";
import { useLenis } from "lenis/react";
import { ChangeEventHandler, useCallback } from "react";

const Hamburger = () => {
  const lenis = useLenis();
  const onChangeHandler: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = useCallback(
    (e) => {
      const header =
        document.querySelector<HTMLDivElement>("header#app-header");
      if (!header) return;
      const nav = header.querySelector<HTMLDivElement>("nav");
      if (!nav) return;
      const isActive = e.target.checked;
      if (isActive) {
        nav.classList.remove("not-md:translate-x-full");
        lenis?.stop();
      } else {
        nav.classList.add("not-md:translate-x-full");
        lenis?.start();
      }
    },
    [lenis],
  );
  return (
    <label className="group z-2 cursor-pointer md:hidden">
      <input type="checkbox" className="hidden" onChange={onChangeHandler} />
      <svg
        viewBox="0 0 32 32"
        className={tw`
          h-[2em] transition-transform duration-600 ease-in-out
          group-has-checked:-rotate-45
        `}
      >
        <path
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          className={tw`
            fill-none stroke-current stroke-2
            transition-[stroke-dasharray,stroke-dashoffset] duration-600
            ease-in-out [stroke-dasharray:12_63] [stroke-linecap:round]
            [stroke-linejoin:round]
            group-has-checked:[stroke-dasharray:20_300]
            group-has-checked:[stroke-dashoffset:-32.42]
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
    </label>
  );
};

export default Hamburger;
