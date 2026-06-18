import FullWidthWrapper from "@components/full-width-wrapper";
import { Link } from "@components/link";

const Header = () => {
  return (
    <FullWidthWrapper
      element="header"
      className="relative flex items-center justify-between py-4"
    >
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
      <Link href="/resume" variant="outlined">
        Resume
      </Link>
    </FullWidthWrapper>
  );
};

export default Header;
