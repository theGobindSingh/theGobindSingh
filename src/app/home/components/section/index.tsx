import FullWidthWrapper from "@components/full-width-wrapper";
import { FC, Fragment, PropsWithChildren } from "react";

interface HomeSectionProps {
  title: string;
  description?: string | undefined;
  wrapper?: FC<PropsWithChildren<unknown>>;
  className?: string | undefined;
  wrapperClassName?: string | undefined;
}

const HomeSection = ({
  title,
  description,
  wrapper: Wrapper = Fragment,
  children,
  className,
  wrapperClassName,
}: PropsWithChildren<HomeSectionProps>) => {
  return (
    <FullWidthWrapper
      className={`flex flex-col gap-4 py-12 ${className ?? ""}`.trim()}
      wrapperClassName={wrapperClassName!}
    >
      <Wrapper>
        <h2 className="font-mono text-(size:--fs-2xs) font-medium text-accent-600">
          {title}
        </h2>
        {description && (
          <p className="max-w-2xl text-(size:--fs-3xs) tracking-wide text-grey-700 [word-spacing:0.125em]">
            {description}
          </p>
        )}
        <hr className="mb-6 border-grey-300" />
        {children}
      </Wrapper>
    </FullWidthWrapper>
  );
};

export default HomeSection;
