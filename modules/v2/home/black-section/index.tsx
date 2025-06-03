import { forwardRef } from 'react';

const BlackSectionWithoutRef = () => {
  // dsgj
  return <div>BlackSectionWithoutRef</div>;
};

const BlackSection = forwardRef(BlackSectionWithoutRef);
export default BlackSection;
