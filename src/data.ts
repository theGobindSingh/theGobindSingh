import type { IconType } from "@icons-pack/react-simple-icons";
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";
import type { LucideProps } from "lucide-react";
import { Mail } from "lucide-react";

import LinkedInIcon from "@components/icon-linkedin";
import cleantankImage from "@images/cleantank.png";
import type { StaticImageData } from "next/image";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const firstName = "Gobind";
export const lastName = "Singh";
export const fullName = `${firstName} ${lastName}`;

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
      text: "Design",
      url: "/design",
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
      text: "Blogs",
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

export const footerData: {
  title: string;
  description: string;
  footNote: string;
  links: SocialLink[];
} = {
  title: fullName,
  description:
    "Full-stack engineer specializing in React, Next.js, and Node. Building fast, maintainable systems that ship and stay shipped.",
  footNote: "DESIGNED AND BUILT BY GOBIND SINGH · 2026",
  links: [
    ...Object.values(socialLinks),
    {
      url: resumeLink,
      label: "Resume",
      logo: (() => {
        return null;
      }) as unknown as IconType,
      userName: undefined,
    },
  ],
};

export const experienceData: {
  company: string;
  position: string;
  website: string;
  dateRange: string;
  /** ISO-ish start date (e.g. "2025-07") used for chronological sorting, not display. */
  sortDate: string;
  responsibilities: string[];
  otherPositions?: string[];
}[] = [
  {
    company: "Optimeleon AI",
    position: " Software Development Engineer - Full Stack",
    website: "https://www.optimeleon.com/",
    dateRange: "July 2025 - February 2026",
    sortDate: "2025-07",
    responsibilities: [
      `Worked as a full-stack engineer on an AI-driven conversion rate optimization platform, building and scaling personalized web experiences using React, Node.js, and modern frontend caching and data-fetching strategies.`,
      `Re-architected the monorepo by separating applications, shared UI components, and data layers, enabling independent deployments and improving build performance by approximately 15-20%.`,
      `Designed and implemented backend APIs and core database workflows using NestJS, Express, and Prisma, supporting high-impact product features and internal service integrations.`,
      `Improved frontend performance, reliability, and routing stability through optimized rendering patterns, client-side caching, and migrating from Next.js App Router to Pages Router for improved ecosystem compatibility.`,
    ],
  },
  {
    company: "Bajaj Finserv Health",
    position: "Software Development Engineer - Frontend",
    otherPositions: [
      `SDE (Frontend)`,
      `Associate SDE (Frontend)`,
      `Intern (Frontend)`,
    ],
    website: "https://www.bajajfinservhealth.in/",
    dateRange: "January 2023 - July 2025",
    sortDate: "2023-01",
    responsibilities: [
      `Led frontend development for large-scale internal healthcare and insurance portals, enabling hospital-side workflows such as agent-assisted discharge and claims processing.`,
      `Owned and delivered a production-grade portal end-to-end, including frontend architecture, state management, and close collaboration with backend, DevOps, QA, and product stakeholders.`,
      `Unified multiple frontend codebases into a single Nx-powered monorepo, reducing code duplication by approximately 20% and improving developer productivity through optimized tooling, HMR, and linting workflows.`,
      `Migrated a monolithic frontend application to a micro-frontend architecture, improving scalability and release velocity while reducing JavaScript bundle size by roughly 45% using code splitting, lazy loading, and tree shaking.`,
      // `Built scalable, reusable UI components using Next.js, TypeScript, and Emotion, established a themeable design system, and improved Lighthouse and Core Web Vitals scores from approximately 35 to 90 through performance profiling and optimization.`,
    ],
  },
  {
    company: "TakeMyCar",
    position: "Freelance Web Developer",
    website: "https://takemycarweb.vercel.app/",
    dateRange: "May 2022",
    sortDate: "2022-05",
    responsibilities: [
      `Designed and developed a responsive marketing website to establish the company's online presence and showcase its car rental services.`,
      `Built a static, high-performance website using Next.js and Lottie animations, focusing on fast load times and clean visual presentation.`,
    ],
  },
  {
    company: "Itaitech",
    position: "Web Development Intern",
    website: "https://www.linkedin.com/company/iraitech-innovations/",
    dateRange: "April 2022 - July 2022",
    sortDate: "2022-04",
    responsibilities: [
      `Developed modern, performant, and maintainable frontend code for multiple client-facing and internal web applications.`,
      `Collaborated closely with designers and management to implement UI requirements, document features, and support end-to-end project delivery.`,
    ],
  },
];

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
}

export const projectData: WorkItem[] = [
  {
    title: "Kami UI",
    slug: "kami-ui",
    type: "project",
    category: "build",
    description:
      "A minimalist, accessible component library designed for rapid high-fidelity prototyping. Focused on strict architectural precision and developer ergonomics.",
    stack: ["React", "TypeScript", "Next.js", "Emotion", "Storybook"],
    timeframe: "2024",
    sortDate: "2024-01",
    problem:
      "Most component libraries prioritize flexibility over consistency, leading to fragmented design systems and slow prototyping cycles.",
    approach:
      "Built a themeable, accessible component library with strict architectural precision. Implemented reusable components, theming support, and accessibility best practices from the ground up.",
    outcome:
      "A production-ready component library that enables rapid high-fidelity prototyping with consistent, accessible user interfaces.",
    metrics: [
      "Themeable design system",
      "Accessibility best practices baked in",
      "Rapid prototyping workflow",
    ],
    links: {
      github: "https://github.com/webadeva/kami-ui",
      live: "https://webadeva.github.io/kami-ui/",
    },
  },
];

export const freelanceData: WorkItem[] = [
  {
    title: "CleanTank Services",
    slug: "cleantank-services",
    type: "project",
    category: "freelance",
    description:
      "A multi-page marketing site for an industrial water-tank cleaning company operating across India, built to carry both direct service sales and franchise recruitment.",
    stack: [
      "Next.js",
      "TypeScript",
      "GraphQL",
      "Contentful",
      "MUI",
      "TanStack Query",
    ],
    timeframe: "2026",
    sortDate: "2026-03",
    problem:
      "The client needed a credible, conversion-focused web presence that could speak to two very different audiences at once: hospitals and government bodies evaluating compliance-grade service providers, and prospective franchise partners evaluating an investment.",
    approach:
      "I built a multi-page Next.js site backed by a headless CMS so the team can update copy and imagery without touching code, with typed GraphQL queries via codegen for the content layer. Service and franchise inquiries run through separate lead-capture funnels, each with its own form fields and submission handling, and the visual system leans into the client's clinical, industrial-grade positioning.",
    outcome:
      "Shipped a live, production site covering the full service story, franchise recruitment, and lead capture end to end, now serving as the client's primary digital storefront.",
    metrics: [
      "CMS-driven content, no code changes needed for copy or image updates",
      "Separate lead-gen funnels for service quotes and franchise applications",
    ],
    links: {
      live: "https://cleantank.vercel.app/",
    },
    image: {
      src: cleantankImage,
      alt: "CleanTank Services homepage, showing a technician hydro-jetting an industrial water tank",
    },
  },
];

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
