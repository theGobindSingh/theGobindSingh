import { Link } from "@components/link";
import { CATEGORY_LABELS } from "@data";
import {
  formatCaseStudyTimeframe,
  splitCaseStudyTitle,
  type CaseStudyWithSlug,
} from "@lib/case-studies";

const CaseStudySummaryCard = ({
  slug,
  title,
  description,
  category,
  stack,
  timeframe,
}: CaseStudyWithSlug) => {
  const { heading, subtitle } = splitCaseStudyTitle(title);

  return (
    <li id={slug} className="scroll-mt-24 border border-grey-300 p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-(size:--fs-4xs) font-medium tracking-wider text-accent-600 uppercase">
          {CATEGORY_LABELS[category]}
        </span>
        <span className="font-mono text-(size:--fs-4xs) tracking-wide text-grey-500 uppercase">
          {formatCaseStudyTimeframe(timeframe)}
        </span>
      </div>
      <h3 className="mt-3 text-(size:--fs-l) font-medium">{heading}</h3>
      {subtitle && (
        <p className="mt-1 max-w-2xl text-(size:--fs-2xs) text-balance text-grey-500">
          {subtitle}
        </p>
      )}
      <p className="mt-3 max-w-2xl text-(size:--fs-3xs) text-grey-700">
        {description}
      </p>
      {stack.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {stack.map((tech) => {
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
      <Link
        href={`/work/${slug}`}
        variant="outlined"
        color="accent"
        className="mt-6 inline-block text-(size:--fs-3xs)"
      >
        Read full case study →
      </Link>
    </li>
  );
};

export default CaseStudySummaryCard;
