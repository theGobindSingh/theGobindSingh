import FullWidthWrapper from "@components/full-width-wrapper";
import { Link } from "@components/link";

interface CtaAction {
  href: string;
  label: string;
  download?: boolean;
}

interface CtaTextLink {
  href: string;
  label: string;
}

export interface AccentCtaProps {
  ariaLabel: string;
  title: string;
  description: string;
  watermark: string;
  primaryAction: CtaAction;
  secondaryAction: CtaAction;
  textLinks?: CtaTextLink[];
}

const AccentCta = ({
  ariaLabel,
  title,
  description,
  watermark,
  primaryAction,
  secondaryAction,
  textLinks = [],
}: AccentCtaProps) => {
  return (
    <FullWidthWrapper
      element="section"
      className="relative py-24"
      wrapperClassName="bg-accent-600 overflow-hidden"
      wrapperProps={{ "aria-label": ariaLabel }}
    >
      <div className="relative z-2 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-3xl text-(size:--fs-3xl) leading-tight font-bold text-balance text-grey-50">
            {title}
          </h2>
          <p className="max-w-xl text-(size:--fs-1xs) text-grey-50/80">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href={primaryAction.href}
            download={primaryAction.download}
            variant="filled"
            size="lg"
            color="grey"
            colorWeight={50}
            textColor="accent"
            textColorWeight={600}
            hoverBgColor="grey"
            hoverBgColorWeight={100}
          >
            {primaryAction.label}
          </Link>
          <Link
            href={secondaryAction.href}
            variant="outlined"
            size="lg"
            color="grey"
            colorWeight={50}
            hoverTextColor="accent"
            hoverTextColorWeight={600}
          >
            {secondaryAction.label}
          </Link>
          {textLinks.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="text"
                className="text-grey-50 hover:text-grey-200"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
      {/* Sized to fit the container: the longest watermark is 18 monospace
          chars (~10.8em), so anything above ~7vw gets clipped by the wrapper's
          overflow-hidden and reads as a broken word rather than a bleed. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute right-0 -bottom-8 font-mono text-[clamp(3rem,7vw,8rem)] leading-none font-bold whitespace-nowrap text-grey-50/10 select-none not-md:hidden"
      >
        {watermark}
      </p>
    </FullWidthWrapper>
  );
};

export default AccentCta;
