"use client";

import { Link } from "@components/link";
import { headerAndNavData } from "@data";
import { tw } from "@utils/tailwind";
import { usePathname } from "next/navigation";

const HeaderNavItem = ({
  text,
  url,
}: (typeof headerAndNavData.links)[number]) => {
  const pathname = usePathname();
  console.log(pathname);
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
      <Link href={url} color="grey" hoverBgColorWeight={950}>
        {text}
      </Link>
    </li>
  );
};

export default HeaderNavItem;
