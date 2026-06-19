import type {
  InteractionSize,
  InteractionVariant,
} from "@components/button/styles";
import type { MouseEventHandler, ReactNode } from "react";

export interface LinkProps {
  href: string;
  variant?: InteractionVariant;
  size?: InteractionSize;
  className?: string;
  children?: ReactNode;
  target?: string;
  rel?: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
