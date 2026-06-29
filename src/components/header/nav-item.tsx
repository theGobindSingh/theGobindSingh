"use client";

import useGetHeader from "@components/header/use-get-header";
import { Link } from "@components/link";
import { headerAndNavData } from "@data";
import { tw } from "@utils/tailwind";
import { usePathname } from "next/navigation";
import { MouseEventHandler } from "react";

const HeaderNavItem = ({
  text,
  url,
}: (typeof headerAndNavData.links)[number]) => {
  const pathname = usePathname();
  const { getHeader } = useGetHeader();
  const clickHandler: MouseEventHandler<HTMLAnchorElement> = () => {
    const header = getHeader();
    if (!header) return;
    const toggleInput = header.querySelector<HTMLInputElement>(
      "#app-header-hamburger-toggle",
    );
    if (!toggleInput) return;
    toggleInput.checked = false;
    const nav = header.querySelector<HTMLDivElement>("nav");
    if (!nav) return;
    nav.classList.add("not-md:translate-x-full");
  };
  return (
    <li
      className={tw`
        font-mono
        text-(size:--fs-4xs)
        font-medium
        
        transition-all
        duration-300
        ease-[ease]

        not-md:text-(size:--fs-xs)
        not-md:uppercase
        md:[text-shadow:0_0_4px_var(--color-grey-50)]

        ${text.toLowerCase().replace(/\s+/g, "-")}
        text-grey-950
        ${pathname === url ? "opacity-100" : "opacity-50"}
        
        hover:opacity-100
        `}
    >
      <Link
        href={url}
        color="grey"
        hoverBgColorWeight={950}
        onClick={clickHandler}
      >
        {text}
      </Link>
    </li>
  );
};

export default HeaderNavItem;
