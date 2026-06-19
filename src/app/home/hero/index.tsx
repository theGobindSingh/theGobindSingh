import FullWidthWrapper from "@components/full-width-wrapper";
import { Link } from "@components/link";
import { fullName, homeHeroData, SOCIAL_KEYS, socialLinks } from "@data";
import { ArrowRight, Circle } from "lucide-react";

const Hero = () => {
  return (
    <FullWidthWrapper
      element="section"
      wrapperClassName="bg-(--color-bg) pt-32 pb-24 border-b border-(--color-border)"
    >
      <div className="grid grid-cols-12 gap-x-8">
        <div className="col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-(--color-text-subtle)">
              Available for work
            </span>
            <div className="flex items-center gap-2">
              <Circle className="h-2 w-2 fill-accent-500 text-accent-500" />
              <span className="font-mono text-xs text-(--color-text-muted)">
                Punjab, India · IST
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            {[SOCIAL_KEYS.GITHUB, SOCIAL_KEYS.LINKEDIN, SOCIAL_KEYS.EMAIL].map(
              (key) => {
                const link = socialLinks[key];
                if (!link) return null;
                return (
                  <a
                    key={key}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-(--color-text-subtle) hover:text-(--color-text) transition-colors duration-(--dur-fast)"
                  >
                    <link.logo className="h-5 w-5" />
                  </a>
                );
              },
            )}
          </div>
        </div>

        <div className="col-span-8 flex flex-col gap-8">
          <div>
            <p className="font-sans text-(--fs-s) text-(--color-text-muted) leading-relaxed">
              {homeHeroData.titleSuffix}
            </p>
            <h1 className="font-display text-(--fs-display-hero) leading-(--leading-display) tracking-(--tracking-display) text-(--color-text) uppercase">
              {fullName}
            </h1>
          </div>

          <p className="font-sans text-(--fs-l) text-(--color-text-muted) leading-snug max-w-2xl">
            {homeHeroData.text}
          </p>

          <div className="flex items-center gap-4 mt-4">
            <Link
              href="/contact"
              variant="filled"
              size="lg"
              className="font-medium"
            >
              Book a call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/work" variant="outlined" size="lg">
              See my work
            </Link>
          </div>
        </div>
      </div>
    </FullWidthWrapper>
  );
};

export default Hero;
