import WorkItemCard from "@app/work/components/work-item-card";
import { getProjectsSection } from "@app/work/constants";
import Section from "@components/section";
import type { ProjectItem } from "@lib/projects";

const itemMapper = (item: ProjectItem) => {
  return <WorkItemCard key={item.slug ?? item.title} {...item} />;
};

const Projects = async ({ titleNumber = "00" }: { titleNumber?: string }) => {
  const projectsSection = await getProjectsSection();

  return (
    <Section
      title={`${titleNumber} // ${projectsSection.title}`}
      description={projectsSection.description}
      wrapperProps={{
        "aria-label": "Independent projects",
        id: "projects",
      }}
    >
      <ul className="flex flex-col gap-4">
        {projectsSection.items.map(itemMapper)}
      </ul>
    </Section>
  );
};

export default Projects;
