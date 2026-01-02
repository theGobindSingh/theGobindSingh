import { mediaQuery, styled } from '@styles/global';

export const StyledHeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 99;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.3);
  padding: 0.5rem 0rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;

  ${mediaQuery.nonDesktop} {
    &:has(#nav-toggle:checked) {
      height: 100vh;
      box-shadow: none;
      .home-link {
        pointer-events: none;
        opacity: 0;
      }
    }
  }

  a {
    text-decoration: none;
  }

  &.hide-header {
    transform: translateY(-100%);
    box-shadow: 0 0px 00px rgba(0, 0, 0, 0.3);
  }

  .header-container {
    display: flex;
    align-items: center;
    width: 90%;
    max-width: var(--max-content-width, 1800px);

    .home-link {
      transition: all 0.3s ease;
      font-family: var(--font-cursive);
      font-size: var(--fs-1xl);
      margin-right: auto;
      color: var(--color-text-800);
      &:hover {
        color: var(--color-text-900);
      }
    }
  }
`;

export const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  font-family: var(--font-mono);

  .resume-link {
    border: 1px solid var(--color-text-700);
    padding: 0.5em 1em;
    border-radius: 4px;
    transition: all 0.3s ease;
    &::before {
      display: none;
      content: none;
    }
    &:hover {
      border-color: var(--color-text-800);
      background-color: var(--color-text-800);
      color: var(--color-text-200);
    }
  }

  ${mediaQuery.desktop} {
    gap: 2rem;
    counter-reset: navItemCounter;
    font-size: var(--fs-4xs);
    color: var(--color-text-700);
    a {
      color: var(--color-text-700);
      transition: all 0.3s ease;
      &::before {
        counter-increment: navItemCounter;
        content: '0' counter(navItemCounter) '.';
        transition: all 0.3s ease;
        margin-right: 0.5em;
        transform: scale(1) translateY(0px);
        display: inline-block;
      }
      &.with-hover-effect:hover {
        color: var(--color-text-900);
        transform: scale(1.125) translateY(-1px);
        &::before {
          color: var(--color-text-700);
          transform: scale(0.875) translateY(1px);
        }
      }
    }
    .social-icons {
      display: none;
    }
  }

  ${mediaQuery.nonDesktop} {
    background-color: #000;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70vw;
    max-width: 300px;
    flex-direction: column;
    justify-content: center;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    gap: 2rem;
    a {
      color: var(--color-text-900);
    }
    .social-icons {
      font-size: 1.5rem;
    }
  }
`;

export const HamburgerButton = styled.label`
  /* ============ CUSTOMIZATION ============ */
  --burger-size: 1.5rem;
  --burger-line-color: #ffffff;
  --line-thickness: 2.5;
  --animation-duration: 0.5s;
  --animation-easing: cubic-bezier(0.645, 0.045, 0.355, 1);

  /* ============ PATH CONSTANTS (don't change) ============ */
  --path-length-curved: 126.64;
  --path-length-straight: 70;
  --line-visible-length: 24;
  --line-start-offset: -38;
  --x-line-length: 22.63;
  --x-line-offset: -94.11;
  --middle-hidden-offset: -50;

  /* ============ BUTTON RESET & STYLES ============ */
  all: unset;
  box-sizing: border-box;
  position: relative;
  width: var(--burger-size);
  height: var(--burger-size);
  cursor: pointer;
  display: block;
  z-index: 99;

  input {
    /* ============ HIDDEN CHECKBOX ============ */
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    /* ============ CHECKED STATE (X shape) ============ */
    &:checked {
      & ~ svg .burger-line--top,
      & ~ svg .burger-line--bottom {
        stroke-dasharray: var(--x-line-length) var(--path-length-curved);
        stroke-dashoffset: var(--x-line-offset);
      }
      & ~ svg .burger-line--middle {
        stroke-dasharray: 0 var(--path-length-straight);
        stroke-dashoffset: var(--middle-hidden-offset);
      }
    }
  }
  ${mediaQuery.nonDesktop} {
    &:has(input:checked) ~ .nav-wrapper {
      transform: translateX(0);
    }
  }

  /* ============ SVG - fills container ============ */
  svg {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
  }

  /* ============ LINE STYLES ============ */
  .burger-line {
    fill: none;
    stroke: var(--burger-line-color);
    stroke-width: var(--line-thickness);
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: all var(--animation-duration) var(--animation-easing);
  }

  .burger-line--top,
  .burger-line--bottom {
    stroke-dasharray: var(--line-visible-length) var(--path-length-curved);
    stroke-dashoffset: var(--line-start-offset);
  }

  .burger-line--middle {
    stroke-dasharray: var(--line-visible-length) var(--path-length-straight);
    stroke-dashoffset: var(--line-start-offset);
  }

  ${mediaQuery.desktop} {
    display: none;
  }
`;
