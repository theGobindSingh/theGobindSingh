import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { breakpoints } from '@styles/global';

export const HeaderWrapper = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  @media (max-width: ${breakpoints.tablet.max}px) {
    align-items: flex-start;
  }
`;

export const logoLinkStyles = css`
  font-size: var(--fs-m);
  font-weight: 700;
  text-decoration: none;
  color: var(--color-text-900);
  margin-right: 4rem;
  letter-spacing: -1px;
`;

export const DesignationText = styled.span`
  font-family: var(--font-mono);
  font-size: var(--fs-3xs);
  font-weight: 500;
  color: var(--color-text-700);
  text-transform: uppercase;
`;

export const NavWrapper = styled.nav`
  ul {
    display: flex;
    list-style: none;
    @media (max-width: ${breakpoints.tablet.max}px) {
      flex-direction: column;
      margin: 0;
    }
    li {
      height: 1.25em;
      overflow: hidden;
      a {
        font-size: inherit;
        color: inherit;
        text-decoration: none;
        display: inline-flex;
        flex-direction: column;
        transition: all 0.3s ease;
      }
      &:hover {
        a {
          transform: translateY(-50%);
        }
      }
    }
  }
  &.in-header {
    ul {
      gap: 0.5em;
      li {
        font-size: var(--fs-s);
        font-weight: 500;
        color: var(--color-text-600);
        &::after {
          content: ',';
        }
        &:last-of-type {
          &::after {
            content: none;
          }
        }
      }
      @media (max-width: ${breakpoints.tablet.max}px) {
        gap: 0.25em;
        li {
          font-size: var(--fs-xs);
        }
      }
    }
  }
  &.in-sidenav {
    ul {
      flex-direction: column;
    }
  }
`;

export const LogoAndDesignation = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: auto;
  @media (max-width: ${breakpoints.tablet.max}px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
