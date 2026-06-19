import FullWidthWrapper from "@components/full-width-wrapper";
import { fullName } from "@data";

const AboutSection = () => {
  return (
    <FullWidthWrapper
      element="section"
      wrapperClassName="bg-(--color-bg) py-(--section-pad-y) border-b border-(--color-border)"
    >
      <div className="grid grid-cols-12 gap-x-8">
        <div className="col-span-4">
          <span className="font-mono text-xs uppercase tracking-wider text-(--color-text-subtle)">
            About
          </span>
        </div>

        <div className="col-span-8 flex flex-col gap-6">
          <h2 className="font-display text-(--fs-4xl) tracking-(--tracking-display) text-(--color-text) uppercase leading-tight">
            I build, rebuild, and integrate web products that hold up in
            production.
          </h2>

          <div className="flex flex-col gap-4 font-sans text-(--fs-2xs) text-(--color-text-muted) leading-relaxed max-w-3xl">
            <p>
              {fullName} — full stack developer based in Punjab, India. I ship
              polished, performant web apps for startups, agencies, and
              enterprises. Frontend-leaning but comfortable across the stack:
              React, Next.js, TypeScript, Node.js, and the ecosystems around
              them.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="border border-(--color-border) p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-(--color-text-subtle) mb-2">
                  Build
                </h3>
                <p className="font-sans text-sm text-(--color-text) leading-snug">
                  New products from zero. Architecture, design systems, APIs,
                  and deployment — end to end.
                </p>
              </div>
              <div className="border border-(--color-border) p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-(--color-text-subtle) mb-2">
                  Rebuild
                </h3>
                <p className="font-sans text-sm text-(--color-text) leading-snug">
                  Modernize legacy frontends, consolidate codebases, and fix
                  performance at scale.
                </p>
              </div>
              <div className="border border-(--color-border) p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-(--color-text-subtle) mb-2">
                  Integrate
                </h3>
                <p className="font-sans text-sm text-(--color-text) leading-snug">
                  Connect systems, build APIs, and unify data layers so
                  everything talks to everything else.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullWidthWrapper>
  );
};

export default AboutSection;
