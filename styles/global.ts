import { css } from '@emotion/react';
import styled from '@emotion/styled';

export { styled };

export const breakpoints = {
  phone: {
    min: 0,
    max: 640,
  },
  tablet: {
    min: 641,
    max: 900,
  },
  desktop: {
    min: 901,
    max: 9999,
  },
};

export const mediaQuery = {
  phone: `@media (min-width: ${breakpoints.phone.min}px) and (max-width: ${breakpoints.phone.max}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet.min}px) and (max-width: ${breakpoints.tablet.max}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop.min}px)`,
  nonDesktop: `@media (max-width: ${breakpoints.tablet.max}px)`,
};

const globalStyles = css`
  body {
    color: var(--color-text-900);
    font-size: var(--fs-2xs);
    font-family: var(--font-sans);
    padding: 0;
    margin: 0;
    &.v1 {
      --header-height: 5rem;

      background-color: var(--color-primary-100);
    }
    &.v2 {
      --header-height: 6rem;
      background-color: var(--color-primary-100);
      counter-reset: pageNumberCounter;
      &::before {
        content: '';
        filter: url(#grainy) opacity(20%);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      }

      ${mediaQuery.nonDesktop} {
        --header-height: 5rem;
      }
    }
  }
  * {
    box-sizing: border-box;
  }
`;

export default globalStyles;
