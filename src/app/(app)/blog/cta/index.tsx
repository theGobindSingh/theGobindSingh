import { getBlogCta } from "@app/blog/constants";
import AccentCta from "@components/accent-cta";
import { email } from "@data";

const Cta = async () => {
  const ctaSection = await getBlogCta();

  return (
    <AccentCta
      ariaLabel="Get in touch"
      title={ctaSection.title ?? ""}
      description={ctaSection.description ?? ""}
      watermark="WRITTEN / SHIPPED"
      primaryAction={{ href: "/contact", label: "Start a conversation" }}
      secondaryAction={{
        href: `mailto:${email}`,
        label: "Or email me directly",
      }}
    />
  );
};

export default Cta;
