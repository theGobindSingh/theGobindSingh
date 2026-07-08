import type { IconType } from "@icons-pack/react-simple-icons";
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";
import type { LucideProps } from "lucide-react";
import { Mail } from "lucide-react";

import LinkedInIcon from "@components/icon-linkedin";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const firstName = "Gobind";
export const lastName = "Singh";
export const fullName = `${firstName} ${lastName}`;

export const designation = "Full Stack Software Engineer";

export const email = "thesinghgobind@gmail.com";

export const resumeLink = "/assets/pdfs/resume.pdf";

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
      url: "/temp",
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
      text: "Extracurricular",
      url: "/extracurricular",
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

export interface WorkItem {
  type?: "case-study" | "project";
  category?: "build" | "rebuild" | "integration" | "frontend";

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

export const caseStudies: WorkItem[] = [
  {
    title: "AI-Driven Conversion Optimization Platform",
    slug: "ai-cro-platform",
    type: "case-study",
    category: "rebuild",
    description:
      "Built and scaled an AI-powered CRO platform, re-architected the monorepo for independent deployments, and shipped backend APIs supporting high-impact product features.",
    stack: [
      "React",
      "Next.js",
      "NestJS",
      "Express",
      "Prisma",
      "TypeScript",
      "PostgreSQL",
      "Turborepo",
    ],
    timeframe: "Jul 2025 - Feb 2026",
    sortDate: "2025-07",
    problem:
      "The platform's monorepo had grown into a tightly coupled codebase where a change in one area risked breaking another. Build times were slow, deployments were monolithic, and teams could not ship independently.",
    approach:
      "Separated the monorepo into distinct applications, shared UI components, and data layers. Designed backend APIs with NestJS and Express, backed by Prisma and PostgreSQL. Migrated from App Router to Pages Router for better ecosystem compatibility and routing stability.",
    outcome:
      "Independent deployments across the stack. Build cycles improved by ~15-20%. Frontend reliability and routing stability measurably improved through optimized rendering and client-side caching.",
    metrics: [
      "~15-20% faster build cycles",
      "Independent deployments for all apps",
      "Stable routing and improved rendering performance",
    ],
  },
  {
    title: "Internal Insurance Portal",
    slug: "insurance-portal",
    type: "case-study",
    category: "rebuild",
    description:
      "Led frontend development for a large-scale internal portal enabling hospital-side workflows including agent-assisted discharge and claims processing.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Emotion",
      "Nx",
      "Webpack",
      "Micro-frontends",
    ],
    timeframe: "Jan 2023 - Jul 2025",
    sortDate: "2023-01",
    problem:
      "The internal insurance infrastructure needed a unified, performant portal that hospital staff could rely on for critical workflows. Existing frontends were fragmented across multiple codebases with significant code duplication.",
    approach:
      "Owned the portal end-to-end: frontend architecture, state management, and collaboration with backend, DevOps, QA, and product. Consolidated multiple frontends into a single Nx monorepo. Migrated a monolithic app to micro-frontend architecture.",
    outcome:
      "Delivered a production-grade portal used daily by hospital teams. Reduced JavaScript bundle size by ~45% and code duplication by ~20%. Release velocity increased through independent micro-frontend deployments.",
    metrics: [
      "~45% JS bundle size reduction",
      "~20% duplicate code reduction",
      "Faster, independent releases per micro-frontend",
    ],
  },
  {
    title: "Themeable Design System & Performance Overhaul",
    slug: "design-system-performance",
    type: "case-study",
    category: "rebuild",
    description:
      "Built a themeable design system from scratch and lifted Lighthouse scores from ~35 to ~90 through profiling and bundle optimization.",
    stack: [
      "Next.js",
      "TypeScript",
      "Emotion",
      "React",
      "Webpack",
      "Chrome DevTools",
    ],
    timeframe: "Jan 2023 - Jul 2023",
    sortDate: "2023-01",
    problem:
      "The application had no consistent design language. Components were built ad-hoc, performance was poor, and Lighthouse scores sat around 35 — hurting both user experience and SEO.",
    approach:
      "Designed and built a themeable component library with Emotion. Profiled the bundle with Chrome DevTools, then applied code splitting, lazy loading, and tree shaking. Established Core Web Vitals as a gate for every release.",
    outcome:
      "Lighthouse scores jumped from ~35 to ~90. Bundle size dropped significantly. The design system became the foundation every subsequent feature was built on.",
    metrics: [
      "Lighthouse ~35 → ~90",
      "Themeable design system adopted across the org",
      "Core Web Vitals green on mobile",
    ],
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
      "Gobind re-architected our entire frontend monorepo and cut build times significantly. He thinks in systems, not just components, and always has a clear reason behind every architectural decision.",
    authorName: "Priya Sharma",
    role: "Engineering Manager",
    company: "Bajaj Finserv Health",
    featured: true,
  },
  {
    quote:
      "He owned the portal from day one and delivered it end-to-end without hand-holding. Rare to find someone who can handle both the technical depth and the stakeholder conversations with equal clarity.",
    authorName: "Rahul Mehta",
    role: "Product Lead",
    company: "Bajaj Finserv Health",
    featured: true,
  },
  {
    quote:
      "The platform went from a monolith to independently deployable apps under his watch. Clean architecture, no drama, and he documented everything so the team could move fast after he left.",
    authorName: "Vikram Joshi",
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
