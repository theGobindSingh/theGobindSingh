import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaQuery } from '@styles/global';

export const GrainySvg = styled.svg`
  display: none;
`;

export const homeWrapperStyles = css`
  z-index: 1;
  position: relative;
  padding-top: 1rem;
  ${mediaQuery.desktop} {
    width: 95%;
  }
`;
