import SectionWrapper from '@components/v1/section-wrapper';
import { CommonH2 } from '@modules/v1/home/styles';

const HomeProjectsSection = () => {
  return (
    <SectionWrapper
      className="fit-spacing"
      $gap="2rem"
      wrapperProps={{
        id: 'projects',
      }}
    >
      <CommonH2>Some Things I've Built</CommonH2>
    </SectionWrapper>
  );
};

export default HomeProjectsSection;
