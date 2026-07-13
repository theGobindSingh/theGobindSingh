import { ctaSection } from "@app/blog/constants";
import FullWidthWrapper from "@components/full-width-wrapper";
import { Link } from "@components/link";
import { email } from "@data";

const Cta = () => {
  return (
    <FullWidthWrapper
      className="flex flex-col gap-6 border-t border-grey-300 py-16"
      wrapperProps={{ "aria-label": "Get in touch" }}
    >
      <div className="flex flex-col gap-3">
        <h2 className="max-w-2xl text-(size:--fs-2xl) font-medium">
          {ctaSection.title}
        </h2>
        <p className="max-w-2xl text-(size:--fs-3xs) text-grey-700">
          {ctaSection.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={`mailto:${email}`}
          variant="filled"
          color="accent"
          size="lg"
        >
          Email me
        </Link>
        <Link href="/contact" variant="outlined" size="lg">
          Go to contact page
        </Link>
      </div>
    </FullWidthWrapper>
  );
};

export default Cta;
