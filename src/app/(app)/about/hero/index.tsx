import { heroSection } from "@app/about/constants";
import FullWidthWrapper from "@components/full-width-wrapper";
import { tw } from "@utils/tailwind";

const titleMapper = (accentWords: string[]) => {
  return (line: string, index: number) => {
    const key = `about-hero-title-line-${index}`;
    const classNames = ["[text-box:trim-both_cap_text]"];
    if (index === 0) {
      classNames.push(tw`text-grey-600`);
    }
    const words = line.split(" ");
    const innerMapper = (word: string, wordIndex: number) => {
      const innerKey = `${key}-word-${wordIndex}`;
      return (
        <span key={innerKey}>
          {wordIndex > 0 ? " " : ""}
          <span
            className={
              accentWords.includes(word.replace(/[.,!?]+$/, ""))
                ? tw`text-accent-500`
                : undefined
            }
          >
            {word}
          </span>
        </span>
      );
    };
    return (
      <span key={key} className={classNames.join(" ")}>
        {words.map(innerMapper)}
      </span>
    );
  };
};

const Hero = () => {
  return (
    <FullWidthWrapper
      element="section"
      className="grid grid-cols-1 gap-8 py-16 text-[clamp(0rem,7.5vw,7.5rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-balance not-md:text-[17.5vw] md:min-h-[5.5lh] md:grid-cols-12"
      wrapperProps={{
        "aria-label": "Gobind Singh — about",
        id: "about-hero",
      }}
    >
      <div className="flex flex-col justify-start md:col-span-4 md:pt-[2.57lh]">
        <p className="mb-4 font-mono text-(size:--fs-3xs) font-medium tracking-widest text-grey-500 uppercase">
          {heroSection.nameLabel}
        </p>
        <hr className="border-grey-300" />
      </div>
      <h1
        className={tw`
          flex
          max-w-[15ch]
          flex-col
          gap-0
          text-grey-900
          not-md:max-w-full
          md:col-span-8 md:col-start-5
        `}
      >
        {heroSection.title
          .split("\n")
          .map(titleMapper(heroSection.accentWords))}
      </h1>
    </FullWidthWrapper>
  );
};

export default Hero;
