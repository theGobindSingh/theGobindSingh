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
          <span className="font-mono text-xs uppercase tracking-wider text-(--color-text-subtle)">
            Contact
          </span>
        </div>

        <div className="col-span-8 flex flex-col gap-8">
          <h2 className="font-display text-(--fs-3xl) tracking-(--tracking-display) text-(--color-text) uppercase leading-tight">
            {contactData.titleUpper}
            <br />
            {contactData.titleLower}
          </h2>

          <p className="font-sans text-(--fs-2xs) text-(--color-text-muted) leading-relaxed max-w-2xl">
            {contactData.text}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link href="/contact" variant="filled" size="lg">
              Book a call
            </Link>

            <a
              href={contactData.ctaLink}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-base border border-(--color-border) font-sans font-medium rounded-(--radius-none) transition-colors duration-(--dur-fast) ease-out hover:border-accent-500 hover:text-accent-500"
            >
              <Mail className="h-4 w-4" />
              {contactData.ctaText}
            </a>

            <Link
              href={emailLink?.url ?? `mailto:${email}`}
              variant="text"
              className="font-mono text-xs uppercase tracking-wider"
            >
              {email}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="font-mono text-xs text-(--color-text-subtle) mt-2">
            Based in Punjab, India (IST). Response within 24 hours.
          </div>
        </div>
      </div>
    </FullWidthWrapper>
  );
};

export default ContactSection;
