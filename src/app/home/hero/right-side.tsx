import { heroSection } from "@app/home/constants";
import Hr from "@components/hr";
import { fullName } from "@data";
import image from "@images/garden-me.jpeg";
import { tw } from "@utils/tailwind";
import Image from "next/image";

const RightSide = () => {
  const mapper = (
    tag: (typeof heroSection.impactTags)[number],
    index: number,
  ) => {
    return (
      <li key={index} className="flex w-fit flex-col items-start">
        <span className="font-mono text-(size:--fs-1xs) font-bold text-grey-800">
          {tag[0]}
        </span>
        <span className="text-(size:--fs-3xs) font-medium text-accent-600">
          {tag[1]}
        </span>
      </li>
    );
  };
  return (
    <div className="w-110 shrink-0 not-md:w-full">
      <Image
        src={image}
        alt={fullName}
        priority
        loading="eager"
        className={tw`
            aspect-3/4 h-auto
            w-full
            object-cover
        `}
      />
      <Hr />
      <ul className="grid w-full grid-cols-2 justify-start gap-4">
        {heroSection.impactTags.map(mapper)}
      </ul>
    </div>
  );
};

export default RightSide;
