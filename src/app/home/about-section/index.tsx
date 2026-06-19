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
          <span
            className="
              font-mono text-xs tracking-wider text-(--color-text-subtle)
              uppercase
            "
          >
            About
          </span>
        </div>

        <div className="col-span-8 flex flex-col gap-6">
          <h2
            className="
              font-display text-(size:--fs-4xl) leading-tight
              tracking-(--tracking-display) text-(--color-text) uppercase
            "
          >
            I build, rebuild, and integrate web products that hold up in
            production.
          </h2>

          <div
            className="
              flex max-w-3xl flex-col gap-4 font-sans text-(size:--fs-2xs)
              leading-relaxed text-(--color-text-muted)
            "
          >
            <p>
              {fullName} — full stack developer based in Punjab, India. I ship
              polished, performant web apps for startups, agencies, and
              enterprises. Frontend-leaning but comfortable across the stack:
              React, Next.js, TypeScript, Node.js, and the ecosystems around
              them.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="border border-(--color-border) p-6">
                <h3
                  className="
                    mb-2 font-mono text-xs tracking-wider
                    text-(--color-text-subtle) uppercase
                  "
                >
                  Build
                </h3>
                <p className="font-sans text-sm/snug text-(--color-text)">
                  New products from zero. Architecture, design systems, APIs,
                  and deployment — end to end.
                </p>
              </div>
              <div className="border border-(--color-border) p-6">
                <h3
                  className="
                    mb-2 font-mono text-xs tracking-wider
                    text-(--color-text-subtle) uppercase
                  "
                >
                  Rebuild
                </h3>
                <p className="font-sans text-sm/snug text-(--color-text)">
                  Modernize legacy frontends, consolidate codebases, and fix
                  performance at scale.
                </p>
              </div>
              <div className="border border-(--color-border) p-6">
                <h3
                  className="
                    mb-2 font-mono text-xs tracking-wider
                    text-(--color-text-subtle) uppercase
                  "
                >
                  Integrate
                </h3>
                <p className="font-sans text-sm/snug text-(--color-text)">
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
