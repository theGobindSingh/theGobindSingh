import FullWidthWrapper from "@components/full-width-wrapper";
import HoverSwapText from "@components/hover-swap-text";
import Hr from "@components/hr";
import { Link } from "@components/link";
import { footerData } from "@data";
import { tw } from "@utils/tailwind";
import { ArrowUpRight } from "lucide-react";
import { Fragment } from "react";

// md:hover:bg-[hsla(var(--color-grey-50-base),0.625)]!

const mapper = (
  { label, url, secondary }: (typeof footerData.links)[number],
  index: number,
  arr: typeof footerData.links,
) => {
  return (
    <Fragment key={url}>
      <Link href={url}>
        {label}
        {secondary && <HoverSwapText label={label} secondary={secondary} />}
      </Link>
      {index < arr.length - 1 && (
        <span aria-hidden="true" className="text-accent-600 select-none">
          ·
        </span>
      )}
    </Fragment>
  );
};

const Footer = () => {
  return (
    <FullWidthWrapper
      element="footer"
      className="flex flex-col items-start justify-center gap-4"
      wrapperClassName={tw`
        text-grey-700
        py-8
        border
        border-(--color-grey-100)
        border-t-transparent
        border-l-transparent
        border-r-transparent
        transition-all
        bg-[hsla(var(--color-grey-100-base),0.5)]
        `}
      wrapperProps={{
        id: "app-footer",
      }}
    >
      <span className="font-display text-(size:--fs-2xl) font-medium text-grey-950">
        {footerData.title}
      </span>
      <div className="flex w-full justify-between gap-8 text-(size:--fs-3xs) not-md:flex-col">
        <div className="flex max-w-[50ch] flex-col gap-3">
          <span>{footerData.description}</span>
          <Link
            href="/design"
            variant="text"
            className="group inline-flex w-fit items-end gap-1 text-grey-600"
          >
            {footerData.designSystemCta.prefix}{" "}
            <span className="text-accent-600">
              {footerData.designSystemCta.name}
            </span>
            <ArrowUpRight
              className="text-(size:--fs-m) transition-transform duration-(--dur-fast) ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              height="1em"
              width="1em"
            />
          </Link>
        </div>
        <div className="flex flex-col items-end justify-center gap-5 not-md:my-4 not-md:items-start not-md:gap-4">
          {/* Only the rule moves on hover — translating the whole link dragged
              the text with it. */}
          <Link
            href="/contact"
            variant="text"
            className={tw`
              relative w-fit pb-1 text-grey-900
              after:absolute after:inset-x-0 after:bottom-0 after:h-px
              after:bg-accent-600
              after:transition-transform after:duration-(--dur-fast)
              after:ease-out
              hover:after:translate-y-1
            `}
          >
            If your product has outgrown quick fixes, let's talk →
          </Link>
          <nav className="flex flex-wrap gap-x-2 gap-y-1 font-mono not-md:justify-start md:justify-end">
            {footerData.links.map(mapper)}
          </nav>
        </div>
      </div>
      <Hr bgColor="bg-grey-200" marginTop="mt-8" />
      <span className="font-mono text-(size:--fs-3xs) uppercase">
        {footerData.footNote.prefix}{" "}
        <span className="text-accent-600">{footerData.footNote.name}</span>
        <span aria-hidden="true">{" · "}</span>
        {footerData.footNote.suffix}
      </span>
    </FullWidthWrapper>
  );
};

export default Footer;
