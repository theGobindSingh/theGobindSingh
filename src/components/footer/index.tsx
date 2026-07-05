import FullWidthWrapper from "@components/full-width-wrapper";
import Hr from "@components/hr";
import { Link } from "@components/link";
import { footerData } from "@data";
import { tw } from "@utils/tailwind";

// md:hover:bg-[hsla(var(--color-grey-50-base),0.625)]!

const mapper = ({ label, url }: (typeof footerData.links)[number]) => {
  return (
    <Link key={url} href={url}>
      {label}
    </Link>
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
      <span className="font-cursive text-(size:--fs-1xl) font-semibold text-grey-950 uppercase">
        {footerData.title}
      </span>
      <div className="flex w-full justify-between gap-8 text-(size:--fs-3xs) not-md:flex-col">
        <span className="max-w-[50ch]">{footerData.description}</span>
        <div className="flex flex-col items-end justify-center gap-2 not-md:my-4 not-md:items-start not-md:gap-1">
          <span className="text-grey-900">
            If your product has outgrown quick fixes, let's talk.
          </span>
          <nav className="flex gap-2 font-mono">
            {footerData.links.map(mapper)}
          </nav>
        </div>
      </div>
      <Hr bgColor="bg-grey-200" marginTop="mt-8" />
      <span className="font-mono text-(size:--fs-3xs)">
        {footerData.footNote}
      </span>
    </FullWidthWrapper>
  );
};

export default Footer;
