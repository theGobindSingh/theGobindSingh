import { blogHero } from "@app/blog/constants";
import FullWidthWrapper from "@components/full-width-wrapper";

const titleWords = blogHero.title.split(" ");
const titleLead = titleWords.slice(0, -1).join(" ");
const titleAccent = titleWords[titleWords.length - 1];

const Hero = () => {
  return (
    <FullWidthWrapper
      element="section"
      className="grid grid-cols-12 gap-8 py-16"
      wrapperProps={{ "aria-label": "Blog introduction" }}
    >
      <div className="col-span-12 md:col-span-8">
        <p className="mb-4 font-mono text-(size:--fs-3xs) font-medium tracking-widest text-accent-600 uppercase">
          {blogHero.eyebrow}
        </p>
        <h1 className="max-w-[9ch] text-[7rem] leading-[0.95] font-bold tracking-tight text-balance uppercase">
          {titleLead} <br />
          <span className="text-grey-500 italic">{titleAccent}</span>
        </h1>
      </div>
      <div className="col-span-12 flex flex-col justify-end pb-2 md:col-span-4">
        <p className="max-w-sm border-l border-grey-300 pl-6 text-(size:--fs-3xs) text-grey-700">
          {blogHero.description}
        </p>
      </div>
    </FullWidthWrapper>
  );
};

export default Hero;
