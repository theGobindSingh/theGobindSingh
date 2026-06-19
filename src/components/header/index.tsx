import FullWidthWrapper from "@components/full-width-wrapper";
import Hamburger from "@components/header/hamburger";
import HeaderScrollHandler from "@components/header/scroll-handler";
import { Link } from "@components/link";
import { tw } from "@utils/tailwind";

const Header = () => {
  return (
    <FullWidthWrapper
      element="header"
      className="flex items-center justify-between py-4"
      wrapperClassName={tw`
        fixed
        top-0
        left-0
        border 
        border-(--color-grey-100) 
        border-t-transparent 
        border-l-transparent 
        border-r-transparent
        transition-all
        overflow-hidden
        `}
      wrapperProps={{
        id: "app-header",
      }}
    >
      <div className="custom:backdrop pointer-events-none absolute top-0 left-0 z-[-1] size-full backdrop-blur-[7px]"></div>
      <HeaderScrollHandler />
      <Link href="/" className="text-2xl font-bold">
        Gobind Singh
      </Link>
      <nav
        className={tw`
        font-mono
        transition-all
        duration-500
        not-md:fixed
        not-md:top-0
        not-md:right-0
        not-md:h-screen not-md:w-screen
        not-md:translate-x-full
        not-md:bg-[hsla(var(--color-accent-300-base),0.75)]
        not-md:backdrop-blur-[15px]
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
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/resume" variant="outlined" color="accent">
          Resume
        </Link>
        <Hamburger />
      </div>
    </FullWidthWrapper>
  );
};

export default Header;
