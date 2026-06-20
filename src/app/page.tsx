import Hero from "@app/home/hero";
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
    </main>
  );
};

export default HomePage;
