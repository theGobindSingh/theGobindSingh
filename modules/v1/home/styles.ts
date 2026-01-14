import { css } from '@emotion/react';
import { mediaQuery, styled } from '@styles/global';

export const HomeHeroH1 = styled.h1`
  display: flex;
  flex-direction: column;
  font-size: var(--fs-4xl);
  font-weight: 700;
  margin-bottom: 1.5rem;
  .title {
    &.suffix {
      color: var(--color-text-700);
      font-weight: 500;
      font-size: 0.225em;
      font-family: var(--font-mono);
      margin-bottom: 1em;
    }
    &.main {
      margin-bottom: 0.25em;
    }
    &.postfix {
      color: var(--color-text-700);
      font-weight: 500;
      font-size: 0.8em;
      font-family: var(--font-mono);
      letter-spacing: -0.09em;
    }
  }
  ${mediaQuery.nonDesktop} {
    font-size: var(--fs-3xl);
    .title {
      &.suffix {
        font-size: 0.3em;
      }
      &.postfix {
        letter-spacing: 0em;
      }
    }
  }
`;

export const HomeHeroP = styled.p`
  font-size: var(--fs-s);
  line-height: 2;
  margin-top: 0;
  margin-bottom: 2rem;
  width: 100%;
  color: var(--color-text-800);
  a {
    color: inherit;
    text-decoration: none;
  }
  ${mediaQuery.nonDesktop} {
    font-size: var(--fs-1xs);
  }
`;

interface CommonH2Props {
  $width?: string;
  $mobileWidth?: string;
  $margin?: string;
  $mobileMargin?: string;
  $mobileFontSize?: string;
}

export const CommonH2 = styled.h2<CommonH2Props>`
  counter-increment: pageNumberCounter;
  display: inline-flex;
  gap: 0.5em;
  color: var(--color-text-900);
  font-size: var(--fs-1xl);
  flex-shrink: 0;
  width: ${({ $width = '100%' }) => $width};
  font-family: var(--font-mono);
  margin: ${({ $margin = '0 0 0 0' }) => $margin};
  &::before {
    content: '0' counter(pageNumberCounter) '. ';
    font-family: var(--font-mono);
    color: var(--color-text-700);
    flex-shrink: 0;
  }
  &::after {
    content: '';
    display: block;
    width: 37.5%;
    height: 0.5px;
    background-color: var(--color-text-600);
    margin: auto 0 auto auto;
  }
  ${mediaQuery.smallDesktop} {
    font-size: var(--fs-l);
  }
  ${mediaQuery.nonDesktop} {
    width: ${({ $mobileWidth = '100%' }) => $mobileWidth};
    margin: ${({ $mobileMargin = '1rem 0 0 0' }) => $mobileMargin};
    font-size: ${({ $mobileFontSize = 'var(--fs-s)' }) => $mobileFontSize};
  }
`;

export const HomeAboutLeftWrapper = styled.div`
  margin-top: 1rem;
  max-width: min(50vw, 750px);
  display: flex;
  flex-direction: column;
  gap: 3vh;
  .skills-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .list-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      padding: 0;
      li {
        list-style: none;
        padding: 0;
        margin: 0;
        &::before {
          content: '▹';
          margin-right: 0.5em;
        }
      }
    }
  }
  ${mediaQuery.nonDesktop} {
    max-width: fit-content;
    margin-top: 0;
    font-size: var(--fs-4xs);
  }
`;

export const HomeAboutP = styled.div`
  transition: all 0.3s ease;
  line-height: 1.5;
  /* font-size: var(--fs-2xs); */
  a {
    text-decoration: none;
    color: var(--color-text-900);
  }
  ${mediaQuery.desktop} {
    .img-wrapper {
      display: none;
    }
  }
  ${mediaQuery.smallDesktop} {
    line-height: 1.675;
  }
  ${mediaQuery.nonDesktop} {
    font-size: var(--fs-2xs);
    line-height: 1.75;
    display: flex;
    width: 100%;
    overflow-x: auto;
    gap: 0.75rem;
    scroll-snap-type: x mandatory;
    & > * {
      scroll-snap-align: start;
      width: 85% !important;
      flex-shrink: 0;
    }
  }
`;

export const HomeAboutRightWrapper = styled.div`
  ${mediaQuery.nonDesktop} {
    display: none;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  /* --_size: min(300px, 22.5vw); */
  --_size: clamp(150px, 22.5vw, 300px);
  height: var(--_size);
  width: var(--_size);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  .img-container {
    transition: inherit;
    border: 2px solid var(--color-text-300);
    border-radius: inherit;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    filter: grayscale(100%) contrast(1) brightness(90%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &::after {
    transition: inherit;
    content: '';
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    border: 2px solid var(--color-text-800);
    transform: translate(2.5%, 2.5%);
    z-index: -1;
  }
  &:hover {
    .img-container {
      filter: none;
      border-color: var(--color-text-800);
    }
    &::after {
      border-color: var(--color-text-300);
      transform: translate(0%, 0%);
      opacity: 0;
    }
  }
  img {
    object-fit: cover;
    scale: 1.75;
    transform: translateY(-10%);
  }
  ${mediaQuery.nonDesktop} {
    margin: auto 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .img-container {
      margin: auto 0;
      height: 80%;
      width: auto;
      max-width: 90%;
      aspect-ratio: 4 / 3;
      filter: none;
      border-color: var(--color-text-800);
    }
    &::after {
      content: none;
    }
  }
`;

