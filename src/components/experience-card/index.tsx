import { Link } from "@components/link";
import { experienceData } from "@data";
import { tw } from "@utils/tailwind";
import { CornerLeftUp, MoveLeft } from "lucide-react";
import { Fragment } from "react";

const ExperienceCard = ({
  company,
  dateRange,
  position,
  responsibilities,
  website,
  otherPositions,
}: (typeof experienceData)[number]) => {
  const positionMapper = (pos: string, index: number, arr: string[]) => {
    const key = `${company} - ${pos}`;
    return (
      <Fragment key={key}>
        <span className="shrink-0 text-(size:--fs-3xs) text-inherit">
          {pos}
        </span>
        {index !== arr.length - 1 && (
          <MoveLeft className="size-[1em] shrink-0 text-(size:--fs-2xs)" />
        )}
      </Fragment>
    );
  };

  const responsibilityMapper = (res: string, index: number) => {
    const key = `${company} - res - ${index}`;
    return (
      <li key={key} className="list-['/'] pl-[2ch] marker:text-accent-600">
        {res}
      </li>
    );
  };

  return (
    <li
      className={tw`
        flex
        flex-col gap-6
        pl-(--_left-space)
        [--_left-space:48px]
        not-md:pl-0
    `}
    >
      <div
        className={tw`
          relative flex items-center justify-between
          before:absolute
          before:top-[50%]
          before:left-0
          before:size-2.5
          before:-translate-x-(--_left-space)
          before:translate-y-[-50%]
          before:bg-accent-600
          not-md:before:content-none
        `}
      >
        <h3 className="font-medium">
          <Link href={website} target="_blank" rel="noopener noreferrer">
            {company}
          </Link>
        </h3>
        <span className="bg-grey-100 px-4 py-2 font-mono text-(size:--fs-4xs) tracking-wide text-grey-700">
          {dateRange}
        </span>
      </div>
      <div className="flex flex-col gap-2 text-(size:--fs-3xs)">
        <span className="text-accent-600">{position}</span>
        {otherPositions && otherPositions?.length > 0 && (
          <div className="flex w-full items-center gap-2 text-grey-500 not-md:overflow-x-auto">
            <CornerLeftUp className="size-[1em] shrink-0 translate-y-[-37.5%] text-(size:--fs-2xs)" />
            {otherPositions.map(positionMapper)}
          </div>
        )}
      </div>
      <ul className="flex flex-col gap-4 pl-[1ch] text-(size:--fs-3xs) text-grey-700">
        {responsibilities.map(responsibilityMapper)}
      </ul>
    </li>
  );
};

export default ExperienceCard;
