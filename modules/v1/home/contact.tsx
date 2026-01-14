import SectionWrapper from '@components/v1/section-wrapper';
import { contactData } from '@data';
import {
  HomeContactCta,
  HomeContactFooterWrapper,
  HomeContactH2,
  HomeContactPara,
} from '@modules/v1/home/styles';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GitFork, Star } from 'lucide-react';

const { ctaLink, ctaText, text, titleLower, titleUpper } = contactData;

const Footer = () => {
  const { data } = useQuery({
    queryKey: ['repo-stats'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://api.github.com/repos/theGobindSingh/theGobindSingh',
      );
      const { forks_count: forksCount, stargazers_count: starsCount } =
        data ?? ({} as never);
      return { forksCount, starsCount };
    },
  });

  return (
    <HomeContactFooterWrapper>
      <p className="attribution">
        <span>
          Design inspired by{' '}
          <a
            className="underline-animation"
            href="https://github.com/bchiang7/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Brittany Chiang
          </a>
        </span>
        <span>
          and built by{' '}
          <a
            className="underline-animation"
            href="https://github.com/theGobindSingh/theGobindSingh"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gobind Singh
          </a>
        </span>
      </p>
      <div className="repo-stats">
        <a
          href="https://github.com/theGobindSingh/theGobindSingh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Star size={18} />
          <span>{data?.starsCount ?? 0}</span>
        </a>
        <a
          href="https://github.com/theGobindSingh/theGobindSingh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitFork size={18} />
          <span>{data?.forksCount ?? 0}</span>
        </a>
      </div>
    </HomeContactFooterWrapper>
  );
};

const HomeContactSection = () => (
  <SectionWrapper
    className="fit-spacing"
    wrapperProps={{
      id: 'contact',
    }}
  >
    <HomeContactH2>
      <span className="upper">{titleUpper}</span>
      <span className="lower">{titleLower}</span>
    </HomeContactH2>
    <HomeContactPara>{text}</HomeContactPara>
    <HomeContactCta href={ctaLink} target="_blank" rel="noopener noreferrer">
      {ctaText}
    </HomeContactCta>
    <Footer />
  </SectionWrapper>
);

export default HomeContactSection;
