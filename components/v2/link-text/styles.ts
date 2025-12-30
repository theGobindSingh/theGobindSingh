import { css } from '@emotion/react';

export const linkTextWrapperStyles = css`
  font-size: inherit;
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  flex-direction: column;
  transition: all 0.3s ease;
  height: 1.5em;
  overflow: hidden;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;

  * {
    transition: inherit;
  }
  &:hover {
    & > * {
      transform: translateY(-100%);
    }
  }

  &.no-animation {
    &:hover {
      & > * {
        transform: none;
      }
    }
  }
`;
