import { Link } from "@components/link";
import type { WorkItem } from "@data";
import { Plus } from "lucide-react";

const CATEGORY_LABELS: Record<NonNullable<WorkItem["category"]>, string> = {
  build: "Build",
  rebuild: "Rebuild",
  integration: "Integration",
  frontend: "Frontend",
};

const chipMapper = (prefix: string) => {
  return (chip: string, index: number) => {
    const key = `${prefix}-chip-${index}`;
    return (
      <span
        key={key}
        className="bg-grey-100 px-2 py-1 font-mono text-(size:--fs-4xs) font-medium tracking-wide text-grey-700"
      >
        {chip}
      </span>
    );
  };
};

const metricMapper = (prefix: string) => {
  return (metric: string, index: number) => {
    const key = `${prefix}-metric-${index}`;
    return (
      <li
        key={key}
        className="relative pl-4 text-(size:--fs-3xs) text-grey-700 before:absolute before:top-2 before:left-0 before:size-1 before:bg-accent-600"
      >
        {metric}
      </li>
    );
  };
};

const WorkItemCard = ({
  title,
  description,
  stack,
  metrics,
  timeframe,
  problem,
  approach,
  outcome,
  links,
  slug,
  category,
  type,
}: WorkItem) => {
  const key = slug ?? title;

  return (
    <li id={slug} className="scroll-mt-24 border border-grey-300">
      <details className="work-card-details">
        <summary className="work-card-summary">
          <div className="flex items-center justify-between gap-4">
            {category && (
              <span className="font-mono text-(size:--fs-4xs) font-medium tracking-wider text-accent-600 uppercase">
                {CATEGORY_LABELS[category]}
              </span>
            )}
            <div className="flex items-center gap-3">
              <span className="font-mono text-(size:--fs-4xs) tracking-wide text-grey-500">
                {timeframe}
              </span>
              <Plus
                className="size-[1em] shrink-0 work-card-icon text-(size:--fs-2xs) text-grey-500"
                aria-hidden="true"
              />
            </div>
          </div>
          <h3 className="text-(size:--fs-l) font-medium">{title}</h3>
          <p className="max-w-2xl text-(size:--fs-3xs) text-grey-700">
            {description}
          </p>
        </summary>

        <div className="flex flex-col gap-8 border-t border-grey-200 p-6 pt-8">
          {stack.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {stack.map(chipMapper(key))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-8 not-md:grid-cols-1">
            <div className="flex flex-col gap-2">
              <h4 className="font-mono text-(size:--fs-4xs) text-grey-500 uppercase">
                {"/ The Constraints"}
              </h4>
              <p className="text-(size:--fs-3xs) leading-6.5 text-grey-700">
                {problem}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-mono text-(size:--fs-4xs) text-grey-500 uppercase">
                {"/ The Approach"}
              </h4>
              <p className="text-(size:--fs-3xs) leading-6.5 text-grey-700">
                {approach}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-grey-200 pt-6">
            <h4 className="font-mono text-(size:--fs-4xs) text-grey-500 uppercase">
              {"/ The Outcome"}
            </h4>
            <p className="max-w-2xl text-(size:--fs-3xs) leading-6.5 text-grey-800">
              {outcome}
            </p>
            {metrics && metrics.length > 0 && (
              <ul className="flex flex-col gap-1.5 pt-1">
                {metrics.map(metricMapper(key))}
              </ul>
            )}
          </div>

          {links && (links.github ?? links.live) && (
            <div className="flex flex-wrap items-center gap-6 border-t border-grey-200 pt-6">
              {links.github && (
                <Link
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                  className="p-0 font-mono"
                >
                  View Repository →
                </Link>
              )}
              {links.live && (
                <Link
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                  className="p-0 font-mono"
                >
                  View Live →
                </Link>
              )}
            </div>
          )}

          {type === "case-study" && slug && (
            <Link
              href={`/work/${slug}`}
              variant="outlined"
              color="accent"
              className="self-end text-(size:--fs-3xs)"
            >
              Read full case study →
            </Link>
          )}
        </div>
      </details>
    </li>
  );
};

export default WorkItemCard;
