import { headerAndNavData } from '@data';
import Link from 'next/link';
import { forwardRef, Ref } from 'react';

const HeaderWithoutRef = (_: unknown, ref: Ref<HTMLDivElement>) => {
  const { links, logoText, middleText, bottomLinks, bottomPrimaryLink } = headerAndNavData;
  const primaryLinksMapper = ({ text, url }: (typeof links)[0]) => (
    <li key={url}>
      <Link href={url}>{text}</Link>
    </li>
  );
  return (
    <header ref={ref}>
      <Link href="/">{logoText}</Link>
      <span>{middleText}</span>
      <nav>
        <ul>{links.map(primaryLinksMapper)}</ul>
      </nav>
      {(bottomPrimaryLink ?? bottomLinks) && (
        <nav>
          {bottomPrimaryLink && <div />}
          {bottomLinks && <ul />}
        </nav>
      )}
    </header>
  );
};

const Header = forwardRef(HeaderWithoutRef);
export default Header;
