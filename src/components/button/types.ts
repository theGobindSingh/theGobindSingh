import type {
  ColorFamily,
  ColorWeight,
  InteractionSize,
  InteractionVariant,
} from "./styles";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
}
