import { ForwardedRef, forwardRef } from 'react';

const BlackSectionWithoutRef = (
  { className }: { className?: string },
  ref: ForwardedRef<HTMLDivElement>,
) => (
  <div className={className} ref={ref}>
    BlackSectionWithoutRef
  </div>
);

const BlackSection = forwardRef(BlackSectionWithoutRef);
export default BlackSection;
