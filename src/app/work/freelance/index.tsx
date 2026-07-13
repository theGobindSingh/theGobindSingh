import { freelanceSection } from "@app/work/constants";
import FreelanceCard from "@app/work/freelance/freelance-card";
import Section from "@components/section";

const itemMapper = (item: (typeof freelanceSection.items)[number]) => {
  return <FreelanceCard key={item.slug ?? item.title} {...item} />;
};

const Freelance = ({ titleNumber = "00" }: { titleNumber?: string }) => {
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
