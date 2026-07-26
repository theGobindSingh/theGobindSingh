import { getWorkCta } from "@app/work/constants";
import AccentCta from "@components/accent-cta";
import { email, SOCIAL_KEYS, socialLinks } from "@data";

const Cta = async () => {
  const ctaSection = await getWorkCta();

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
      title={ctaSection.title ?? ""}
      description={ctaSection.description ?? ""}
      watermark="BUILT / SHIPPED"
      primaryAction={{ href: "/contact", label: "Start a conversation" }}
      secondaryAction={{
        href: `mailto:${email}`,
        label: "Or email me directly",
      }}
      textLinks={textLinks}
    />
  );
};

export default Cta;
