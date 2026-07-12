import { caseStudiesSection } from "@app/work/constants";
import CaseStudySummaryCard from "@components/case-study-summary-card";
import Section from "@components/section";

const itemMapper = (item: (typeof caseStudiesSection.items)[number]) => {
  return <CaseStudySummaryCard key={item.slug} {...item} />;
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
