import type {
  ColorFamily,
  ColorWeight,
  InteractionSize,
  InteractionVariant,
} from "@components/button/styles";
import type { LinkProps as NextLinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from "react";

export interface LinkProps extends Pick<
  NextLinkProps,
  "replace" | "scroll" | "prefetch"
> {
  href: string;
  variant?: InteractionVariant | undefined;
  size?: InteractionSize | undefined;
  color?: ColorFamily | undefined;
  colorWeight?: ColorWeight | undefined;
  textColor?: ColorFamily | undefined;
  textColorWeight?: ColorWeight | undefined;
  hoverBgColor?: ColorFamily | undefined;
  hoverBgColorWeight?: ColorWeight | undefined;
  hoverTextColor?: ColorFamily | undefined;
  hoverTextColorWeight?: ColorWeight | undefined;
  className?: string | undefined;
  children?: ReactNode;
  target?: string | undefined;
  rel?: string | undefined;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  download?: AnchorHTMLAttributes<HTMLAnchorElement>["download"];
}
