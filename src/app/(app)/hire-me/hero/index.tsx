import { heroSection } from "@app/hire-me/constants";
import FullWidthWrapper from "@components/full-width-wrapper";
import Hr from "@components/hr";
import { Link } from "@components/link";

const Hero = () => {
  return (
    <FullWidthWrapper
      element="section"
      className="flex flex-col gap-6 py-16"
      wrapperProps={{
        "aria-label": "Hire a React and Next.js developer",
        id: "hero",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="size-2 shrink-0 rounded-full bg-accent-600 motion-safe:animate-pulse motion-reduce:animate-none"
          aria-hidden="true"
        />
        <span className="font-mono text-(size:--fs-4xs) font-medium tracking-wide text-accent-600 uppercase">
          {heroSection.eyebrow}
        </span>
      </div>

      <h1 className="max-w-4xl text-(size:--fs-3xl) leading-tight font-extrabold tracking-[-0.02em] text-balance text-grey-900 not-md:text-(size:--fs-1xl)">
        {heroSection.title}
      </h1>

      <p className="max-w-xl text-(size:--fs-1xs) text-grey-600">
        {heroSection.subhead}
      </p>

      <p className="max-w-2xl text-(size:--fs-3xs) text-grey-700">
        {heroSection.credibility}
      </p>

      <p className="max-w-2xl text-(size:--fs-3xs) text-grey-700">
        {heroSection.availability}
      </p>

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
        <Link
          href={heroSection.primaryCta.href}
          variant="filled"
          size="lg"
          color="accent"
          className="min-h-11 w-full md:w-auto"
        >
          {heroSection.primaryCta.label}
        </Link>
        <Link
          href={heroSection.secondaryCta.href}
          variant="outlined"
          size="lg"
          color="accent"
          className="min-h-11 w-full md:w-auto"
        >
          {heroSection.secondaryCta.label}
        </Link>
      </div>

      <p className="text-(size:--fs-3xs) text-grey-600">
        {heroSection.microcopy}
      </p>

      <Hr marginTop="mt-8" marginBottom="mb-0" />
    </FullWidthWrapper>
  );
};

export default Hero;
