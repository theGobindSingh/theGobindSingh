import { CSSProperties } from "react";

export type InteractionVariant = "filled" | "outlined" | "text";
export type InteractionSize = "sm" | "md" | "lg";
export type ColorFamily =
  | "grey"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "caution"
  | "info"
  | "error";
export type ColorWeight =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950;

// Tailwind's content scanner only detects literal class-name strings, not
// template-literal interpolation — this map is what makes btn-filled/
// btn-outlined/btn-text/btn-sm/btn-lg actually get generated in the build.
const variantClassName: Record<InteractionVariant, string> = {
  filled: "btn-filled",
  outlined: "btn-outlined",
  text: "btn-text",
};

const sizeClassName: Partial<Record<InteractionSize, string>> = {
  sm: "btn-sm",
  lg: "btn-lg",
};

export const interactionStyles = ({
  variant,
  size = "md",
  className,
}: {
  variant: InteractionVariant;
  size?: InteractionSize | undefined;
  className?: string | undefined;
}): string => {
  const parts = ["btn", variantClassName[variant]];
  if (variant !== "text" && sizeClassName[size]) {
    parts.push(sizeClassName[size]);
  }
  if (className) parts.push(className);
  return parts.join(" ");
};

export const colorStyleVars = ({
  color,
  colorWeight,
  hoverBgColor,
  hoverBgColorWeight,
  textColor,
  textColorWeight,
  hoverTextColor,
  hoverTextColorWeight,
}: {
  color: ColorFamily;
  colorWeight: ColorWeight;
  hoverBgColor?: ColorFamily | undefined;
  hoverBgColorWeight?: ColorWeight | undefined;
  textColor?: ColorFamily | undefined;
  textColorWeight?: ColorWeight | undefined;
  hoverTextColor?: ColorFamily | undefined;
  hoverTextColorWeight?: ColorWeight | undefined;
}): CSSProperties => {
  const defaultHoverWeight = Math.min(colorWeight, 950) as ColorWeight;

  const vars: Record<string, string> = {
    "--c": `var(--color-${color}-${colorWeight})`,
    "--c-hover": `var(--color-${hoverBgColor ?? color}-${hoverBgColorWeight ?? defaultHoverWeight})`,
  };

  if (textColor !== undefined && textColorWeight !== undefined) {
    vars["--c-text"] = `var(--color-${textColor}-${textColorWeight})`;
  }
  if (hoverTextColor !== undefined && hoverTextColorWeight !== undefined) {
    vars["--c-hover-text"] =
      `var(--color-${hoverTextColor}-${hoverTextColorWeight})`;
  }

  return vars;
};
