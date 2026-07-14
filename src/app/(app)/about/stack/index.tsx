import { stackSection } from "@app/about/constants";
import RailSection from "@components/rail-section";
import ScrollReveal from "@components/scroll-reveal";

const skillsListMapper = (skill: string) => {
  return (
    <li key={skill} className="text-(size:--fs-3xs) text-grey-700">
      {skill}
    </li>
  );
};

const categoryMapper = ([category, skills]: [string, string[]]) => {
  return (
    <div key={category}>
      <h3 className="mb-4 font-mono text-(size:--fs-3xs) font-medium tracking-wider text-grey-500 uppercase">
        {`/ ${category}`}
      </h3>
      <ul className="flex flex-col gap-2">{skills.map(skillsListMapper)}</ul>
    </div>
  );
};

const Stack = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <RailSection
      titleNumber={titleNumber}
      title={stackSection.title}
      description={stackSection.description}
      wrapperProps={{
        "aria-label": "Technical stack and tools",
        id: "stack",
      }}
    >
      <ScrollReveal>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {Object.entries(stackSection.skills).map(categoryMapper)}
        </div>
      </ScrollReveal>
    </RailSection>
  );
};

export default Stack;
