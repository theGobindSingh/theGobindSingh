export interface ExperienceTimeframe {
  /** ISO date, e.g. "2025-07-01". */
  start: string;
  /** ISO date, or null if still working here (Present). */
  end: string | null;
}

export interface ExperienceItem {
  company: string;
  position: string;
  website: string;
  timeframe: ExperienceTimeframe;
  responsibilities: string[];
  otherPositions?: string[];
}
