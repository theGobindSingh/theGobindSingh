import { endorsementsSection } from "@app/home/constants";
import EndorsementChip from "@app/home/endorsements/endorsement-chip";
import Section from "@components/section";

const chipMapper = (
  testimonial: (typeof endorsementsSection.testimonials)[number],
) => {
  return <EndorsementChip key={testimonial.authorName} {...testimonial} />;
};

const Endorsements = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <Section
      title={`${titleNumber} // ${endorsementsSection.title}`}
      description={endorsementsSection.description}
      wrapperProps={{
        "aria-label": "Endorsements from people I've worked with",
        id: "endorsements",
      }}
    >
      {/* Two per row at md+, stacked on mobile. */}
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {endorsementsSection.testimonials.map(chipMapper)}
      </ul>
    </Section>
  );
};

export default Endorsements;
