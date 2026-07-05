import HomeSection from "@app/home/components/section";
import { workSection } from "@app/home/constants";
import HomeWorkCard from "@app/home/work/work-card";
import { tw } from "@utils/tailwind";

const HomeWorkSection = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  const expMapper = (exp: (typeof workSection.experienceData)[number]) => {
    return <HomeWorkCard {...exp} key={exp.company} />;
  };
  return (
    <HomeSection
      title={`${titleNumber} // ${workSection.title}`}
      description={workSection.description}
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
    </HomeSection>
  );
};

export default HomeWorkSection;
