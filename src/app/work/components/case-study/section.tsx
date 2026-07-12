import FullWidthWrapper from "@components/full-width-wrapper";
import type { CaseStudySection as CaseStudySectionType } from "@lib/case-studies";
import { Fragment } from "react";

import renderBlock from "./blocks";

interface CaseStudySectionProps {
  section: CaseStudySectionType;
  index: number;
}

const BG_CLASS: Record<NonNullable<CaseStudySectionType["variant"]>, string> = {
  default: "",
  dim: "bg-grey-100",
  inverted: "bg-accent-600 text-grey-50",
};

const BORDER_CLASS: Record<
  NonNullable<CaseStudySectionType["variant"]>,
  string
> = {
  default: "border-grey-200",
  dim: "border-grey-300",
  inverted: "border-grey-50/20",
};

const CaseStudySection = ({ section, index }: CaseStudySectionProps) => {
  const number = String(index + 1).padStart(2, "0");
  const variant = section.variant ?? "default";
  const isFullWidth = section.layout === "full-width";

  const label = (
    <span className="flex items-center gap-2 font-mono text-(size:--fs-4xs) tracking-widest uppercase opacity-70">
      <span
        className="size-1 shrink-0 rounded-full bg-current"
        aria-hidden="true"
      />
      {`${number}. ${section.sectionTitle}`}
    </span>
  );

  const blocks = section.items.map((item, itemIndex) => {
    return (
      <Fragment key={itemIndex}>
        {renderBlock(item, `s${index}-${itemIndex}`)}
      </Fragment>
    );
  });

  return (
    <FullWidthWrapper
      element="section"
      wrapperClassName={`border-b ${BORDER_CLASS[variant]} ${BG_CLASS[variant]}`.trim()}
      className={
        isFullWidth
          ? "py-16 md:py-20"
          : "grid grid-cols-1 gap-8 py-16 md:grid-cols-12 md:gap-12 md:py-20"
      }
    >
      {isFullWidth ? (
        <>
          <div className="mb-16">{label}</div>
          <div className="flex flex-col gap-8">{blocks}</div>
        </>
      ) : (
        <>
          <div className="md:sticky md:top-24 md:col-span-3 md:h-fit">
            {label}
          </div>
          <div className="flex flex-col gap-8 md:col-span-8 md:col-start-5">
            {section.title && (
              <h2 className="text-(size:--fs-2xl) leading-tight font-bold text-balance">
                {section.title}
              </h2>
            )}
            {blocks}
          </div>
        </>
      )}
    </FullWidthWrapper>
  );
};

export default CaseStudySection;
