import FullWidthWrapper from "@components/full-width-wrapper";
import { Link } from "@components/link";
import { SOCIAL_KEYS, socialLinks } from "@data";
import { ArrowRight } from "lucide-react";

const Activity = () => {
  const githubLink = socialLinks[SOCIAL_KEYS.GITHUB];
  const githubUrl = githubLink?.url ?? "https://github.com/theGobindSingh";
  const username = githubLink?.userName ?? "theGobindSingh";

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
            Open Source
          </span>
        </div>

        <div className="col-span-8 flex flex-col gap-6">
          <h2
            className="
              font-display text-(size:--fs-4xl) leading-tight
              tracking-(--tracking-display) text-(--color-text) uppercase
            "
          >
            Code in public.
          </h2>

          <p
            className="
              max-w-2xl font-sans text-(size:--fs-2xs) leading-relaxed
              text-(--color-text-muted)
            "
          >
            I contribute to open source and share what I build. My GitHub
            profile reflects real work — side projects, experiments, and
            contributions across the React and TypeScript ecosystem.
          </p>

          <div className="mt-2 border border-(--color-border) p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg text-(--color-text)">
                  @{username}
                </span>
              </div>
              <Link
                href={githubUrl}
                variant="outlined"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub
                <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="border border-(--color-border) p-4 text-center">
                <div
                  className="
                    font-mono text-(size:--fs-m) text-(--color-accent-500)
                  "
                >
                  —
                </div>
                <div className="mt-1 font-mono text-xs text-(--color-text-subtle)">
                  Repositories
                </div>
              </div>
              <div className="border border-(--color-border) p-4 text-center">
                <div
                  className="
                    font-mono text-(size:--fs-m) text-(--color-accent-500)
                  "
                >
                  —
                </div>
                <div className="mt-1 font-mono text-xs text-(--color-text-subtle)">
                  Contributions
                </div>
              </div>
              <div className="border border-(--color-border) p-4 text-center">
                <div
                  className="
                    font-mono text-(size:--fs-m) text-(--color-accent-500)
                  "
                >
                  —
                </div>
                <div className="mt-1 font-mono text-xs text-(--color-text-subtle)">
                  Stars
                </div>
              </div>
            </div>

            <div className="font-mono text-xs text-(--color-text-subtle)">
              GitHub activity data is fetched client-side. Static placeholders
              shown until hydration.
            </div>
          </div>
        </div>
      </div>
    </FullWidthWrapper>
  );
};

export default Activity;
