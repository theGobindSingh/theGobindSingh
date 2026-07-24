import { heroSection } from "@app/home/constants";
import Hr from "@components/hr";
import { fullName } from "@data";
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
        before:bg-accent-600
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
        <span className="sr-only">
          {`${fullName} — Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. `}
        </span>
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
            not-md:text-[17.5vw]
            `}
        >
          {heroSection.title.split("\n").map(mapper)}
        </span>
        <span className="block max-w-[80%] text-(size:--fs-l) font-semibold text-grey-500 not-md:max-w-full">
          {heroSection.subtitle}
        </span>
      </h1>
      <Hr />
      <div className="flex justify-between gap-2 not-md:flex-col not-md:gap-8">
        <p className="w-[60%] leading-loose not-md:w-full">
          {heroSection.desc}
        </p>
        <ul
          aria-label="My Strongholds"
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
