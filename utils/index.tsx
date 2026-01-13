import { ReactNode } from 'react';

const splitKeep = (str: string, identifier: string): string[] => {
  const out = [];
  let idx;

  while ((idx = str.indexOf(identifier)) !== -1) {
    if (idx > 0) out.push(str.slice(0, idx));
    out.push(identifier);
    str = str.slice(idx + identifier.length);
  }

  if (str) out.push(str);
  return out;
};

// const formattedParagraph = text.split('\n').map(renderHeroTextLine);

export const formatTextWithLinks = (
  text: string,
  textReplacements: { text: string; url: string }[],
) => {
  const replaceTextWithLinks = (
    line: string,
    lineIndex: number,
  ): ReactNode[] => {
    let parts: ReactNode[] = [line];

    textReplacements.forEach(({ text: identifier, url }) => {
      parts = parts.flatMap((part, partIndex) => {
        if (typeof part !== 'string') return part;

        return splitKeep(part, identifier).map((chunk, i) => {
          if (chunk === identifier) {
            return (
              <a
                key={`l-${lineIndex}-${identifier}-${partIndex}-${i}`}
                href={url}
                target="_blank"
                className="underline-animation"
                rel="noopener noreferrer"
              >
                {identifier}
              </a>
            );
          }
          return chunk;
        });
      });
    });

    return parts.map((part, i) =>
      typeof part === 'string' ? (
        <span key={`l-${lineIndex}-t-${i}`}>{part}</span>
      ) : (
        part
      ),
    );
  };

  const renderHeroTextLine = (
    line: string,
    index: number,
    arr: string[],
  ): ReactNode => {
    const parts = replaceTextWithLinks(line, index);
    const key = `hero-text-line-${index}`;
    if (parts.length === 0) return <br key={key} />;
    return (
      <span key={key}>
        {parts}
        {index < arr.length - 1 && <br />}
      </span>
    );
  };

  return text.trim().split('\n').map(renderHeroTextLine);
};
