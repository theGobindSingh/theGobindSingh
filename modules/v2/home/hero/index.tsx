import HeroArrow from '@/icons/v2/hero-arrow';
import CommonFullWidthWrapper from '@components/v2/common-full-width-wrapper';
import DualButton from '@components/v2/dual-button';
import { homeHeroData } from '@data';
import {
  homeHeroArrowStyles,
  homeHeroContainerStyles,
  HomeHeroDateTextWrapper,
  homeHeroImgStyles,
  HomeHeroTextWrapper,
  HomeHeroTitle,
  homeHeroWrapperStyles,
} from '@modules/v2/home/hero/styles';
import { useLenis } from 'lenis/react';
import Image from 'next/image';
import { forwardRef, Ref, RefObject, useRef } from 'react';

const { img, text, title, date, dateText, buttonText, buttonTargetClassName } =
  homeHeroData;

const HomeHeroWithoutRef = (_: unknown, ref: Ref<HTMLDivElement>) => {
  const fallbackRef = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    const target = document.querySelector(`.${buttonTargetClassName}`);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  useLenis(() => {
    const elem =
      (ref as RefObject<HTMLDivElement>)?.current ?? fallbackRef.current;
    if (!elem) return;
    const scrollPosition = window.scrollY;
    const percent = (scrollPosition * 100) / window.innerHeight;
    if (percent > 100) return;
    elem.style.transform = `scale(${100 - percent / 20}%)`;
    elem.style.opacity = `${100 - percent}%`;
  }, []);

  return (
    <CommonFullWidthWrapper
      wrapperCss={homeHeroWrapperStyles}
      css={homeHeroContainerStyles}
      ref={ref ?? fallbackRef}
    >
      <HomeHeroTitle>{title}</HomeHeroTitle>
      <HomeHeroTextWrapper>
        <p className="text">{text}</p>
        <DualButton text={buttonText} onClick={clickHandler} />
      </HomeHeroTextWrapper>
      <HeroArrow css={homeHeroArrowStyles} />
      <HomeHeroDateTextWrapper>
        <span className="text">{dateText}</span>
        <span className="date">{date}</span>
      </HomeHeroDateTextWrapper>
      <Image src={img} alt="" css={homeHeroImgStyles} priority />
    </CommonFullWidthWrapper>
  );
};

const HomeHero = forwardRef(HomeHeroWithoutRef);
export default HomeHero;
