import { workSection } from "@app/home/constants";
import ExperienceCard from "@components/experience-card";
import { Link } from "@components/link";
import HomeSection from "@components/section";
import { tw } from "@utils/tailwind";

const HomeWorkSection = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  const expMapper = (
    exp: (typeof workSection.experienceData)[number],
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
    <HomeSection
      title={`${titleNumber} // ${workSection.title}`}
      description={workSection.description}
      wrapperProps={{
        "aria-label": "Professional experience and work history",
        id: "work",
      }}
      link={{
        href: "/work",
        label: "View all work",
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
        {workSection.experienceData.map(expMapper)}
      </ul>
      <Link
        href="/work"
        className="mt-4 ml-auto px-4 py-0 font-mono font-medium"
        color="accent"
        hoverTextColor="grey"
        hoverTextColorWeight={100}
        variant="outlined"
      >
        <span>View all work </span>
        <span className="text-(size:--fs-m)">↗</span>
      </Link>
    </HomeSection>
  );
};

export default HomeWorkSection;
