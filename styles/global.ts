import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export { styled };

export const breakpoints = Object.freeze({
  phone: {
    min: 0,
    max: 640,
  },
  tablet: {
    min: 641,
    max: 900,
  },
  smallDesktop: {
    min: 901,
    max: 1024,
  },
  desktop: {
    min: 901,
    max: 9999,
  },
} as const);

export const mediaQuery = Object.freeze({
  phone: `@media (min-width: ${breakpoints.phone.min}px) and (max-width: ${breakpoints.phone.max}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet.min}px) and (max-width: ${breakpoints.tablet.max}px)`,
  smallDesktop: `@media (min-width: ${breakpoints.smallDesktop.min}px) and (max-width: ${breakpoints.smallDesktop.max}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop.min}px)`,
  nonDesktop: `@media (max-width: ${breakpoints.tablet.max}px)`,
} as const);

const underlineAnimation = keyframes`
0% {
    left: 0;
    width: 0;
    background-color: var(--anchorAni-one, #5a5a5a);
}
50% {
    left: 12.5%;
    width: 75%;
    background-color: var(--anchorAni-two, #aaa);
}
75% {
    left: 100%;
    width: 0;
    background-color: var(--anchorAni-one, #5a5a5a);
}
100% {
    left: 0;
    width: 0;
}
`;

const globalStyles = css`
  body {
    color: var(--color-text-900);
    font-size: var(--fs-2xs);
    font-family: var(--font-sans);
    padding: 0;
    margin: 0;
    ${mediaQuery.smallDesktop} {
      font-size: var(--fs-3xs);
    }
    &.v1 {
      --header-height: 5rem;
      counter-reset: pageNumberCounter;
      background-color: var(--color-primary-100);

      .underline-animation {
        position: relative;
        display: inline-block;
        &::after {
          content: '';
          position: absolute;
          width: 0;
          bottom: 0;
          height: 1px;
          animation: ${underlineAnimation} 2s ease 0s infinite normal forwards;
        }
      }
    }
    &.v2 {
      --header-height: 6rem;
      background-color: var(--color-primary-100);

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
