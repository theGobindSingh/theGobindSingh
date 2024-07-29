import { css } from '@emotion/react';

const globalStyles = css`
  :root {
    --some-variable: #000;
  }
  body {
    color: black;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
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
`;

export default globalStyles;
