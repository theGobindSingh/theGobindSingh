import { forwardRef, Ref } from 'react';

const SideNavWithoutRef = (_: unknown, ref: Ref<HTMLDivElement>) => (
  <div className="sidenav" ref={ref} css={{ display: 'none' }}>
    <div>div</div>
  </div>
);

const SideNav = forwardRef(SideNavWithoutRef);
export default SideNav;
