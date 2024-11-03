import CommonFullWidthWrapper from '@components/v2/common-full-width-wrapper';
import {
  DesignationText,
  headerContainerStyles,
  LogoAndDesignation,
  logoLinkStyles,
  NavWrapper,
} from '@components/v2/header/styles';
import LinkText from '@components/v2/link-text';
import { headerAndNavData } from '@data';
import Link from 'next/link';
import { forwardRef, Ref } from 'react';

const HeaderWithoutRef = (_: unknown, ref: Ref<HTMLDivElement>) => {
  const { links, logoText, middleText } = headerAndNavData;

  const primaryLinksMapper = ({ text, targetClassName }: (typeof links)[0]) => {
    const clickHandler = () => {
      const target = document.querySelector(`.${targetClassName}`);
      target?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
      <li key={`nav-link-${targetClassName}`} className="list-elem">
        <LinkText text={text} onClick={clickHandler} />
      </li>
    );
  };

  return (
    <CommonFullWidthWrapper
      element="header"
      css={headerContainerStyles}
      ref={ref}
    >
      <LogoAndDesignation>
        <Link href="/" css={logoLinkStyles}>
          {logoText}
        </Link>
        <DesignationText>{`( ${middleText} )`}</DesignationText>
      </LogoAndDesignation>
      <NavWrapper>
        <ul className="list-container">{links.map(primaryLinksMapper)}</ul>
      </NavWrapper>
    </CommonFullWidthWrapper>
  );
};

const Header = forwardRef(HeaderWithoutRef);
export default Header;
