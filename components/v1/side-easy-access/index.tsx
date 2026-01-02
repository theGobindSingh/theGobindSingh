import SocialIcons from '@components/v1/social-icons';
import { email, SOCIAL_KEYS, socialLinks } from '@data';
import { mediaQuery, styled } from '@styles/global';
import { Fragment } from 'react';

const SideEasyAccessWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 9;
  color: var(--color-text-700);

  --_side-offset: 2.5rem;

  &.left {
    left: var(--_side-offset);
    font-size: var(--fs-s);
    a {
      &:hover {
        transform: scale(1.25);
      }
    }
  }
  &.right {
    right: var(--_side-offset);
    a {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      text-decoration: none;
      color: inherit;
      letter-spacing: 0.125em;
      font-family: var(--font-mono);
      font-size: var(--fs-3xs);
      &:hover {
        transform: scale(1.05) translateY(-0.5em);
      }
    }
  }

  a {
    transition: all 0.3s ease;
    &:hover {
      color: var(--color-text-900);
    }
  }

  &::after {
    content: '';
    width: 2px;
    height: 5rem;
    background-color: currentColor;
  }

  ${mediaQuery.nonDesktop} {
    display: none;
    pointer-events: none;
  }
`;

const SideEasyAccess = () => (
  <Fragment>
    <SideEasyAccessWrapper className="left">
      <SocialIcons $dir="col" />
    </SideEasyAccessWrapper>
    <SideEasyAccessWrapper className="right">
      <a href={socialLinks[SOCIAL_KEYS.EMAIL]?.url}>{email}</a>
    </SideEasyAccessWrapper>
  </Fragment>
);

export default SideEasyAccess;
