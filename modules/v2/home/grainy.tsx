import { SVGProps } from 'react';
import { GrainySvg } from '@modules/v2/home/styles';

const Grainy = (props: SVGProps<SVGSVGElement>) => (
  <GrainySvg {...props}>
    <filter id="grainy">
      <feTurbulence type="turbulence" baseFrequency="0.5" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </GrainySvg>
);

export default Grainy;
