import FullWidthWrapper from "@components/full-width-wrapper";
import { Link } from "@components/link";
import { caseStudies } from "@data";
import { ArrowRight } from "lucide-react";

const SelectedWork = () => {
  const featured = caseStudies
    .filter((cs) => {
      return cs.featured;
    })
    .sort((a, b) => {
      return a.order - b.order;
    });

  return (
    <FullWidthWrapper
      element="section"
      wrapperClassName="bg-(--color-bg) py-(--section-pad-y) border-b border-(--color-border)"
    >
      <div className="grid grid-cols-12 gap-x-8">
        <div className="col-span-4">
          <span className="font-mono text-xs uppercase tracking-wider text-(--color-text-subtle)">
            Selected Work
          </span>
        </div>

        <div className="col-span-8 flex flex-col gap-16">
          {featured.map((cs) => {
            return (
              <div
                key={cs.slug}
                className="flex flex-col gap-4 border-b border-(--color-border) pb-12 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-(--color-accent-500)">
                    {cs.type}
                  </span>
                  <span className="font-mono text-xs text-(--color-text-subtle)">
                    {cs.timeframe}
                  </span>
                </div>

                <h3 className="font-display text-(--fs-2xl) tracking-(--tracking-display) text-(--color-text) uppercase leading-tight">
                  {cs.title}
                </h3>

                <p className="font-sans text-(--fs-2xs) text-(--color-text-muted) leading-relaxed max-w-2xl">
                  {cs.summary}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {cs.stack.map((tech) => {
                    return (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2 py-0.5 border border-(--color-border) text-(--color-text-subtle)"
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center gap-6 mt-2">
                  {cs.metrics.map((metric) => {
                    return (
                      <span
                        key={metric}
                        className="font-mono text-xs text-(--color-accent-500)"
                      >
                        {metric}
                      </span>
                    );
                  })}
                </div>

                <div className="mt-1">
                  <Link
                    href={`/work/${cs.slug}`}
                    variant="text"
                    className="font-mono text-xs uppercase tracking-wider"
                  >
                    Read case study
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}

          <Link
            href="/work"
            variant="outlined"
            size="lg"
            className="self-start mt-4"
          >
            View all work
          </Link>
        </div>
      </div>
    </FullWidthWrapper>
  );
};

export default SelectedWork;
