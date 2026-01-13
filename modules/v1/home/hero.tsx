import SectionWrapper from '@components/v1/section-wrapper';
import { homeHeroData } from '@data';
import { HomeHeroH1, HomeHeroP } from '@modules/v1/home/styles';
import { formatTextWithLinks } from '@utils/index';

const { titleSuffix, title, titlePostfix, text, textReplacements } =
  homeHeroData;

const formattedParagraph = formatTextWithLinks(text, textReplacements);

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
