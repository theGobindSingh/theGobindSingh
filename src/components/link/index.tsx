import { colorStyleVars, interactionStyles } from "@components/button/styles";
import NextLink from "next/link";
import type { LinkProps } from "./types";

type HrefType = "internal" | "external" | "anchor" | "mailto" | "tel";

const getHrefType = (href: string): HrefType => {
  if (href.startsWith("mailto:")) return "mailto";
  if (href.startsWith("tel:")) return "tel";
  if (href.startsWith("#")) return "anchor";
  if (/^https?:\/\//.test(href)) return "external";
  return "internal";
};

export const Link = ({
  variant = "text",
  size = "md",
  color = "accent",
  colorWeight = 500,
  textColor,
  textColorWeight,
  hoverBgColor,
  hoverBgColorWeight,
  hoverTextColor,
  hoverTextColorWeight,
  className,
  href,
  children,
  target,
  rel,
  replace,
  scroll,
  prefetch,
  onClick,
  download,
}: LinkProps) => {
  const style = colorStyleVars({
    color,
    colorWeight,
    textColor,
    textColorWeight,
    hoverBgColor,
    hoverBgColorWeight,
    hoverTextColor,
    hoverTextColorWeight,
  });
  const classes = interactionStyles({ variant, size, className });
  const type = getHrefType(href);

  if (type === "internal") {
    return (
      <NextLink
        href={href}
        style={style}
        className={classes}
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
  }

  return (
    <a
      href={href}
      style={style}
      className={classes}
      target={type === "external" ? (target ?? "_blank") : target}
      rel={type === "external" ? (rel ?? "noopener noreferrer") : rel}
      onClick={onClick}
      download={download}
    >
      {children}
    </a>
  );
};
