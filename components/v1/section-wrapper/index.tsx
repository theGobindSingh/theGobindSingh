import CommonFullWidthWrapper from '@components/v1/common-full-width-wrapper';
import { css } from '@emotion/react';
import { mediaQuery, styled } from '@styles/global';
import { forwardRef, PropsWithChildren, Ref } from 'react';

interface StyledSectionWrapperProps {
  $fexDirection?: 'row' | 'column';
  $alignItems?: 'center' | 'flex-start' | 'flex-end';
  $justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
}

const StyledSectionWrapper = styled(
  CommonFullWidthWrapper,
)<StyledSectionWrapperProps>`
  display: flex;
  flex-direction: ${({ $fexDirection = 'column' }) => $fexDirection};
  align-items: ${({ $alignItems = 'center' }) => $alignItems};
  justify-content: ${({ $justifyContent = 'center' }) => $justifyContent};

  &.fit-spacing {
    width: fit-content !important;
    padding: 0 7.5rem;
    ${mediaQuery.nonDesktop} {
      padding: 0 2rem;
    }
  }
`;

const wrapperCss = css`
  position: sticky;
  top: 0;
  background-color: var(--color-primary-100);
  &:nth-of-type(even) {
    background-color: var(--color-primary-200);
  }
  .section-wrapper {
    height: 100dvh;
  }
  &:first-of-type .section-wrapper {
    height: 100svh;
  }
`;

interface SectionWrapperProps extends StyledSectionWrapperProps {
  className?: string;
}

const SectionWrapperWithoutRef = (
  {
    children,
    className,
    ...$styledProps
  }: PropsWithChildren<SectionWrapperProps>,
  ref: Ref<HTMLDivElement>,
) => (
  <StyledSectionWrapper
    wrapperCss={wrapperCss}
    ref={ref}
    className={`section-wrapper ${className ?? ''}`.trim()}
    {...$styledProps}
  >
    {children}
  </StyledSectionWrapper>
);

const SectionWrapper = forwardRef(SectionWrapperWithoutRef);
export default SectionWrapper;
