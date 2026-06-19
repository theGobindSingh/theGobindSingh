import type { InteractionSize, InteractionVariant } from "./styles";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: InteractionVariant;
  size?: InteractionSize;
}
