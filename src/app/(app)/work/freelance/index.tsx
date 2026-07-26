import { getFreelanceSection } from "@app/work/constants";
import FreelanceCard from "@components/freelance-card";
import Section from "@components/section";
import type { FreelanceItem } from "@lib/freelance";

const itemMapper = (item: FreelanceItem, index: number) => {
  return (
    <FreelanceCard
      key={item.slug ?? item.title}
      {...item}
      priority={index === 0}
    />
  );
};

const Freelance = async ({ titleNumber = "00" }: { titleNumber?: string }) => {
  const freelanceSection = await getFreelanceSection();

  return (
    <Section
      title={`${titleNumber} // ${freelanceSection.title}`}
      description={freelanceSection.description}
      wrapperProps={{
        "aria-label": "Freelance client work",
        id: "freelance",
      }}
    >
      <ul className="flex flex-col gap-4">
        {freelanceSection.items.map(itemMapper)}
      </ul>
    </Section>
  );
};

export default Freelance;
