import styled from '@emotion/styled';
import { SVGProps } from 'react';

const Svg = styled.svg`
  stroke: currentColor;
  fill: none;
  stroke-width: 1.25px;
  stroke-linecap: round;
  stroke-linejoin: round;
  color: currentColor;
  height: 1em;
  width: 1em;
`;

const HeroArrow = (props: SVGProps<SVGSVGElement>) => (
  <Svg
    stroke="currentColor"
    viewBox="6 6 12 12"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="7" y1="7" x2="17" y2="17" />
    <polyline points="17 7 17 17 7 17" />
  </Svg>
);

export default HeroArrow;
