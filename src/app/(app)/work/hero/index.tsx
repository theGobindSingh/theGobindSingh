import { workHero } from "@app/work/constants";
import FullWidthWrapper from "@components/full-width-wrapper";

const Hero = () => {
  return (
    <FullWidthWrapper
      element="section"
      className="grid grid-cols-12 gap-8 py-16"
      wrapperProps={{ "aria-label": "Work introduction" }}
    >
      <div className="col-span-12 md:col-span-8">
        <p className="mb-4 font-mono text-(size:--fs-3xs) font-medium tracking-widest text-accent-600 uppercase">
          {workHero.eyebrow}
        </p>
        <h1 className="max-w-[12ch] text-[clamp(0rem,7.5vw,7.5rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-balance text-grey-900 not-md:max-w-full not-md:text-[17.5vw]">
          {workHero.titleLead}{" "}
          <span className="text-accent-600">{workHero.titleAccent}</span>
        </h1>
      </div>
      <div className="col-span-12 flex flex-col justify-end pb-2 md:col-span-4">
        <p className="max-w-sm border-l border-grey-300 pl-6 text-(size:--fs-3xs) text-grey-700">
          {workHero.description}
        </p>
      </div>
    </FullWidthWrapper>
  );
};

export default Hero;