export const ExperienceWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  gap: 1rem;
  width: 100%;
  max-width: 75rem;
  ${mediaQuery.nonDesktop} {
    flex-direction: column;
  }
`;

export const ExperienceTabBtnsWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);

  --_item-height: 2.5rem;
  --_top-offset: 0;

  &::before {
    content: '';
    display: block;
    height: var(--_item-height);
    width: 2px;
    background-color: var(--color-text-700);
    position: absolute;
    left: 0;
    top: var(--_top-offset);
    transition: all 0.3s ease;
  }
  & > * {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0rem 1rem;
    height: var(--_item-height);
    background-color: transparent;
    cursor: pointer;
    border: none;
    font-size: inherit;
    font-family: inherit;

    color: var(--color-text-700);
    transition: all 0.3s ease;

    &.active {
      color: var(--color-text-900);
      /* background-color: var(--color-primary-200); */
    }
  }

  ${mediaQuery.smallDesktop} {
    font-size: var(--fs-3xs);
  }

  ${mediaQuery.nonDesktop} {
    flex-direction: row;
    overflow-x: auto;
    gap: 0.5rem;
    width: 100%;
    overflow-y: hidden;
    & > * {
      flex-shrink: 0;
      &.active {
        border-bottom: 2px solid var(--color-text-700);
      }
    }
    &::before {
      content: none;
    }
  }
`;

export const homeExperienceTabContentWrapperStyles = css`
  ${mediaQuery.nonDesktop} {
    padding-top: 4.5rem !important;
  }
`;

export const ExperienceTabContentWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  gap: 1.5rem;
  display: none;
  &.active {
    display: flex;
  }

  .heading-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .date-range,
    .other-positions {
      font-size: var(--fs-3xs);
      color: var(--color-text-800);
      font-weight: 500;
      font-family: var(--font-mono);
    }
  }
  .h3 {
    margin: 0;
    font-size: var(--fs-m);
    color: var(--color-text-900);
    * {
      font-weight: inherit;
      color: inherit;
      text-decoration: inherit;
    }
  }
  ul {
    line-height: 1.75;
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin-bottom: 0.75rem;
      display: flex;
      &:last-child {
        margin-bottom: 0;
      }
      &::before {
        content: '▹';
        margin-right: 0.5em;
      }
    }
  }
  ${mediaQuery.smallDesktop} {
    .heading-container {
      .date-range,
      .other-positions {
        font-size: var(--fs-4xs);
      }
    }
    .h3 {
      font-size: var(--fs-s);
    }
  }
  ${mediaQuery.nonDesktop} {
    ul {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: auto auto auto;
      grid-auto-columns: 85%;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      width: 100%;
      height: fit-content;
      width: 100%;
      li {
        scroll-snap-align: start;
        flex-shrink: 0;
        padding-left: 1rem;
        &:nth-of-type(0n + 1),
        &:nth-of-type(0n + 2),
        &:nth-of-type(0n + 3) {
          padding-left: 0;
        }
      }
    }
    @media (max-height: 800px) {
      ul {
        grid-template-rows: auto auto;
        li {
          &:nth-of-type(0n + 3) {
            padding-left: 1rem;
          }
        }
      }
    }
    @media (max-height: 700px) {
      ul {
        grid-template-rows: auto;
        li {
          &:nth-of-type(0n + 2),
          &:nth-of-type(0n + 3) {
            padding-left: 1rem;
          }
        }
      }
    }
  }
`;

export const HomeExtracurricularH2 = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-2xl);
  font-family: var(--font-mono);
  font-size: var(--fs-1xl);
  position: absolute;
  gap: 0.5rem;
  top: 10%;
  z-index: 2;
  counter-increment: pageNumberCounter;
  * {
    text-align: center;
  }
  .upper {
    font-size: var(--fs-s);
    color: var(--color-text-700);
    font-weight: 500;
    &::before {
      content: '0' counter(pageNumberCounter) '. ';
      flex-shrink: 0;
    }
  }
  ${mediaQuery.nonDesktop} {
    top: 15%;
  }
`;

