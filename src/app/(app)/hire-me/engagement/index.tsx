import { engagementSection } from "@app/hire-me/engagement/constants";
import ScrollReveal from "@components/scroll-reveal";
import Section from "@components/section";

const modelMapper = ({
  title,
  description,
}: (typeof engagementSection.models)[number]) => {
  return (
    <li key={title} className="flex flex-col gap-4 border border-grey-300 p-6">
      <h3 className="text-(size:--fs-l) font-medium">{title}</h3>
      <p className="text-(size:--fs-3xs) text-grey-700">{description}</p>
    </li>
  );
};

const Engagement = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <Section
      title={`${titleNumber} // ${engagementSection.title}`}
      description={engagementSection.lede}
      wrapperProps={{
        "aria-label": "Engagement models and pricing approach",
        id: "engagement",
      }}
    >
      <ScrollReveal>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {engagementSection.models.map(modelMapper)}
        </ul>
      </ScrollReveal>
      <p className="mt-2 max-w-2xl text-(size:--fs-3xs) text-grey-700">
        {engagementSection.closing}
      </p>
    </Section>
  );
};

export default Engagement;
