import HomeSection from "@app/home/components/section";
import { projectsSection } from "@app/home/constants";
import WorkCard from "@app/home/projects/work-card";
import { Link } from "@components/link";
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

const SingleSection = ({
  title,
  workItems,
}: {
  title: string;
  workItems: WorkItem[];
}) => {
  return (
    <>
      <h3 className="font-mono text-(size:--fs-3xs) font-medium tracking-wider text-grey-700 uppercase">
        {title}
      </h3>
      <hr className="my-8 border-t border-grey-200 not-md:my-4" />
      <ul className="flex flex-col gap-8">{workItems.map(workItemsMapper)}</ul>
    </>
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
            <SingleSection
              title="/ Case Studies"
              workItems={projectsSection.caseStudies}
            />
          )}

        <hr className="my-8 border-t border-grey-200 not-md:my-4" />

        {projectsSection.projects && projectsSection.projects.length > 0 && (
          <SingleSection
            title="/ Projects"
            workItems={projectsSection.projects}
          />
        )}
      </div>
      <hr className="my-8 border-t border-grey-200 not-md:my-4" />
      <Link
        href="/work"
        className="ml-auto px-4 py-0 font-mono font-medium"
        // color="accent"
        // hoverTextColor="grey"
        // hoverTextColorWeight={100}
        variant="outlined"
      >
        <span>See all case studies & projects</span>
        <span className="text-(size:--fs-m)">↗</span>
      </Link>
      <hr className="mt-8 border-t border-grey-200 not-md:my-4" />
    </HomeSection>
  );
};

export default HomeProjectsSection;
