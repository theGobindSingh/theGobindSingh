import SectionWrapper from '@components/v1/section-wrapper';
import { experienceData } from '@data';
import {
  CommonH2,
  ExperienceTabBtnsWrapper,
  ExperienceTabContentWrapper,
  ExperienceWrapper,
  homeExperienceTabContentWrapperStyles,
} from '@modules/v1/home/styles';
import { breakpoints } from '@styles/global';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';

const HomeExperienceSection = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const experienceTabBtnsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = experienceTabBtnsWrapperRef.current;
    if (!wrapper) return;
    wrapper.setAttribute(
      'style',
      `--_top-offset: calc(${selectedTab} * 2.5rem);`,
    );
  }, [selectedTab]);

  if (!experienceData || experienceData.length === 0) return null;
  return (
    <SectionWrapper
      className="fit-spacing"
      $gap="1.5rem"
      $justifyContent="flex-start"
      $alignItems="flex-start"
      $mobileWidth="100%"
      wrapperProps={{
        id: 'work',
      }}
      css={homeExperienceTabContentWrapperStyles}
    >
      <CommonH2 $margin="6.25rem 0 0 0" className="small">
        {`Where I've Worked`}
      </CommonH2>
      <ExperienceWrapper>
        <ExperienceTabBtnsWrapper ref={experienceTabBtnsWrapperRef}>
          {experienceData.map(({ company }, index) => {
            const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
              setSelectedTab(index);
              if (window.innerWidth >= breakpoints.desktop.min) return;
              const target = (e.currentTarget ?? e.target) as HTMLButtonElement;
              const container = experienceTabBtnsWrapperRef.current;
              if (!container) return;
              const scrollLeft =
                target.offsetLeft -
                container.clientWidth / 2 +
                target.offsetWidth / 2;
              container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            };

            return (
              <button
                key={`experience-tab-btn-${company}`}
                type="button"
                className={index === selectedTab ? 'active' : ''}
                onClick={clickHandler}
              >
                {company}
              </button>
            );
          })}
        </ExperienceTabBtnsWrapper>
        {experienceData.map(
          (
            {
              dateRange,
              position,
              website,
              otherPositions,
              company,
              responsibilities,
            },
            index,
          ) => (
            <ExperienceTabContentWrapper
              key={`experience-tab-content-${company}`}
              className={index === selectedTab ? 'active' : undefined}
            >
              <div className={'heading-container'}>
                <h3 className="h3">
                  <span>{`${position} @ `}</span>
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-animation"
                  >
                    {company}
                  </a>
                </h3>
                <span className="date-range">{dateRange}</span>
                <div className="other-positions">
                  {otherPositions?.map((otherPosition, index) => (
                    <span key={`other-position-${company}-${index}`}>
                      {otherPosition}
                      {index < otherPositions.length - 1 && ' → '}
                    </span>
                  ))}
                </div>
              </div>
              <ul>
                {responsibilities.map((responsibility, index) => (
                  <li key={`responsibility-${company}-${index}`}>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </ExperienceTabContentWrapper>
          ),
        )}
      </ExperienceWrapper>
    </SectionWrapper>
  );
};

export default HomeExperienceSection;
