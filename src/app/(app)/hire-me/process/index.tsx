import { processSection } from "@app/hire-me/process/constants";
import RailSection from "@components/rail-section";
import ScrollReveal from "@components/scroll-reveal";

const itemMapper = (
  { title, description }: (typeof processSection.steps)[number],
  index: number,
) => {
  const number = String(index + 1).padStart(2, "0");
  return (
    <li key={title} className="group py-8 first:pt-0 last:pb-0">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 className="translate-x-0 text-(size:--fs-l) font-medium text-grey-900 transition-all duration-300 ease-[ease] md:group-hover:translate-x-2 md:group-hover:text-accent-600">
          {title}
        </h3>
        <span
          aria-hidden="true"
          className="font-mono text-(size:--fs-4xs) text-grey-500"
        >
          {number}
        </span>
      </div>
      <p className="max-w-2xl text-(size:--fs-3xs) text-grey-700">
        {description}
      </p>
    </li>
  );
};

const Process = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <RailSection
      titleNumber={titleNumber}
      title={processSection.title}
      description={processSection.description}
      wrapperProps={{ "aria-label": "How the engagement works", id: "process" }}
    >
      <ScrollReveal>
        <ol className="divide-y divide-grey-200">
          {processSection.steps.map(itemMapper)}
        </ol>
      </ScrollReveal>
    </RailSection>
  );
};

export default Process;
