import { tw } from "@utils/tailwind";

export type InteractionVariant = "filled" | "outlined" | "text";
export type InteractionSize = "sm" | "md" | "lg";

const base = tw`
  inline-flex items-center justify-center gap-2
  font-sans font-medium
  rounded-(--radius-none)
  transition-colors duration-(--dur-fast) ease-out
  focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-(--color-focus)
  disabled:pointer-events-none disabled:opacity-50
`;

const sizeMap: Record<InteractionSize, string> = {
  sm: tw`px-3 py-1.5 text-sm`,
  md: tw`px-5 py-2.5 text-base`,
  lg: tw`px-7 py-3.5 text-lg`,
};

const variantMap: Record<InteractionVariant, string> = {
  filled: tw`
    bg-accent-500 text-white
    border border-transparent
    hover:bg-accent-600
  `,
  outlined: tw`
    bg-transparent text-grey-950
    border border-grey-700
    hover:border-accent-500 hover:text-accent-500
  `,
  text: tw`
    bg-transparent text-grey-950
    underline decoration-transparent underline-offset-4
    hover:text-accent-500 hover:decoration-accent-500
  `,
};

interface InteractionStylesOptions {
  variant: InteractionVariant;
  size?: InteractionSize;
  className?: string | undefined;
}

export const interactionStyles = ({
  variant,
  size = "md",
  className,
}: InteractionStylesOptions): string => {
  return tw`
    ${base}
    ${variantMap[variant]}
    ${variant !== "text" && sizeMap[size]}
    ${className}
  `;
};
