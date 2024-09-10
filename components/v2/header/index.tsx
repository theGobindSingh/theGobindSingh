import {
  DesignationText,
  HeaderWrapper,
  LogoAndDesignation,
  logoLinkStyles,
  NavWrapper,
} from '@components/v2/header/styles';
import { headerAndNavData } from '@data';
import Link from 'next/link';
import { forwardRef, Ref } from 'react';

const HeaderWithoutRef = (_: unknown, ref: Ref<HTMLDivElement>) => {
  const { links, logoText, middleText, bottomLinks, bottomPrimaryLink } = headerAndNavData;

  const primaryLinksMapper = ({ text, url }: (typeof links)[0]) => (
    <li key={url}>
      <Link href={url} aria-label={text}>
        <span className="upper">{text}</span>
        <span className="lower" aria-hidden>
          {text}
        </span>
      </Link>
    </li>
  );

  return (
    <HeaderWrapper ref={ref}>
      <LogoAndDesignation>
        <Link href="/" css={logoLinkStyles}>
          {logoText}
        </Link>
        <DesignationText>{`(${middleText})`}</DesignationText>
      </LogoAndDesignation>
      <NavWrapper className="in-header">
        <ul>{links.map(primaryLinksMapper)}</ul>
      </NavWrapper>
      {(bottomPrimaryLink ?? bottomLinks) && (
        <nav className="in-header">
          {bottomPrimaryLink && <div />}
          {bottomLinks && <ul />}
        </nav>
      )}
    </HeaderWrapper>
  );
};

const Header = forwardRef(HeaderWithoutRef);
export default Header;
