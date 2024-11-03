import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaQuery } from '@styles/global';

export const homeHeroWrapperStyles = css`
  position: fixed;
  transform-origin: bottom;
`;

export const homeHeroContainerStyles = css`
  width: 100%;
  height: calc(100dvh - var(--header-height));
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  padding: 60% 1rem 1rem 1rem;
  transform-origin: center bottom;
  top: 0;
  ${mediaQuery.desktop} {
    /* padding: 3.75% 0; */
    padding: 0;
    padding-bottom: 3rem;
    /* grid-template-columns: 2fr 1.5fr 2fr; */
    grid-template-columns: 1fr 22.5rem 1fr;
    /* grid-template-columns: 1fr max(20vw, 22.5rem) 1fr; */
    grid-template-rows: 35% 7.5% 35% 22.5%;
  }
`;

export const homeHeroImgStyles = css`
  height: 100%;
  width: 100%;
  object-fit: cover;
  grid-column: 2 / 3;
  grid-row: 2 / -1;
  border-radius: 0.5rem;
  filter: grayscale(100%);
`;

export const HomeHeroTitle = styled.h1`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  font-size: clamp(6.875rem, 12.25vw, 14.575rem);
  font-weight: 700;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-transform: uppercase;
  margin: 0;
  margin-left: -0.04em;
  /* 
   * custom media queries because display text
   */
  @media (min-width: 1180px) {
  }
  @media (max-width: 1180px) {
    font-size: clamp(6.875rem, 12.2vw, 9rem);
  }
`;

export const HomeHeroTextWrapper = styled.div`
  margin: 0;
  grid-row: 3 / 4;
  font-size: 1.5rem;
  width: 95%;
  max-width: 25ch;
  color: var(--color-text-600);
  font-weight: 500;
  & > .text {
    margin: 0;
    margin-bottom: 2rem;
  }
  .button {
  }
`;

export const homeHeroArrowStyles = css`
  font-size: 1.5rem;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  color: var(--color-text-500);
`;

export const HomeHeroDateTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  text-align: right;
  grid-column: 3 / 4;
  grid-row: 4 / 5;
  height: 100%;
  width: 100%;
  .text {
    font-family: var(--font-mono);
    font-size: var(--fs-2xs);
    text-transform: uppercase;
    max-width: min(calc(100% - 1rem), 22ch);
    font-weight: 500;
    color: var(--color-text-600);
  }
  .date {
    font-size: var(--fs-4xl);
    font-weight: 600;
  }
`;
