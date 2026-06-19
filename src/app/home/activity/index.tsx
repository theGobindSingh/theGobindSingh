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
          <span className="font-mono text-xs uppercase tracking-wider text-(--color-text-subtle)">
            Open Source
          </span>
        </div>

        <div className="col-span-8 flex flex-col gap-6">
          <h2 className="font-display text-(--fs-4xl) tracking-(--tracking-display) text-(--color-text) uppercase leading-tight">
            Code in public.
          </h2>

          <p className="font-sans text-(--fs-2xs) text-(--color-text-muted) leading-relaxed max-w-2xl">
            I contribute to open source and share what I build. My GitHub
            profile reflects real work — side projects, experiments, and
            contributions across the React and TypeScript ecosystem.
          </p>

          <div className="border border-(--color-border) p-8 mt-2">
            <div className="flex items-center justify-between mb-6">
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
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="border border-(--color-border) p-4 text-center">
                <div className="font-mono text-(--fs-m) text-(--color-accent-500)">
                  —
                </div>
                <div className="font-mono text-xs text-(--color-text-subtle) mt-1">
                  Repositories
                </div>
              </div>
              <div className="border border-(--color-border) p-4 text-center">
                <div className="font-mono text-(--fs-m) text-(--color-accent-500)">
                  —
                </div>
                <div className="font-mono text-xs text-(--color-text-subtle) mt-1">
                  Contributions
                </div>
              </div>
              <div className="border border-(--color-border) p-4 text-center">
                <div className="font-mono text-(--fs-m) text-(--color-accent-500)">
                  —
                </div>
                <div className="font-mono text-xs text-(--color-text-subtle) mt-1">
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
