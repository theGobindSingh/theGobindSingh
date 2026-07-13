import FullWidthWrapper, {
  FullWidthWrapperProps,
} from "@components/full-width-wrapper";
import { PropsWithChildren } from "react";

interface RailSectionProps {
  titleNumber: string;
  title: string;
  description?: string | undefined;
  wrapperProps?: FullWidthWrapperProps["wrapperProps"];
  className?: string | undefined;
}

const RailSection = ({
  titleNumber,
  title,
  description,
  children,
  wrapperProps,
  className,
}: PropsWithChildren<RailSectionProps>) => {
  return (
    <FullWidthWrapper
      className={`grid grid-cols-1 gap-8 py-16 md:grid-cols-12 md:gap-12 ${className ?? ""}`.trim()}
      {...(wrapperProps ? { wrapperProps } : {})}
    >
      <div className="md:sticky md:top-24 md:col-span-3 md:h-fit">
        <h2 className="font-mono text-(size:--fs-2xs) font-medium text-accent-600 uppercase">
          {`${titleNumber} // ${title}`}
        </h2>
        {description && (
          <p className="mt-4 max-w-xs text-(size:--fs-3xs) text-grey-600">
            {description}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-8 md:col-span-8 md:col-start-5">
        {children}
      </div>
    </FullWidthWrapper>
  );
};

export default RailSection;