export const ExtracurricularCarouselWrapper = styled.div`
  width: 100%;
  height: 100%;
  /* max-width: 48rem; */
  margin: auto;
  overflow: hidden;
  --slide-spacing: 0rem;
  --slide-size: calc(100% / 3);

  &::before {
    height: calc(50% - (300px / 2) + 1rem);
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    /* opacity: 0.25; */
    background: linear-gradient(
      var(--color-primary-100),
      var(--color-primary-200)
    );
    /* border-radius: 25% 25% 50% 50% / 0px 0px 100% 100%; */
    border-radius: 0 0 50% 50%;
  }

  &::after {
    /* opacity: 0.25; */
    height: calc(50% - (300px / 2) + 1rem);
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 1;
    background: linear-gradient(
      var(--color-primary-200),
      var(--color-primary-100)
    );
    /* border-radius: 50% 50% 25% 25% / 100% 100% 0px 0px; */
    border-radius: 50% 50% 0 0;
  }

  .embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-spacing) * -1);
    height: 100%;
    cursor: grab;
  }
  .embla__slide {
    transform: translate3d(0, 0, 0);
    flex: 0 0 var(--slide-size);
    min-width: 0;
    padding-left: var(--slide-spacing);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    /* --_angle: 1.05deg;
    --_scale: 0.765; */

    /* ===== Core inputs ===== */
    --angle: 1.05deg; /* θ */
    --panel-width: 300px; /* W */
    --perspective: 1vw; /* P */
    --readability: 1.15; /* intentional human fudge */

    /* ===== Trigonometry ===== */
    --cos: cos(var(--angle));
    --sin: sin(var(--angle));

    /* ===== Depth from rotation ===== */
    --z-depth: calc(var(--panel-width) * var(--sin));

    /* ===== Perspective projection ===== */
    --persp-scale: calc(
      var(--perspective) / (var(--perspective) + var(--z-depth))
    );

    /* ===== Final horizontal scale ===== */
    --scale-x: calc(var(--cos) * var(--persp-scale) * var(--readability));

    /* ===== Z compensation (push slightly back) ===== */
    --z-comp: calc(var(--z-depth) * -0.5);

    perspective: var(--perspective);

    & > * {
      /* transform-style: preserve-3d;
      backface-visibility: hidden; */
      transform-style: preserve-3d;
      backface-visibility: hidden;
      transform-origin: center center;

      transform: perspective(var(--perspective)) rotateY(var(--dyn-angle, 0deg))
        scaleX(var(--dyn-scale, 1));
    }
  }

  ${mediaQuery.nonDesktop} {
    --slide-size: 75%;

    &::before,
    &::after {
      height: calc(50% - (200px / 2) + 1rem);
    }

    .embla__slide {
      --panel-width: 200px;
      --perspective: 2vw;
      --readability: 1.2;

      & > * {
        transform: perspective(var(--perspective))
          rotateY(var(--dyn-angle, 0deg)) scaleX(var(--dyn-scale, 1));
      }
    }
  }
`;

export const ExtracurricularCarouselSlide = styled.a`
  width: 100%;
  box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
  font-size: 4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 53.75%;
  user-select: none;
  position: relative;
  overflow: hidden;
  cursor: inherit;
  & > * {
    height: 300px;
    width: calc(100% - 0.5rem);
    object-fit: cover;
  }

  ${mediaQuery.nonDesktop} {
    height: 45%;
    & > * {
      height: 200px;
      width: calc(100% - 0.25rem);
    }
  }
`;

export const ExtracurricularCarouselNavButton = styled.div`
  position: absolute;
  bottom: 15%;
  display: flex;
  gap: 5rem;
  justify-content: center;
  align-items: center;
  button {
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    color: inherit;
    border: none;
  }
  ${mediaQuery.nonDesktop} {
    bottom: 20%;
  }
`;

export const HomeContactH2 = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: var(--fs-3xl);
  font-family: var(--font-mono);
  margin: 0;
  .upper {
    font-size: var(--fs-s);
    color: var(--color-text-700);
    font-weight: 500;
    counter-increment: pageNumberCounter;
    &::before {
      content: '0' counter(pageNumberCounter) '. ';
      flex-shrink: 0;
    }
  }
`;

export const HomeContactPara = styled.p`
  font-size: var(--fs-2xs);
  color: var(--color-text-800);
  max-width: 550px;
  line-height: 1.75;
  text-align: justify;
  text-align-last: center;
  margin: 1.5rem 0 2.5rem 0;
`;

export const HomeContactCta = styled.a`
  padding: 0.5em 1em;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 2px solid var(--color-text-700);
  color: var(--color-text-800);
  font-size: var(--fs-3xs);
  font-family: var(--font-mono);
  padding: 0.75em 1.25em;
  font-weight: 500;
  &:hover {
    border-color: var(--color-text-200);
    background-color: var(--color-text-800);
    color: var(--color-text-200);
  }
`;

export const HomeContactFooterWrapper = styled.footer`
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-text-800);
  font-size: var(--fs-3xs);
  font-family: var(--font-mono);

  a {
    color: inherit;
    font-weight: 500;
    text-decoration: none;
  }

  .attribution {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    letter-spacing: 0.1em;
  }

  .repo-stats {
    display: flex;
    gap: 3rem;
    & > * {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
  }
`;
