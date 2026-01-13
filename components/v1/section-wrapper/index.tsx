import CommonFullWidthWrapper from '@components/v1/common-full-width-wrapper';
import { css } from '@emotion/react';
import { mediaQuery, styled } from '@styles/global';
import { forwardRef, HTMLAttributes, PropsWithChildren, Ref } from 'react';

interface StyledSectionWrapperProps {
  $flexDirection?: 'row' | 'column';
  $alignItems?: 'center' | 'flex-start' | 'flex-end';
  $justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  $mobileFlexDirection?: 'row' | 'column';
  $gap?: string;
  $width?: string;
  $mobileWidth?: string;
}

const StyledSectionWrapper = styled(
  CommonFullWidthWrapper,
)<StyledSectionWrapperProps>`
  display: flex;
  flex-direction: ${({ $flexDirection = 'column' }) => $flexDirection};
  align-items: ${({ $alignItems = 'center' }) => $alignItems};
  justify-content: ${({ $justifyContent = 'center' }) => $justifyContent};
  gap: ${({ $gap = 'unset' }) => $gap};

  &.fit-spacing {
    width: ${({ $width = 'fit-content' }) => $width} !important;
    padding: 0 7.5rem;
    ${mediaQuery.nonDesktop} {
      width: ${({ $mobileWidth = 'fit-content' }) => $mobileWidth} !important;
      padding: 0 2rem;
    }
  }

  &.full-width {
    width: 100% !important;
    padding: 0;
    max-width: 100% !important;
    ${mediaQuery.nonDesktop} {
      width: 100% !important;
      padding: 0;
      max-width: 100% !important;
    }
  }

  ${mediaQuery.nonDesktop} {
    flex-direction: ${({ $mobileFlexDirection, $flexDirection = 'column' }) =>
      $mobileFlexDirection ?? $flexDirection};
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
    overflow-y: hidden;
  }
  &:first-of-type .section-wrapper {
    height: 100svh;
  }
`;

interface SectionWrapperProps extends StyledSectionWrapperProps {
  className?: string;
  wrapperProps?: HTMLAttributes<HTMLElement>;
}

const SectionWrapperWithoutRef = (
  {
    children,
    className,
    wrapperProps = {},
    ...$styledProps
  }: PropsWithChildren<SectionWrapperProps>,
  ref: Ref<HTMLDivElement>,
) => (
  <StyledSectionWrapper
    wrapperCss={wrapperCss}
    ref={ref}
    className={`section-wrapper ${className ?? ''}`.trim()}
    wrapperProps={wrapperProps}
    {...$styledProps}
  >
    {children}
  </StyledSectionWrapper>
);

const SectionWrapper = forwardRef(SectionWrapperWithoutRef);
export default SectionWrapper;
