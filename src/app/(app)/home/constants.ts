import { freelanceData, projectData, skillCategories } from "@data";
import { getAllCaseStudies } from "@lib/case-studies";
import { getAllExperience } from "@lib/experience";

export const heroSection = {
  title: "Building\nsoftware\nis easy.",
  subtitle: "Keeping it reliable as complexity grows is where the work begins.",
  desc: `I'm a full-stack developer specializing in React, Next.js, TypeScript, and Node.js. I build, rebuild, and integrate production web apps for startups and enterprises — from micro-frontend architectures to AI-driven platforms — with a focus on performance, clean architecture, and shipping systems that hold up in production.`,
  tags: [
    "MICRO-FRONTENDS & MONOREPOS",
    "REACT / NEXT.JS / NODE.JS",
    "PERFORMANCE & BUNDLE OPTIMIZATION",
  ],
  impactTags: [
    ["3+", "Years in Production"],
    ["4", "Companies Shipped"],
    ["18+", "Technologies"],
    ["2", "Industry Domains"],
  ],
};

export const getWorkSection = async () => {
  return {
    title: "Track Record",
    description:
      "Complexity is inevitable. Confusion is optional. I structure systems that teams can actually understand and scale.",
    experienceData: await getAllExperience(),
  };
};

export const manifestoSection = {
  title: "Engineering Manifesto",
  items: [
    {
      title: "Performance",
      subTitle: "Latency is a bug.",
      description: "Optimizing for the edge is a requirement, not a luxury.",
    },
    {
      title: "Reliability",
      subTitle: "Boring Tech.",
      description: "Prioritize stable infrastructure for core systems.",
    },
    {
      title: "Culture",
      subTitle: "Read > Write.",
      description: "Clean code reduces cognitive load for the next engineer.",
    },
    {
      title: "Deletion",
      subTitle: "Remove Code.",
      description: "If it doesn't serve a purpose, it shouldn't exist.",
    },
    {
      title: "Context",
      subTitle: "No Black Boxes.",
      description: "Systems must be observable to be production-ready.",
    },
  ],
};

export const getProjectsSection = async () => {
  const featuredCaseStudy = (await getAllCaseStudies()).find((study) => {
    return study.featured;
  });

  return {
    title: "Engineering Challenges Solved",
    description:
      "Case studies and projects that reflect how I think about architecture, constraints, and shipping real systems.",
    caseStudies: featuredCaseStudy ? [featuredCaseStudy] : [],
    projects: projectData.slice(0, 1),
  };
};

export const skillsSection = {
  title: "Systems Directory",
  skills: skillCategories,
};

export const freelanceSection = {
  title: "Freelance Work",
  description:
    "Client projects delivered end to end, from brief to production.",
  items: freelanceData.slice(0, 1),
};
