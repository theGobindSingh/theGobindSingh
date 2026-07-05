import Hero from "@app/home/hero";
import HomeManifesto from "@app/home/manifesto";
import HomeSkills from "@app/home/skills";
import HomeWorkSection from "@app/home/work";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gobind Singh — Full Stack Developer",
  description:
    "Full stack developer who designs and ships polished, performant web apps. See the work, then let's talk.",
  openGraph: {
    title: "Gobind Singh — Full Stack Developer",
    description:
      "Full stack developer who designs and ships polished, performant web apps.",
    type: "website",
  },
};

const HomePage = () => {
  return (
    <main>
      <Hero />
      <HomeWorkSection titleNumber="02" />
      <HomeManifesto titleNumber="03" />
      <HomeSkills titleNumber="04" />
    </main>
  );
};

export default HomePage;
