import type {
  InteractionSize,
  InteractionVariant,
} from "@/lib/interaction-styles";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: InteractionVariant;
  size?: InteractionSize;
}
