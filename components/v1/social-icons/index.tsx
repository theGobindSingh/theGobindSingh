import { fullName, socialLinks } from '@data';
import { styled } from '@styles/global';

interface SocialIconsWrapperProps {
  $dir?: 'col' | 'row';
}

const SocialIconsWrapper = styled.div<SocialIconsWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ $dir = 'row' }) => ($dir === 'col' ? 'column' : 'row')};
  gap: 1rem;
  color: inherit;
  * {
    font-size: inherit;
    color: inherit;
  }
`;

interface SocialIconsProps extends SocialIconsWrapperProps {
  className?: string;
}

const icons = Object.values(socialLinks).map(
  ({ label, url, logo: Logo, userName }, index) => (
    <a
      key={`social-icon-${index}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${fullName} | Portfolio | ${label} | ${userName}`}
      title={label}
    >
      <Logo className="social-icon" css={{ height: '1em', width: '1em' }} />
    </a>
  ),
);

const SocialIcons = ({ className, $dir }: SocialIconsProps) => (
  <SocialIconsWrapper className={className} $dir={$dir!}>
    {icons}
  </SocialIconsWrapper>
);

export default SocialIcons;
