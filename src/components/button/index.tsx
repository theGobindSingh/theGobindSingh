import { colorStyleVars, interactionStyles } from "./styles";
import type { ButtonProps } from "./types";

export const Button = ({
  variant = "outlined",
  size = "md",
  color = "accent",
  colorWeight = 600,
  textColor,
  textColorWeight,
  hoverBgColor,
  hoverBgColorWeight,
  hoverTextColor,
  hoverTextColorWeight,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      style={colorStyleVars({
        color,
        colorWeight,
        textColor,
        textColorWeight,
        hoverBgColor,
        hoverBgColorWeight,
        hoverTextColor,
        hoverTextColorWeight,
      })}
      className={interactionStyles({ variant, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
};
