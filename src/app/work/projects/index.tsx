import WorkItemCard from "@app/work/components/work-item-card";
import { projectsSection } from "@app/work/constants";
import Section from "@components/section";

const itemMapper = (item: (typeof projectsSection.items)[number]) => {
  return <WorkItemCard key={item.slug ?? item.title} {...item} />;
};

const Projects = ({ titleNumber = "00" }: { titleNumber?: string }) => {
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
