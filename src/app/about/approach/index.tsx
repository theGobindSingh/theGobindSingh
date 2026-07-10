import RailSection from "@app/about/components/rail-section";
import ScrollReveal from "@app/about/components/scroll-reveal";
import { approachSection } from "@app/about/constants";

const paragraphMapper = (paragraph: string, index: number) => {
  const key = `approach-paragraph-${index}`;
  return (
    <p key={key} className="text-(size:--fs-3xs) leading-loose text-grey-700">
      {paragraph}
    </p>
  );
};

const Approach = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <RailSection
      titleNumber={titleNumber}
      title={approachSection.title}
      wrapperProps={{
        "aria-label": "How Gobind Singh approaches his work",
        id: "approach",
      }}
    >
      <ScrollReveal className="flex flex-col gap-8">
        <h3 className="max-w-2xl text-(size:--fs-2xl) leading-tight font-bold text-balance text-grey-900">
          {approachSection.statement}
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {approachSection.paragraphs.map(paragraphMapper)}
        </div>
      </ScrollReveal>
    </RailSection>
  );
};

export default Approach;
