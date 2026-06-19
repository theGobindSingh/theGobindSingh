import AboutSection from "@app/home/about-section";
import Activity from "@app/home/activity";
import ContactSection from "@app/home/contact-section";
import Hero from "@app/home/hero";
import SelectedWork from "@app/home/selected-work";
import Skills from "@app/home/skills";
import Testimonials from "@app/home/testimonials";
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
      <AboutSection />
      <SelectedWork />
      <Skills />
      <Activity />
      <Testimonials />
      <ContactSection />
    </main>
  );
};

export default HomePage;
