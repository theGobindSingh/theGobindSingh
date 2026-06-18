import { tw } from "@utils/tailwind";
import type { JSX, PropsWithChildren, ReactNode, Ref } from "react";
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

export interface FullWidthWrapperProps extends PropsWithChildren {
  className?: string;
  element?: keyof JSX.IntrinsicElements;
  beforeContainer?: ReactNode;
  afterContainer?: ReactNode;
  wrapperClassName?: string;
  isContainerCenter?: boolean;
  containerSize?: string;
  maxContentWidth?: string;
}

const FullWidthWrapperWithoutRef = (
  {
    containerSize = "90%",
    maxContentWidth = "1800px",
    className,
    children,
    element = "section",
    beforeContainer = null,
    afterContainer = null,
    wrapperClassName,
    isContainerCenter = true,
  }: FullWidthWrapperProps,
  ref: Ref<HTMLElement>,
): JSX.Element => {
  const innerElement = jsx("div", {
    style: {
      maxWidth: `var(--max-content-width, ${maxContentWidth})`,
      width: containerSize,
    },
    className,
    children,
  });

  return jsxs(element, {
    className: tw`
      w-full
      flex
      ${isContainerCenter && "justify-center items-center"}
      ${wrapperClassName}
    `,
    ref,
    children: [beforeContainer, innerElement, afterContainer],
  });
};

// eslint-disable-next-line @eslint-react/no-forward-ref -- ignore
const FullWidthWrapper = forwardRef<HTMLElement, FullWidthWrapperProps>(
  FullWidthWrapperWithoutRef,
);

FullWidthWrapper.displayName = "FullWidthWrapper";

export default FullWidthWrapper;
