import styled from '@emotion/styled';

export const DualButtonWrapper = styled.button`
  position: relative;
  overflow: hidden;
  color: var(--color-text-100);
  font-size: var(--fs-m);
  font-weight: 600;
  border: none;
  border-radius: 1.65em;
  cursor: pointer;
  padding: 0;
  background-color: var(--color-text-800);
  padding: 0.7em 1.75em;
  font-family: inherit;
  &.active,
  &:hover,
  &:active {
    .dual-btn-text {
      transition: all 0.2s ease 80ms;
      transform: translateY(-100%);
    }
    .dual-btn-second-bg {
      transform: translateY(0) scale(1);
      border-radius: inherit;
    }
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  transition: all 0.2s ease 0ms;

  font-size: inherit;
  color: inherit;
  height: 1.5em;
  overflow: hidden;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  * {
    transition: inherit;
  }
`;

export const Text = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: inherit;
`;

export const SecondBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-text-500);
  transition:
    all 0.3s ease,
    border-radius 0.2s ease 80ms;
  transform: translateY(100%) scale(0);
  border-radius: 100% 100% 0 0;
`;
