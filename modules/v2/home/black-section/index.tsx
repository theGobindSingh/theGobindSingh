import { forwardRef } from 'react';

const BlackSectionWithoutRef = () => <div>BlackSectionWithoutRef</div>;

const BlackSection = forwardRef(BlackSectionWithoutRef);
export default BlackSection;
