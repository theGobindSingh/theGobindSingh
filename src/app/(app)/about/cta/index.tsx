import { getAboutCta } from "@app/about/constants";
import AccentCta from "@components/accent-cta";
import { resumeLink, SOCIAL_KEYS, socialLinks } from "@data";

const Cta = async () => {
  const ctaSection = await getAboutCta();

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
      ariaLabel="Resume and contact"
      title={ctaSection.title ?? ""}
      description={ctaSection.description ?? ""}
      watermark="SHIPPED / RELIABLE"
      primaryAction={{
        href: resumeLink,
        label: "Download resume",
        download: true,
      }}
      secondaryAction={{ href: "/contact", label: "Go to contact page" }}
      textLinks={textLinks}
    />
  );
};

export default Cta;
