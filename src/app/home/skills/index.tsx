import HomeSection from "@app/home/components/section";
import { skillsSection } from "@app/home/constants";
import { PropsWithChildren } from "react";

const skillsListMapper = (skill: string) => {
  return (
    <li key={skill} className="">
      {skill}
    </li>
  );
};

const skillsMapper = ([category, skills]: [string, string[]]) => {
  return (
    <div key={category} className="">
      <h3 className="mb-2 font-semibold uppercase">{`/ ${category}`}</h3>
      <hr className="mt-2 mb-6 border-grey-200" />
      <ul className="flex flex-col gap-2 text-(size:--fs-3xs) text-grey-700">
        {skills.map(skillsListMapper)}
      </ul>
    </div>
  );
};

const Wrapper = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="flex w-full flex-col gap-4 border border-grey-300 bg-[hsla(var(--color-grey-100-base),0.75)] px-8 py-12">
      {children}
    </div>
  );
};

const HomeSkills = ({ titleNumber = "00" }: { titleNumber?: string }) => {
  return (
    <HomeSection
      title={`${titleNumber} // ${skillsSection.title}`}
      wrapper={Wrapper}
    >
      <div className="grid grid-cols-5 gap-4 not-md:grid-cols-2">
        {Object.entries(skillsSection.skills).map(skillsMapper)}
      </div>
    </HomeSection>
  );
};

export default HomeSkills;
