import SectionWrapper from '@components/v1/section-wrapper';
import { homeHeroData } from '@data';
import { HomeHeroH1, HomeHeroP } from '@modules/v1/home/styles';
import { ReactNode } from 'react';

const { titleSuffix, title, titlePostfix, text, textReplacements } =
  homeHeroData;

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

const replaceTextWithLinks = (line: string, lineIndex: number): ReactNode[] => {
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

function renderHeroTextLine(
  line: string,
  index: number,
  arr: string[],
): ReactNode {
  const parts = replaceTextWithLinks(line, index);
  return (
    <span key={`hero-text-line-${index}`}>
      {parts}
      {index < arr.length - 1 && <br />}
    </span>
  );
}

const formattedParagraph = text.split('\n').map(renderHeroTextLine);

const HomeHeroSection = () => (
  <SectionWrapper className="fit-spacing">
    <HomeHeroH1>
      <span className="title suffix">{titleSuffix}</span>
      <span className="title main">{title}</span>
      <span className="title postfix">{titlePostfix}</span>
    </HomeHeroH1>
    <HomeHeroP>{formattedParagraph}</HomeHeroP>
  </SectionWrapper>
);

export default HomeHeroSection;
