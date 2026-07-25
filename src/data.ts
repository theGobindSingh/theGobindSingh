import type { IconType } from "@icons-pack/react-simple-icons";
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";
import type { LucideProps } from "lucide-react";
import { Mail } from "lucide-react";

import LinkedInIcon from "@components/icon-linkedin";
import mySuitPhoto from "@images/me.jpg";
import type { StaticImageData } from "next/image";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const firstName = "Gobind";
export const lastName = "Singh";
export const fullName = `${firstName} ${lastName}`;

export const professionalPhoto = {
  src: "/assets/images/me.jpg",
  img: mySuitPhoto,
};

export const designation = "Full Stack Software Engineer";

export const email = "thesinghgobind@gmail.com";

export const resumeLink = "/resume.pdf";

export enum SOCIAL_KEYS {
  LINKEDIN = "LINKEDIN",
  GITHUB = "GITHUB",
  EMAIL = "EMAIL",
  INSTAGRAM = "INSTAGRAM",
}

interface SocialLink {
  url: string;
  label: string;
  logo:
    | IconType
    | ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
  userName?: string | undefined;
}

export const socialLinks: {
  [key in SOCIAL_KEYS]?: SocialLink;
} = {
  [SOCIAL_KEYS.GITHUB]: {
    url: "https://www.github.com/theGobindSingh",
    label: "GitHub",
    logo: SiGithub,
    userName: "theGobindSingh",
  },
  [SOCIAL_KEYS.LINKEDIN]: {
    url: "https://www.linkedin.com/in/thegobindsingh",
    label: "LinkedIn",
    logo: LinkedInIcon,
    userName: "theGobindSingh",
  },
  [SOCIAL_KEYS.EMAIL]: {
    url: `mailto:${email}`,
    label: "Email",
    logo: Mail,
  },
  [SOCIAL_KEYS.INSTAGRAM]: {
    url: "https://www.instagram.com/thegobindsingh",
    label: "Instagram",
    logo: SiInstagram,
    userName: "theGobindSingh",
  },
};

export const headerAndNavData: {
  logoText: string;
  middleText?: string;
  bottomPrimaryLink?: {
    text: string;
    url: string;
  };
  links: {
    text: string;
    url: string;
  }[];
  bottomLinks?: {
    id: SOCIAL_KEYS;
    text: string;
    url: string;
  }[];
} = {
  logoText: fullName,
  middleText: designation,
  links: [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "About",
      url: "/about",
    },
    {
      text: "Work",
      url: "/work",
    },
    {
      text: "Blog",
      url: "/blog",
    },
    {
      text: "Contact",
      url: "/contact",
    },
  ],
  bottomPrimaryLink: {
    text: "Email address",
    url: `mailto:${email}`,
  },
  bottomLinks: [
    {
      id: SOCIAL_KEYS.LINKEDIN,
      text: "LinkedIn",
      url: "https://www.linkedin.com/in/thegobindsingh/",
    },
    {
      id: SOCIAL_KEYS.GITHUB,
      text: "GitHub",
      url: "https://www.github.com/theGobindSingh",
    },
  ],
};

// The footer renders label + url only, so it takes a plain link shape rather
// than SocialLink — which would force a fake `logo` on non-social entries.
export const footerData: {
  title: string;
  description: string;
  footNote: { prefix: string; name: string; suffix: string };
  designSystemCta: { prefix: string; name: string };
  links: { url: string; label: string }[];
} = {
  title: fullName,
  description:
    "Full-stack engineer specializing in React, Next.js, and Node. Building fast, maintainable systems that ship and stay shipped.",
  footNote: { prefix: "Designed and built by", name: fullName, suffix: "2026" },
  designSystemCta: {
    prefix: "Like this portfolio's design? Here's the",
    name: "design system",
  },
  links: [
    ...Object.values(socialLinks).map(({ url, label }) => {
      return { url, label };
    }),
    { url: resumeLink, label: "Resume" },
  ],
};

export type WorkCategory =
  | "build"
  | "rebuild"
  | "integration"
  | "frontend"
  | "freelance";

export const CATEGORY_LABELS: Record<WorkCategory, string> = {
  build: "Build",
  rebuild: "Rebuild",
  integration: "Integration",
  frontend: "Frontend",
  freelance: "Freelance",
};

export interface WorkItem {
  type?: "project";
  category?: WorkCategory;

  title: string;
  description: string;
  stack: string[];
  metrics?: string[];
  timeframe: string;
  /** ISO-ish start date (e.g. "2025-07") used for chronological sorting, not display. */
  sortDate: string;

  links?: {
    github?: string;
    live?: string;
  };

  problem: string;
  approach: string;
  outcome: string;

  slug?: string;
  image?: {
    src: StaticImageData;
    alt: string;
  };
  // Optional companion shot: paired with `image` it shows the site is
  // responsive without needing a second card.
  imageMobile?: {
    src: StaticImageData;
    alt: string;
  };
}

// Project and freelance-work content live in Payload (see src/lib/projects
// and src/lib/freelance) — this WorkItem type is the shared shape both are
// mapped into.

export const testimonials: {
  quote: string;
  authorName: string;
  role: string;
  company: string;
  featured: boolean;
}[] = [
  {
    quote:
      "Gobind was enthusiastic from the get go and he took up the project as expected and defined the scope and made sure I felt comfortable with him taking lead. He even brought in his team members to help brainstorm the requirements and understand the whole idea for developing a website. Will definitely recommend Gobind for his technical abilities at your company.",
    authorName: "Badri Narayan Mohan",
    company: "TakeMyCar",
    featured: true,
    role: "Founder",
  },
  {
    quote: "...",
    authorName: "Abhiraj Padhye",
    role: "CTO",
    company: "Optimeleon AI",
    featured: true,
  },
  {
    quote:
      "I worked closely with Gobind at Optimeleon and reviewed a lot of his code. What stands out most is how much thought he puts into designing systems before writing code — he thinks through how things will scale and adapt as requirements and teams change, so the solutions he builds tend to last instead of needing a rewrite months later. His coding standards are among the best I've seen, and he fixes problems because they should be fixed, not because someone asked or there's recognition attached.",
    authorName: "Sai Rohit",
    role: "Founding Engineer",
    company: "Optimeleon",
    featured: true,
  },
];

export const skillsList: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "JavaScript (ES6+)",
  "NestJS",
  "Express",
  "Prisma",
  "Turborepo",
  "Nx",
  "Webpack",
  "HTML",
  "CSS",
  "Emotion",
  "REST APIs",
  "Git",
  "Docker",
  "CI/CD",
];

export const skillCategories: Record<string, string[]> = {
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
  "Dev Experience": ["Turborepos", "Nx", "Vite", "ESLint", "Prettier", "Husky"],
  Infrastructure: ["Docker", "CI/CD Pipelines", "Performance Tuning"],
};
