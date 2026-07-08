import WorkItemCard from "@app/work/components/work-item-card";
import { caseStudiesSection } from "@app/work/constants";
import Section from "@components/section";

const itemMapper = (item: (typeof caseStudiesSection.items)[number]) => {
  return <WorkItemCard key={item.slug ?? item.title} {...item} />;
};

const CaseStudies = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <Section
      title={`${titleNumber} // ${caseStudiesSection.title}`}
      description={caseStudiesSection.description}
      wrapperProps={{
        "aria-label": "Case studies",
        id: "case-studies",
      }}
    >
      <ul className="flex flex-col gap-4">
        {caseStudiesSection.items.map(itemMapper)}
      </ul>
    </Section>
  );
};

export default CaseStudies;
