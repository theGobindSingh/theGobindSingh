import type { ExperienceItem } from "./types";

export const formatExperienceTimeframe = (
  timeframe: ExperienceItem["timeframe"],
): string => {
  const format = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const start = format(timeframe.start);
  const end = timeframe.end ? format(timeframe.end) : "Present";
  return `${start} - ${end}`;
};

export type { ExperienceItem, ExperienceTimeframe } from "./types";
