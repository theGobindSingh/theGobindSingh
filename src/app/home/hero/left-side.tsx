import { heroSection } from "@app/home/constants";
import { tw } from "@utils/tailwind";

const mapper = (line: string, index: number) => {
  const key = `hero-title-line-${index}`;
  return (
    <span key={key} className="[text-box:trim-both_cap_text]">
      {line + " "}
    </span>
  );
};

const tagsMapper = (tag: string, index: number) => {
  const key = `hero-tag-${index}`;
  return (
    <li
      key={key}
      className={tw`
        relative flex items-center justify-start gap-2 text-(size:--fs-4xs)
        font-medium
        text-grey-700
        before:size-[0.5em]
        before:bg-accent-500
        `}
    >
      {tag}
    </li>
  );
};

const LeftSide = () => {
  return (
    <div className="w-full max-w-210 not-md:w-full">
      <h1 className="flex w-full flex-col gap-4 not-md:gap-2">
        <span
          className={tw`
            flex
            flex-col
            gap-0
            text-[7.5rem]
            font-extrabold
            tracking-[-0.04em]
            text-grey-900
            not-md:max-w-full
            `}
        >
          {heroSection.title.split("\n").map(mapper)}
        </span>
        <span className="block max-w-[80%] text-(size:--fs-l) font-semibold text-grey-500 not-md:max-w-full">
          {heroSection.subtitle}
        </span>
      </h1>
      <div className="custom:divider mt-16 mb-8 h-px w-full bg-grey-200" />
      <div className="flex justify-between gap-2">
        <p className="w-[60%] leading-loose">{heroSection.desc}</p>
        <ul
          className={tw`
            flex
            list-[square]
            flex-col gap-2
            font-mono
            `}
        >
          {heroSection.tags.map(tagsMapper)}
        </ul>
      </div>
    </div>
  );
};

export default LeftSide;
