import FullWidthWrapper from "@components/full-width-wrapper";
import HeaderScrollHandler from "@components/header/scroll-handler";
import { Link } from "@components/link";
import { tw } from "@utils/tailwind";

const Header = () => {
  return (
    <FullWidthWrapper
      element="header"
      className="relative flex items-center justify-between py-4"
      wrapperClassName={tw`
        sticky
        top-0
        backdrop-blur-[5px]
        border-[1px] 
        border-(--color-grey-100) 
        border-t-[transparent] 
        border-l-[transparent] 
        border-r-[transparent]
        transition-all
        `}
      wrapperProps={{
        id: "app-header",
      }}
    >
      <HeaderScrollHandler />
      <Link href="/" className="text-2xl font-bold">
        Gobind Singh
      </Link>
      <nav>
        <ul className="flex gap-4">
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
      <Link href="/resume" variant="outlined" color="accent">
        Resume
      </Link>
    </FullWidthWrapper>
  );
};

export default Header;
