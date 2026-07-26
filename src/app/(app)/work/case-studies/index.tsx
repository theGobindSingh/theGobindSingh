import { getCaseStudiesSection } from "@app/work/constants";
import CaseStudySummaryCard from "@components/case-study-summary-card";
import Section from "@components/section";

const CaseStudies = async ({
  titleNumber = "00",
}: {
  titleNumber?: string;
}) => {
  const caseStudiesSection = await getCaseStudiesSection();

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
        {caseStudiesSection.items.map((item) => {
          return <CaseStudySummaryCard key={item.slug} {...item} />;
        })}
      </ul>
    </Section>
  );
};

export default CaseStudies;
