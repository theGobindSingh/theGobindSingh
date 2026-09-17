import { testimonialsSection } from "@app/hire-me/testimonials/constants";
import EndorsementChip from "@app/home/endorsements/endorsement-chip";
import ScrollReveal from "@components/scroll-reveal";
import Section from "@components/section";
import { testimonials } from "@data";

const chipMapper = (testimonial: (typeof testimonials)[number]) => {
  return <EndorsementChip key={testimonial.authorName} {...testimonial} />;
};

const Testimonials = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <Section
      title={`${titleNumber} // ${testimonialsSection.title}`}
      description={testimonialsSection.lede}
      wrapperProps={{ "aria-label": "Testimonials", id: "testimonials" }}
    >
      <ScrollReveal>
        {/* Two per row at md+, stacked on mobile. */}
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map(chipMapper)}
        </ul>
      </ScrollReveal>
    </Section>
  );
};

export default Testimonials;
