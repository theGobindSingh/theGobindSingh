import fs from "fs";
import path from "path";

import type { CaseStudy } from "./types";

const CASE_STUDIES_DIR = path.join(process.cwd(), "public/case-studies");

export type CaseStudyWithSlug = CaseStudy & { slug: string };

export const getCaseStudySlugs = (): string[] => {
  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((file) => {
      return file.endsWith(".json");
    })
    .map((file) => {
      return file.replace(/\.json$/, "");
    });
};

export const getCaseStudyBySlug = (
  slug: string,
): CaseStudyWithSlug | undefined => {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  return { ...(JSON.parse(raw) as CaseStudy), slug };
};

export const getAllCaseStudies = (): CaseStudyWithSlug[] => {
  return getCaseStudySlugs()
    .map(getCaseStudyBySlug)
    .filter((study): study is CaseStudyWithSlug => {
      return Boolean(study);
    })
    .sort((a, b) => {
      return (
        (a.order ?? Number.MAX_SAFE_INTEGER) -
        (b.order ?? Number.MAX_SAFE_INTEGER)
      );
    });
};

export const formatCaseStudyTimeframe = (
  timeframe: CaseStudy["timeframe"],
): string => {
  const format = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const start = format(timeframe.start);
  const end = timeframe.end ? format(timeframe.end) : "Present";
  return `${start} — ${end}`;
};

export type { Block, CaseStudy, CaseStudySection } from "./types";
