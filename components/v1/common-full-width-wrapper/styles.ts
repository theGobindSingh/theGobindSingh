import { css } from '@emotion/react';
import { mediaQuery } from '@styles/global';

export const containerSize = '75%';
export const mobileContainerSize = '90%';

export const wrapperStyles = css`
  width: ${mobileContainerSize};
  ${mediaQuery.desktop} {
    width: ${containerSize};
  }
`;
