import { css } from '@emotion/react';

const globalStyles = css`
  body {
    color: var(--color-black);
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    &.v2 {
      &::before {
        content: '';
        filter: url(#grainy) opacity(20%);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export default globalStyles;
