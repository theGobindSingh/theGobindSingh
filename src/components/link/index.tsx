import { interactionStyles } from "@components/button/styles";
import NextLink from "next/link";
import type { LinkProps } from "./types";

const isExternal = (href: string): boolean => {
  return /^https?:\/\//.test(href);
};

export const Link = ({
  variant = "text",
  size = "md",
  className,
  href,
  children,
  target,
  rel,
  replace,
  scroll,
  prefetch,
  onClick,
}: LinkProps) => {
  const styles = interactionStyles({ variant, size, className });

  if (isExternal(href)) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        className={styles}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={styles}
      target={target}
      rel={rel}
      replace={replace!}
      scroll={scroll!}
      prefetch={prefetch!}
      onClick={onClick!}
    >
      {children}
    </NextLink>
  );
};
