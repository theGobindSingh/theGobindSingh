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
