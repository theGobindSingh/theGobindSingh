import { servicesSection } from "@app/hire-me/services/constants";
import ScrollReveal from "@components/scroll-reveal";
import Section from "@components/section";
import ServiceCard from "./service-card";

const Services = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <Section
      title={`${titleNumber} // ${servicesSection.title}`}
      description={servicesSection.description}
      wrapperProps={{ "aria-label": "Services", id: "services" }}
    >
      <ScrollReveal>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesSection.items.map((item) => {
            return <ServiceCard key={item.title} {...item} />;
          })}
        </ul>
      </ScrollReveal>
    </Section>
  );
};

export default Services;
