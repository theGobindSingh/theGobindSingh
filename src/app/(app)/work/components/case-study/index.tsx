import type { CaseStudyWithSlug } from "@lib/case-studies";

import CaseStudyHeader from "./header";
import CaseStudySection from "./section";

const CaseStudyContent = ({ caseStudy }: { caseStudy: CaseStudyWithSlug }) => {
  return (
    <>
      <CaseStudyHeader caseStudy={caseStudy} />
      {caseStudy.sections.map((section, index) => {
        return (
          <CaseStudySection
            key={section.sectionTitle}
            section={section}
            index={index}
          />
        );
      })}
    </>
  );
};

export default CaseStudyContent;
