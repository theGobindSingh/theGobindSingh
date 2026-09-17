import {
  getSelectedWork,
  selectedWorkSection,
  withHireMeCopy,
} from "@app/hire-me/selected-work/constants";
import FreelanceCard from "@components/freelance-card";
import { Link } from "@components/link";
import ScrollReveal from "@components/scroll-reveal";
import Section from "@components/section";
import type { FreelanceItem } from "@lib/freelance";

const itemMapper = (item: FreelanceItem) => {
  return (
    <FreelanceCard key={item.slug ?? item.title} {...withHireMeCopy(item)} />
  );
};

const SelectedWork = async ({
  titleNumber = "00",
}: {
  titleNumber?: string;
}) => {
  const items = await getSelectedWork();
  if (items.length === 0) return null;

  return (
    <Section
      title={`${titleNumber} // ${selectedWorkSection.title}`}
      description={selectedWorkSection.description}
      wrapperClassName="scroll-mt-24"
      wrapperProps={{
        "aria-label": "Selected work",
        id: "selected-work",
      }}
    >
      <ScrollReveal>
        <ul className="flex flex-col gap-4">{items.map(itemMapper)}</ul>
      </ScrollReveal>
      <Link
        href={selectedWorkSection.link.href}
        className="mt-4 ml-auto px-4 py-0 font-mono font-medium"
        color="accent"
        hoverTextColor="grey"
        hoverTextColorWeight={100}
        variant="outlined"
      >
        <span>{selectedWorkSection.link.label} </span>
        <span className="text-(size:--fs-m)">↗</span>
      </Link>
    </Section>
  );
};

export default SelectedWork;
