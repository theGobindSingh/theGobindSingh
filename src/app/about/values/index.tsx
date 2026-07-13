import { principlesSection } from "@app/about/constants";
import RailSection from "@components/rail-section";
import ScrollReveal from "@components/scroll-reveal";

const itemMapper = (
  { title, description }: (typeof principlesSection.items)[number],
  index: number,
) => {
  const number = String(index + 1).padStart(3, "0");
  return (
    <div key={title} className="py-8 first:pt-0 last:pb-0">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 className="text-(size:--fs-l) font-medium text-grey-900">
          {title}
        </h3>
        <span className="font-mono text-(size:--fs-4xs) text-grey-500">
          {number}
        </span>
      </div>
      <p className="max-w-2xl text-(size:--fs-3xs) text-grey-700">
        {description}
      </p>
    </div>
  );
};

const Values = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <RailSection
      titleNumber={titleNumber}
      title={principlesSection.title}
      description={principlesSection.description}
      wrapperProps={{
        "aria-label": "Values around quality and communication",
        id: "principles",
      }}
    >
      <ScrollReveal className="divide-y divide-grey-200">
        {principlesSection.items.map(itemMapper)}
      </ScrollReveal>
    </RailSection>
  );
};

export default Values;
