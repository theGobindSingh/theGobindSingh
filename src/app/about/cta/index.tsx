import { ctaSection } from "@app/about/constants";
import FullWidthWrapper from "@components/full-width-wrapper";
import { Link } from "@components/link";
import { resumeLink, SOCIAL_KEYS, socialLinks } from "@data";

const Cta = () => {
  return (
    <FullWidthWrapper
      element="section"
      className="relative py-24"
      wrapperClassName="bg-accent-600 overflow-hidden"
      wrapperProps={{ "aria-label": "Resume and contact" }}
    >
      <div className="relative z-2 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-3xl text-(size:--fs-3xl) leading-tight font-bold text-balance text-grey-50">
            {ctaSection.title}
          </h2>
          <p className="max-w-xl text-(size:--fs-1xs) text-grey-50/80">
            {ctaSection.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href={resumeLink}
            download
            variant="filled"
            size="lg"
            color="grey"
            colorWeight={50}
            textColor="accent"
            textColorWeight={600}
            hoverBgColor="grey"
            hoverBgColorWeight={100}
          >
            Download resume
          </Link>
          <Link
            href="/contact"
            variant="outlined"
            size="lg"
            color="grey"
            colorWeight={50}
            hoverTextColor="accent"
            hoverTextColorWeight={600}
          >
            Go to contact page
          </Link>
          {socialLinks[SOCIAL_KEYS.LINKEDIN]?.url && (
            <Link
              href={socialLinks[SOCIAL_KEYS.LINKEDIN].url}
              target="_blank"
              rel="noopener noreferrer"
              variant="text"
              className="text-grey-50 hover:text-grey-200"
            >
              LinkedIn ↗
            </Link>
          )}
          {socialLinks[SOCIAL_KEYS.GITHUB]?.url && (
            <Link
              href={socialLinks[SOCIAL_KEYS.GITHUB].url}
              target="_blank"
              rel="noopener noreferrer"
              variant="text"
              className="text-grey-50 hover:text-grey-200"
            >
              GitHub ↗
            </Link>
          )}
        </div>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-10 font-mono text-[12rem] leading-none font-bold whitespace-nowrap text-grey-50/10 select-none not-md:hidden"
      >
        SHIPPED / RELIABLE
      </p>
    </FullWidthWrapper>
  );
};

export default Cta;
