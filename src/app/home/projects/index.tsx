import { projectsSection } from "@app/home/constants";
import WorkCard from "@app/home/projects/work-card";
import CaseStudySummaryCard from "@components/case-study-summary-card";
import { Link } from "@components/link";
import HomeSection from "@components/section";
import { WorkItem } from "@data";
import { Fragment } from "react";

const workItemsMapper = (
  workItem: WorkItem,
  index: number,
  arr: WorkItem[],
) => {
  const key = `${workItem.type}-${workItem.title}`;
  return (
    <Fragment key={key}>
      <WorkCard {...workItem} />
      {index < arr.length - 1 && (
        <hr className="my-8 border-t border-grey-200 not-md:my-4" />
      )}
    </Fragment>
  );
};

const HomeProjectsSection = ({
  titleNumber = "00",
}: {
  titleNumber?: string;
}) => {
  return (
    <HomeSection
      title={`${titleNumber} // ${projectsSection.title}`}
      description={projectsSection.description}
      wrapperProps={{
        "aria-label": "Case studies and engineering projects",
        id: "projects",
      }}
      link={{
        label: "See all case studies & projects",
        href: "/work",
      }}
    >
      <div className="flex flex-col gap-4">
        {projectsSection.caseStudies &&
          projectsSection.caseStudies.length > 0 && (
            <>
              <h3 className="font-mono text-(size:--fs-3xs) font-medium tracking-wider text-grey-700 uppercase">
                {"/ Case Studies"}
              </h3>
              <hr className="my-8 border-t border-grey-200 not-md:my-4" />
              <ul className="flex flex-col gap-4">
                {projectsSection.caseStudies.map((caseStudy) => {
                  return (
                    <CaseStudySummaryCard key={caseStudy.slug} {...caseStudy} />
                  );
                })}
              </ul>
            </>
          )}

        {/* <hr className="my-8 border-t border-grey-200 not-md:my-4" /> */}

        {projectsSection.projects && projectsSection.projects.length > 0 && (
          <>
            <h3 className="mt-16 font-mono text-(size:--fs-3xs) font-medium tracking-wider text-grey-700 uppercase not-md:mt-6">
              {"/ Projects"}
            </h3>
            <hr className="my-8 border-t border-grey-200 not-md:my-4" />
            <ul className="flex flex-col gap-8">
              {projectsSection.projects.map(workItemsMapper)}
            </ul>
          </>
        )}
      </div>
      <hr className="my-8 border-t border-grey-200 not-md:my-4" />
      <Link
        href="/work"
        className="ml-auto px-4 py-0 font-mono font-medium"
        variant="outlined"
      >
        <span>See all case studies & projects</span>
        <span className="text-(size:--fs-m)">↗</span>
      </Link>
      {/* <hr className="mt-8 border-t border-grey-200 not-md:my-4" /> */}
    </HomeSection>
  );
};

export default HomeProjectsSection;
