import FullWidthWrapper from "@components/full-width-wrapper";
import { testimonials } from "@data";

const Testimonials = () => {
  const featured = testimonials.filter((t) => {
    return t.featured;
  });

  if (featured.length === 0) return null;

  return (
    <FullWidthWrapper
      element="section"
      wrapperClassName="bg-(--color-bg) py-(--section-pad-y) border-b border-(--color-border)"
    >
      <div className="grid grid-cols-12 gap-x-8">
        <div className="col-span-4">
          <span className="font-mono text-xs uppercase tracking-wider text-(--color-text-subtle)">
            Testimonials
          </span>
        </div>

        <div className="col-span-8 flex flex-col gap-10">
          {featured.map((t) => {
            return (
              <div
                key={t.authorName}
                className="border-l-2 border-(--color-accent-500) pl-6"
              >
                <blockquote className="font-sans text-(--fs-s) text-(--color-text) leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-2 mt-4">
                  <span className="font-sans text-sm text-(--color-text) font-medium">
                    {t.authorName}
                  </span>
                  <span className="font-mono text-xs text-(--color-text-subtle)">
                    {t.role}, {t.company}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FullWidthWrapper>
  );
};

export default Testimonials;
