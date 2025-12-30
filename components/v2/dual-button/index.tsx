import {
  DualButtonWrapper,
  SecondBg,
  Text,
  TextContainer,
} from '@components/v2/dual-button/style';

interface DualButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const DualButton = ({
  text,
  className,
  onClick,
  type = 'button',
}: DualButtonProps) => (
  <DualButtonWrapper
    type={type}
    className={className}
    onClick={onClick}
    aria-label={text}
    typeof="button"
  >
    <TextContainer>
      <Text className="dual-btn-text">{text}</Text>
      <Text aria-hidden className="dual-btn-text">
        {text}
      </Text>
    </TextContainer>
    <SecondBg className="dual-btn-second-bg" />
  </DualButtonWrapper>
);

export default DualButton;
