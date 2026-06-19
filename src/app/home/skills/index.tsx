import FullWidthWrapper from "@components/full-width-wrapper";
import { skillsList } from "@data";

const Skills = () => {
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
            Capabilities
          </span>
        </div>

        <div className="col-span-8 flex flex-col gap-6">
          <h2
            className="
              font-display text-(size:--fs-4xl) leading-tight
              tracking-(--tracking-display) text-(--color-text) uppercase
            "
          >
            Technologies I work with.
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-1">
            {skillsList.map((skill) => {
              return (
                <div
                  key={skill}
                  className="
                    flex items-center gap-3 border-t border-(--color-border)
                    py-3
                  "
                >
                  <span className="font-mono text-xs text-(--color-accent-500)">
                    /
                  </span>
                  <span className="font-sans text-sm text-(--color-text)">
                    {skill}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </FullWidthWrapper>
  );
};

export default Skills;
