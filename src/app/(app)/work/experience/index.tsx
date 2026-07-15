import { getExperienceSection } from "@app/work/constants";
import ExperienceCard from "@components/experience-card";
import Section from "@components/section";
import { tw } from "@utils/tailwind";

const Experience = async ({ titleNumber = "00" }: { titleNumber?: string }) => {
  const experienceSection = await getExperienceSection();

  const expMapper = (
    exp: (typeof experienceSection.items)[number],
    index: number,
  ) => {
    return (
      <ExperienceCard
        {...exp}
        key={exp.company}
        defaultExpanded={index === 0}
      />
    );
  };

  return (
    <Section
      title={`${titleNumber} // ${experienceSection.title}`}
      description={experienceSection.description}
      wrapperProps={{
        "aria-label": "Professional experience and work history",
        id: "experience",
      }}
    >
      <ul
        className={tw`
          relative
          flex flex-col gap-8
          before:absolute
          before:top-[0.5lh]
          before:left-1
          before:h-[calc(100%-0.5lh)]
          before:w-px
          before:bg-grey-200
          not-md:before:content-none
        `}
      >
        {experienceSection.items.map(expMapper)}
      </ul>
    </Section>
  );
};

export default Experience;
