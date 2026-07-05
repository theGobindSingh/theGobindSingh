import { experienceData } from "@data";

export const heroSection = {
  title: "Building\nsoftware\nis easy.",
  subtitle: "Keeping it reliable as complexity grows is where the work begins.",
  desc: `I'm a full-stack engineer who builds systems that hold up in production. From micro-frontend architectures at Bajaj Finserv Health to AI-driven platforms at Optimeleon, I work across whatever the web demands — UI, APIs, data, infrastructure — with a bias toward performance, clean architecture, and things that actually ship.`,
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

export const workSection = {
  title: "Track Record",
  description:
    "Complexity is inevitable. Confusion is optional. I structure systems that teams can actually understand and scale.",
  experienceData,
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

export const skillsSection = {
  title: "Systems Directory",
  skills: {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Storybook",
      "Emotion / CSS",
    ],
    backend: ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB", "Redis"],
    Architecture: [
      "Micro-Frontends",
      "Monorepos",
      "Event-Driven Systems",
      "Serverless",
    ],
    "Dev Experience": [
      "Turborepos",
      "Nx",
      "Vite",
      "ESLint",
      "Prettier",
      "Husky",
    ],
    Infrastructure: ["Docker", "CI/CD Pipelines", "Performance Tuning"],
  },
};
