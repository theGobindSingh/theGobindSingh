import { ctaSection } from "@app/blog/constants";
import AccentCta from "@components/accent-cta";
import { email } from "@data";

const Cta = () => {
  return (
    <AccentCta
      ariaLabel="Get in touch"
      title={ctaSection.title}
      description={ctaSection.description}
      watermark="WRITTEN / SHIPPED"
      primaryAction={{ href: `mailto:${email}`, label: "Email me" }}
      secondaryAction={{ href: "/contact", label: "Go to contact page" }}
    />
  );
};

export default Cta;
