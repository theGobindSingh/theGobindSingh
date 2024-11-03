import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaQuery } from '@styles/global';

export const headerContainerStyles = css`
  display: flex;
  position: relative;
  align-items: center;
  height: var(--header-height);
  padding: 0.75rem 0;
  ${mediaQuery.nonDesktop} {
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
  margin: auto 0;
  .list-container {
    display: flex;
    list-style: none;
    align-items: flex-end;
    gap: 0.5em;
    .list-elem {
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
    ${mediaQuery.nonDesktop} {
      flex-direction: column;
      margin: 0;
      .list-elem {
        font-size: var(--fs-2xs);
      }
    }
  }
`;

export const LogoAndDesignation = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: auto;
  ${mediaQuery.nonDesktop} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
