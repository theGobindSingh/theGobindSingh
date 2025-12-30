import { linkTextWrapperStyles } from '@components/v2/link-text/styles';
import Link, { type LinkProps } from 'next/link';
import { ButtonHTMLAttributes } from 'react';

interface LinkTextPropsBase {
  text: string;
}

type LinkTextProps =
  | (LinkTextPropsBase & Omit<LinkProps, 'children'> & { href: string })
  | (LinkTextPropsBase &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'href'>);

const LinkText = (props: LinkTextProps) => {
  const { text } = props;

  if ('href' in props) {
    // Link variant
    const { href, ...linkProps } = props;
    return (
      <Link
        href={href}
        aria-label={text}
        title={text}
        {...linkProps}
        css={linkTextWrapperStyles}
      >
        <span className="upper">{text}</span>
        <span className="lower" aria-hidden>
          {text}
        </span>
      </Link>
    );
  }
  // Button variant
  const btnType =
    (props as ButtonHTMLAttributes<HTMLButtonElement>).type ?? 'button';
  return (
    <button
      type={btnType}
      aria-label={text}
      title={text}
      {...props}
      css={linkTextWrapperStyles}
    >
      <span className="upper">{text}</span>
      <span className="lower" aria-hidden>
        {text}
      </span>
    </button>
  );
};

export default LinkText;
