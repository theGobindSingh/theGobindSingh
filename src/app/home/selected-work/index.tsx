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
          <span
            className="
              font-mono text-xs tracking-wider text-(--color-text-subtle)
              uppercase
            "
          >
            Selected Work
          </span>
        </div>

        <div className="col-span-8 flex flex-col gap-16">
          {featured.map((cs) => {
            return (
              <div
                key={cs.slug}
                className="
                  flex flex-col gap-4 border-b border-(--color-border) pb-12
                  last:border-b-0 last:pb-0
                "
              >
                <div className="flex items-center gap-3">
                  <span
                    className="
                      font-mono text-xs tracking-wider text-(--color-accent-500)
                      uppercase
                    "
                  >
                    {cs.type}
                  </span>
                  <span className="font-mono text-xs text-(--color-text-subtle)">
                    {cs.timeframe}
                  </span>
                </div>

                <h3
                  className="
                    font-display text-(size:--fs-2xl) leading-tight
                    tracking-(--tracking-display) text-(--color-text) uppercase
                  "
                >
                  {cs.title}
                </h3>

                <p
                  className="
                    max-w-2xl font-sans text-(size:--fs-2xs)
                    leading-relaxed text-(--color-text-muted)
                  "
                >
                  {cs.summary}
                </p>

                <div className="mt-1 flex flex-wrap gap-2">
                  {cs.stack.map((tech) => {
                    return (
                      <span
                        key={tech}
                        className="
                          border border-(--color-border) px-2 py-0.5 font-mono
                          text-xs text-(--color-text-subtle)
                        "
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>

                <div className="mt-2 flex items-center gap-6">
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
                    className="font-mono text-xs tracking-wider uppercase"
                  >
                    Read case study
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            );
          })}

          <Link
            href="/work"
            variant="outlined"
            size="lg"
            className="mt-4 self-start"
          >
            View all work
          </Link>
        </div>
      </div>
    </FullWidthWrapper>
  );
};

export default SelectedWork;
