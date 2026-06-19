import { interactionStyles } from "./styles";
import type { ButtonProps } from "./types";

export const Button = ({
  variant = "outlined",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={interactionStyles({ variant, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
};
