"use client";

import { Link } from "@components/link";
import {
  formatExperienceTimeframe,
  type ExperienceItem,
} from "@lib/experience";
import { tw } from "@utils/tailwind";
import { ChevronDown, CornerLeftUp, MoveLeft } from "lucide-react";
import { Fragment, useState } from "react";

const ExperienceCard = ({
  company,
  timeframe,
  position,
  responsibilities,
  website,
  otherPositions,
  defaultExpanded = false,
}: ExperienceItem & { defaultExpanded?: boolean }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

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
      <button
        type="button"
        onClick={() => {
          return setExpanded((prev) => {
            return !prev;
          });
        }}
        aria-expanded={expanded}
        className={tw`
          flex w-full
          items-center justify-between gap-4 text-left
        `}
      >
        <div className="flex flex-col gap-3">
          <h3
            className={tw`
              relative
              font-medium
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
            <Link
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {company}
            </Link>
          </h3>
          <div className="flex flex-col gap-3 text-(size:--fs-3xs)">
            <span className="text-accent-600">{position}</span>
            {otherPositions && otherPositions?.length > 0 && (
              <div className="flex w-full items-center gap-2 text-grey-500 not-md:overflow-x-auto">
                <CornerLeftUp className="size-[1em] shrink-0 translate-y-[-37.5%] text-(size:--fs-2xs)" />
                {otherPositions.map(positionMapper)}
              </div>
            )}
          </div>
          <span className="w-fit bg-grey-100 px-4 py-2 font-mono text-(size:--fs-4xs) tracking-wide text-grey-700">
            {formatExperienceTimeframe(timeframe)}
          </span>
        </div>
        <ChevronDown
          className={tw`
            size-[1em] shrink-0 text-(size:--fs-m) text-grey-500
            transition-transform duration-(--dur-fast)
            ${expanded ? "rotate-180" : ""}
          `}
        />
      </button>
      <div
        className={tw`
          grid transition-[grid-template-rows] duration-(--dur-base) ease-out
          ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        <ul
          className={tw`
            flex flex-col gap-4 overflow-hidden pl-[1ch] text-(size:--fs-3xs)
            text-grey-700
          `}
        >
          {responsibilities.map(responsibilityMapper)}
        </ul>
      </div>
    </li>
  );
};

export default ExperienceCard;
