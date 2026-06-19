import FullWidthWrapper from "@components/full-width-wrapper";
import { Link } from "@components/link";
import { contactData, email, SOCIAL_KEYS, socialLinks } from "@data";
import { ArrowRight, Mail } from "lucide-react";

const ContactSection = () => {
  const emailLink = socialLinks[SOCIAL_KEYS.EMAIL];

  return (
    <FullWidthWrapper
      element="section"
      wrapperClassName="bg-(--color-bg) py-(--section-pad-y)"
    >
      <div className="grid grid-cols-12 gap-x-8">
        <div className="col-span-4">
          <span
            className="
              font-mono text-xs tracking-wider text-(--color-text-subtle)
              uppercase
            "
          >
            Contact
          </span>
        </div>

        <div className="col-span-8 flex flex-col gap-8">
          <h2
            className="
              font-display text-(size:--fs-3xl) leading-tight
              tracking-(--tracking-display) text-(--color-text) uppercase
            "
          >
            {contactData.titleUpper}
            <br />
            {contactData.titleLower}
          </h2>

          <p
            className="
              max-w-2xl font-sans text-(size:--fs-2xs) leading-relaxed
              text-(--color-text-muted)
            "
          >
            {contactData.text}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Link href="/contact" variant="filled" size="lg">
              Book a call
            </Link>

            <a
              href={contactData.ctaLink}
              className="
                inline-flex items-center justify-center gap-2
                rounded-(--radius-none) border border-(--color-border) px-5
                py-2.5 font-sans text-base font-medium transition-colors
                duration-(--dur-fast) ease-out
                hover:border-accent-500 hover:text-accent-500
              "
            >
              <Mail className="size-4" />
              {contactData.ctaText}
            </a>

            <Link
              href={emailLink?.url ?? `mailto:${email}`}
              variant="text"
              className="font-mono text-xs tracking-wider uppercase"
            >
              {email}
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="mt-2 font-mono text-xs text-(--color-text-subtle)">
            Based in Punjab, India (IST). Response within 24 hours.
          </div>
        </div>
      </div>
    </FullWidthWrapper>
  );
};

export default ContactSection;
