import SectionWrapper from '@components/v1/section-wrapper';
import { fullName } from '@data';
import {
  ExtracurricularCarouselNavButton,
  ExtracurricularCarouselSlide,
  ExtracurricularCarouselWrapper,
  HomeExtracurricularH2,
} from '@modules/v1/home/styles';
import { HomePageProps } from '@modules/v1/home/types';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import useEmblaCarousel from 'embla-carousel-react';
import { MoveLeft, MoveRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect } from 'react';

type Callback = Parameters<NonNullable<UseEmblaCarouselType['1']>['on']>['1'];

const HomeExtracurricularSection = ({ imageData }: HomePageProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    inViewThreshold: 0.0001,
    startIndex: 0,
  });

  const imageDataMapper = useCallback(
    (
      { height, width, url, id, blurUrl }: HomePageProps['imageData'][number],
      index: number,
    ) => (
      <ExtracurricularCarouselSlide
        target="_blank"
        rel="noopener noreferrer"
        href="https://photos.app.goo.gl/U8yYDxEZQ5dEuqF19"
        className="embla__slide"
        key={id}
      >
        <Image
          blurDataURL={blurUrl!}
          height={height}
          width={width}
          src={url}
          alt={`${fullName} | Extracurricular | Photography | Image ${index}`}
          placeholder="blur"
          priority={false}
          loading="lazy"
          sizes="(max-width: 600px) 90vw, (max-width: 1200px) 50vw, 33vw"
        />
      </ExtracurricularCarouselSlide>
    ),
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const MAX_ANGLE = 18; // deg, tweak this shit
    const SCALE_FALLOFF = 0.15;

    const onScroll: Callback = () => {
      const progress = emblaApi.scrollProgress();
      const snaps = emblaApi.scrollSnapList();

      emblaApi.slideNodes().forEach((slide, index) => {
        const snapPoint = snaps[index]!;
        let diff = snapPoint - progress;

        // handle looping
        if (diff > 0.5) diff -= 1;
        if (diff < -0.5) diff += 1;

        const absDiff = Math.abs(diff);

        const angle = diff * MAX_ANGLE * -1;
        const scale = 1 - absDiff * SCALE_FALLOFF;

        slide.style.setProperty('--dyn-angle', `${angle}deg`);
        slide.style.setProperty('--dyn-scale', scale.toString());
      });
    };

    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);
    onScroll(emblaApi, 'init');

    return () => {
      emblaApi.off('scroll', onScroll);
      emblaApi.off('reInit', onScroll);
    };
  }, [emblaApi]);

  const mouseDownHandler = () => {
    if (!emblaApi) return;
    emblaApi.containerNode().style.setProperty('cursor', 'grabbing');
  };

  const mouseUpHandler = () => {
    if (!emblaApi) return;
    emblaApi.containerNode().style.removeProperty('cursor');
  };

  const leftButtonHandler = () => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  };

  const rightButtonHandler = () => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  };

  return (
    <SectionWrapper
      className="full-width"
      $flexDirection="row"
      $mobileFlexDirection="column"
      $gap="2rem"
      wrapperProps={{
        id: 'extracurricular',
      }}
    >
      <HomeExtracurricularH2>
        <span className="upper">Extra-curricular</span>
        <span className="lower">Photography</span>
      </HomeExtracurricularH2>
      <ExtracurricularCarouselWrapper
        className="embla"
        ref={emblaRef}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
      >
        <div className="embla__container">{imageData.map(imageDataMapper)}</div>
      </ExtracurricularCarouselWrapper>
      <ExtracurricularCarouselNavButton>
        <button
          type="button"
          onClick={leftButtonHandler}
          aria-label="Previous Photo"
        >
          <MoveLeft size={24} />
        </button>
        <button
          type="button"
          onClick={rightButtonHandler}
          aria-label="Next Photo"
        >
          <MoveRight size={24} />
        </button>
      </ExtracurricularCarouselNavButton>
    </SectionWrapper>
  );
};

export default HomeExtracurricularSection;
