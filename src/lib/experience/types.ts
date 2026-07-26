export interface ExperienceTimeframe {
  /** ISO date, e.g. "2025-07-01". */
  start: string;
  /** ISO date, or null if there is no end date. */
  end: string | null;
  /** If true, shows "Present" regardless of `end`. */
  ongoing: boolean;
}

export interface ExperienceItem {
  company: string;
  position: string;
  website: string;
  timeframe: ExperienceTimeframe;
  responsibilities: string[];
  otherPositions?: string[];
}
