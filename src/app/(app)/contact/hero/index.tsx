import { heroSection, scopeSection } from "@app/contact/constants";
import FullWidthWrapper from "@components/full-width-wrapper";
import Hr from "@components/hr";

const Hero = () => {
  return (
    <FullWidthWrapper
      element="section"
      className="flex flex-col gap-6 py-16"
      wrapperProps={{
        "aria-label": "Get in touch with Gobind Singh",
        id: "contact-hero",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="size-2 shrink-0 rounded-full bg-accent-600 motion-safe:animate-pulse motion-reduce:animate-none"
          aria-hidden="true"
        />
        <span className="font-mono text-(size:--fs-4xs) font-medium tracking-wide text-accent-600 uppercase">
          {heroSection.availabilityLabel}
        </span>
        <span className="text-(size:--fs-4xs) text-grey-500">
          — {heroSection.location}
        </span>
      </div>

      <h1 className="max-w-4xl text-(size:--fs-3xl) leading-tight font-extrabold tracking-[-0.02em] text-balance text-grey-900 not-md:text-(size:--fs-1xl)">
        {heroSection.title}
      </h1>

      <p className="max-w-xl text-(size:--fs-1xs) text-grey-600">
        {heroSection.description}
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <span className="font-mono text-(size:--fs-4xs) tracking-widest text-grey-500 uppercase">
          {scopeSection.label}
        </span>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {scopeSection.items.map((item) => {
            return (
              <li
                key={item}
                className="relative pl-4 text-(size:--fs-3xs) text-grey-700 before:absolute before:top-2 before:left-0 before:size-1 before:bg-accent-600"
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>

      <Hr marginTop="mt-8" marginBottom="mb-0" />
    </FullWidthWrapper>
  );
};

export default Hero;
