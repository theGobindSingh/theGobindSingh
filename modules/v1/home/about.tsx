import SectionWrapper from '@components/v1/section-wrapper';
import { fullName, homeAboutData } from '@data';
import {
  CommonH2,
  HomeAboutLeftWrapper,
  HomeAboutP,
  HomeAboutRightWrapper,
  ImageContainer,
} from '@modules/v1/home/styles';
import { formatTextWithLinks } from '@utils/index';
import Image from 'next/image';

const { img, skills, skillsTitle, text, textReplacements, title } =
  homeAboutData;

const formattedParagraph = formatTextWithLinks(text, textReplacements);

const skillsList = skills.map((skill) => <li key={skill}>{skill}</li>);

const ImageWrapper = () => (
  <ImageContainer className="img-wrapper">
    <div className="img-container">
      <Image src={img} alt={fullName} fill className="my-img" />
    </div>
  </ImageContainer>
);

const HomeAboutSection = () => {
  return (
    <SectionWrapper
      className="fit-spacing"
      $flexDirection="row"
      $mobileFlexDirection="column"
      $gap="2rem"
      wrapperProps={{
        id: 'about',
      }}
    >
      <HomeAboutLeftWrapper>
        <CommonH2>{title}</CommonH2>
        <HomeAboutP>
          {formattedParagraph}
          <ImageWrapper />
        </HomeAboutP>
        <div className="skills-section">
          <span>{skillsTitle}</span>
          <ul className="list-wrapper">{skillsList}</ul>
        </div>
      </HomeAboutLeftWrapper>
      <HomeAboutRightWrapper>
        <ImageWrapper />
      </HomeAboutRightWrapper>
    </SectionWrapper>
  );
};

export default HomeAboutSection;
