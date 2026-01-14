import {
  HamburgerButton,
  NavWrapper,
  StyledHeaderWrapper,
} from '@components/v1/header/styles';
import SocialIcons from '@components/v1/social-icons';
import { headerAndNavData, resumeLink } from '@data';
import { breakpoints } from '@styles/global';

import { useLenis } from 'lenis/react';
import Link from 'next/link';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

const Header = () => {
  const ref = useRef<HTMLDivElement>(null);

  const lenis = useLenis((lenis) => {
    const elem = ref.current;
    if (!elem) return;
    const scrollPosition = lenis.scroll;
    if (scrollPosition < 100) {
      elem.classList.remove('hide-header');
      return;
    }
    if (scrollPosition >= lenis.limit - 5) {
      elem.classList.remove('hide-header');
      return;
    }
    if (lenis.direction === 1) {
      elem.classList.add('hide-header');
    } else {
      elem.classList.remove('hide-header');
    }
  }, []);

  const toggleBodyScroll = useCallback(
    ({ isScrollEnabled }: { isScrollEnabled: boolean }) => {
      if (isScrollEnabled) {
        document.body.style.removeProperty('overflow');
        lenis?.start();
      } else {
        document.body.style.setProperty('overflow', 'hidden');
        lenis?.stop();
      }
    },
    [lenis],
  );

  useEffect(() => {
    const handleResize = () => {
      const elem = ref.current;
      if (!elem) return;
      const input = elem.querySelector<HTMLInputElement>('#nav-toggle');
      if (!input) return;
      if (window.innerWidth >= breakpoints.desktop.min && input.checked) {
        toggleBodyScroll({ isScrollEnabled: true });
        input.checked = false;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [toggleBodyScroll]);

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const isChecked = (e.currentTarget ?? e.target).checked;
      if (isChecked) {
        toggleBodyScroll({ isScrollEnabled: false });
      } else {
        toggleBodyScroll({ isScrollEnabled: true });
      }
    },
    [toggleBodyScroll],
  );

  const links = useMemo(
    () =>
      headerAndNavData.links
        .filter((link) => !link.isHiddenInV1)
        .map(({ text, targetId, url }, index) => {
          const href = url ?? `#${targetId ?? ''}`;
          const clickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
            if (!targetId) return;
            e.preventDefault();
            toggleBodyScroll({ isScrollEnabled: true });
            lenis?.scrollTo(window.innerHeight * (index + 1));
            window.history.replaceState(null, '', `#${targetId}`);
          };
          return (
            <Link
              key={`header-nav-link-${index}`}
              href={href}
              className="nav-link with-hover-effect"
              onClick={clickHandler}
            >
              {text}
            </Link>
          );
        }),
    [lenis],
  );

  return (
    <StyledHeaderWrapper ref={ref}>
      <div className="header-container">
        <Link href="/" className="home-link">
          {headerAndNavData.logoText}
        </Link>
        <HamburgerButton htmlFor="nav-toggle" aria-label="Toggle menu">
          <input
            id="nav-toggle"
            type="checkbox"
            onChange={inputChangeHandler}
          />
          <svg viewBox="35 35 30 30" xmlns="http://www.w3.org/2000/svg">
            <path
              className="burger-line burger-line--top"
              d="M0 40h62c13 0 6 28-4 18L35 35"
            />
            <path className="burger-line burger-line--middle" d="M0 50h70" />
            <path
              className="burger-line burger-line--bottom"
              d="M0 60h62c13 0 6-28-4-18L35 65"
            />
          </svg>
        </HamburgerButton>
        <NavWrapper className="nav-wrapper">
          {links}
          <Link
            href={resumeLink}
            className="nav-link resume-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </Link>
          <SocialIcons className="social-icons" />
        </NavWrapper>
      </div>
    </StyledHeaderWrapper>
  );
};

export default Header;
