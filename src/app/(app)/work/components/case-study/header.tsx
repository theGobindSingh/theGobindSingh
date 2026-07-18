import FullWidthWrapper from "@components/full-width-wrapper";
import { CATEGORY_LABELS } from "@data";
import {
  formatCaseStudyTimeframe,
  splitCaseStudyTitle,
  type CaseStudyWithSlug,
} from "@lib/case-studies";

const CaseStudyHeader = ({ caseStudy }: { caseStudy: CaseStudyWithSlug }) => {
  const { heading, subtitle } = splitCaseStudyTitle(caseStudy.title);

  return (
    <FullWidthWrapper
      element="header"
      className="grid grid-cols-1 gap-8 border-b border-grey-200 py-16 md:grid-cols-12 md:gap-12 md:py-24"
    >
      <div className="flex flex-col justify-end gap-4 md:col-span-5">
        <span className="font-mono text-(size:--fs-4xs) tracking-widest text-accent-600 uppercase">
          {CATEGORY_LABELS[caseStudy.category]}
          {caseStudy.client ? ` // ${caseStudy.client}` : ""}
        </span>
        <h1 className="text-(size:--fs-4xl) leading-[0.95] font-extrabold tracking-[-0.02em] text-balance text-grey-900 not-md:text-(size:--fs-2xl)">
          {heading}
        </h1>
        {subtitle && (
          <p className="max-w-md text-(size:--fs-1xs) text-balance text-grey-500">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex flex-col justify-end gap-8 md:col-span-6 md:col-start-7">
        <p className="max-w-xl text-(size:--fs-s) text-grey-700">
          {caseStudy.description}
        </p>
        <div className="grid grid-cols-2 gap-8 border-t border-grey-200 pt-8">
          <div>
            <span className="mb-2 block font-mono text-(size:--fs-4xs) text-grey-500 uppercase">
              Role
            </span>
            <span className="font-mono text-(size:--fs-3xs) text-grey-900 uppercase">
              {caseStudy.role}
            </span>
          </div>
          <div>
            <span className="mb-2 block font-mono text-(size:--fs-4xs) text-grey-500 uppercase">
              Timeframe
            </span>
            <span className="font-mono text-(size:--fs-3xs) text-grey-900 uppercase">
              {formatCaseStudyTimeframe(caseStudy.timeframe)}
            </span>
          </div>
        </div>
        {caseStudy.stack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {caseStudy.stack.map((tech) => {
              return (
                <span
                  key={tech}
                  className="bg-grey-100 px-2 py-1 font-mono text-(size:--fs-4xs) font-medium tracking-wide text-grey-700"
                >
                  {tech}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </FullWidthWrapper>
  );
};

export default CaseStudyHeader;
