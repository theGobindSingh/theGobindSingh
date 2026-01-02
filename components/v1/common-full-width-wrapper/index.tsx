import {
  containerSize,
  wrapperStyles,
} from '@components/v1/common-full-width-wrapper/styles';
import {
  FullWidthWrapper,
  FullWidthWrapperProps,
} from '@kami-ui/react-components';
import { forwardRef, Ref } from 'react';

const CommonFullWidthWrapperWithoutRef = (
  { children, ...props }: FullWidthWrapperProps,
  ref: Ref<HTMLElement>,
) => (
  <FullWidthWrapper
    containerSize={containerSize}
    css={wrapperStyles}
    ref={ref}
    {...props}
  >
    {children}
  </FullWidthWrapper>
);
const CommonFullWidthWrapper = forwardRef(CommonFullWidthWrapperWithoutRef);
export default CommonFullWidthWrapper;
