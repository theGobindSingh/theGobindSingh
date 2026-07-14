import { ctaSection } from "@app/work/constants";
import AccentCta from "@components/accent-cta";
import { email, SOCIAL_KEYS, socialLinks } from "@data";

const Cta = () => {
  const textLinks = [
    socialLinks[SOCIAL_KEYS.LINKEDIN]?.url && {
      href: socialLinks[SOCIAL_KEYS.LINKEDIN].url,
      label: "LinkedIn ↗",
    },
    socialLinks[SOCIAL_KEYS.GITHUB]?.url && {
      href: socialLinks[SOCIAL_KEYS.GITHUB].url,
      label: "GitHub ↗",
    },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <AccentCta
      ariaLabel="Get in touch"
      title={ctaSection.title}
      description={ctaSection.description}
      watermark="BUILT / SHIPPED"
      primaryAction={{ href: `mailto:${email}`, label: "Email me" }}
      secondaryAction={{ href: "/contact", label: "Go to contact page" }}
      textLinks={textLinks}
    />
  );
};

export default Cta;
