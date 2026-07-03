import FullWidthWrapper from "@components/full-width-wrapper";
import Hamburger from "@components/header/hamburger";
import HeaderNavItem from "@components/header/nav-item";
import { Link } from "@components/link";
import { headerAndNavData } from "@data";
import { tw } from "@utils/tailwind";

const linksMapper = (
  props: (typeof headerAndNavData.links)[number],
  index: number,
) => {
  const key = `header-link-${index}`;
  return <HeaderNavItem key={key} {...props} />;
};

const Header = () => {
  return (
    <FullWidthWrapper
      element="header"
      className="flex items-center justify-between py-4"
      wrapperClassName={tw`
        fixed z-(--z-nav)
        -top-px
        left-0
        border 
        border-(--color-grey-100) 
        border-t-transparent 
        border-l-transparent 
        border-r-transparent
        transition-all
        overflow-hidden
        md:hover:bg-[hsla(var(--color-grey-50-base),0.625)]!
        `}
      wrapperProps={{
        id: "app-header",
      }}
    >
      <div className="custom:backdrop pointer-events-none absolute top-0 left-0 z-[-1] size-full backdrop-blur-[6px]"></div>
      <Link href="/" className="font-display text-(size:--fs-s) font-medium">
        {headerAndNavData.logoText}
      </Link>
      <nav
        className={tw`
        transition-all
        duration-500
        not-md:fixed
        not-md:top-0
        not-md:right-0
        not-md:h-screen
        not-md:w-screen not-md:translate-x-full
        not-md:bg-[hsla(var(--color-accent-200-base),0.75)]
        not-md:backdrop-blur-lg
        `}
      >
        <ul
          className={tw`
          flex gap-4
          not-md:h-full
          not-md:flex-col
          not-md:items-center
          not-md:justify-center
          `}
        >
          {headerAndNavData.links.map(linksMapper)}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <Link
          href="/resume.pdf"
          variant="outlined"
          color="accent"
          className="font-mono"
        >
          Resume
        </Link>
        <Hamburger />
      </div>
      {/* <HeaderScrollHandler /> */}
    </FullWidthWrapper>
  );
};

export default Header;
