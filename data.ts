import type { IconType } from '@icons-pack/react-simple-icons';
import { SiGithub, SiInstagram } from '@icons-pack/react-simple-icons';
import type { LucideProps } from 'lucide-react';
import { Linkedin, Mail } from 'lucide-react';

import myPhoto from '@images/me.jpg';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export const firstName = 'Gobind';
export const lastName = 'Singh';
export const fullName = `${firstName} ${lastName}`;

export const designation = 'Web Developer | SDE';

export const email = 'thesinghgobind@gmail.com';

export const resumeLink = '/assets/pdfs/resume.pdf';

export enum SOCIAL_KEYS {
  LINKEDIN = 'LINKEDIN',
  GITHUB = 'GITHUB',
  EMAIL = 'EMAIL',
  INSTAGRAM = 'INSTAGRAM',
}

export const socialLinks: {
  [key in SOCIAL_KEYS]?: {
    url: string;
    label: string;
    logo:
      | IconType
      | ForwardRefExoticComponent<
          Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
        >;
    userName?: string;
  };
} = {
  [SOCIAL_KEYS.GITHUB]: {
    url: 'https://www.github.com/theGobindSingh',
    label: 'GitHub',
    logo: SiGithub,
    userName: 'theGobindSingh',
  },
  [SOCIAL_KEYS.LINKEDIN]: {
    url: 'https://www.linkedin.com/in/thegobindsingh',
    label: 'LinkedIn',
    logo: Linkedin,
    userName: 'theGobindSingh',
  },
  [SOCIAL_KEYS.EMAIL]: {
    url: `mailto:${email}`,
    label: 'Email',
    logo: Mail,
  },
  [SOCIAL_KEYS.INSTAGRAM]: {
    url: 'https://www.instagram.com/thegobindsingh',
    label: 'Instagram',
    logo: SiInstagram,
    userName: 'theGobindSingh',
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
    targetId?: string;
    url?: string;
    isHiddenInV1?: boolean;
    isHiddenInV2?: boolean;
  }[];
  bottomLinks?: {
    text: string;
    url: string;
  }[];
} = {
  logoText: fullName,
  middleText: designation,
  links: [
    {
      text: 'Home',
      targetId: 'home',
      isHiddenInV1: true,
    },
    {
      text: 'About',
      targetId: 'about',
    },
    {
      text: 'Work',
      targetId: 'work',
    },
    // {
    //   text: 'Projects',
    //   targetId: 'projects',
    // },
    {
      text: 'Extracurricular',
      targetId: 'extracurricular',
    },
    {
      text: 'Contact',
      targetId: 'contact',
    },
  ],
  bottomPrimaryLink: {
    text: 'Email address',
    url: `mailto:${email}`,
  },
  bottomLinks: [
    {
      text: 'LinkedIn',
      url: 'https://www.linkedin.com/in/thegobindsingh/',
    },
    {
      text: 'GitHub',
      url: 'https://www.github.com/theGobindSingh',
    },
    {
      text: 'Twitter',
      url: 'https://www.twitter.com/theGobindSingh',
    },
  ],
};

export const homeHeroData = {
  titleSuffix: 'Hi, my name is ',
  title: `${fullName}.`,
  titlePostfix: 'I build things for the web.',
  img: myPhoto,
  text: `I'm a software engineer specializing in building\nexceptional digital experiences.`,
  textReplacements: [
    {
      text: 'exceptional digital experiences.',
      url: 'https://youtu.be/dQw4w9WgXcQ?t=43',
    },
  ],
  dateText: 'Building exceptional digital experiences since',
  date: '2021',
  buttonText: 'Contact ↗',
  buttonTargetClassName: 'contact',
};

export const homeAboutData = {
  title: 'About',
  img: myPhoto,
  text: `
Hello, I'm Gobind, a full-stack software engineer from India who builds scalable, high performance web products. I've worked across consumer and internal platforms at Optimeleon AI, building AI driven CRO systems, and at Bajaj Finserv Health, shipping large scale health insurance and hospital workflow products used by real teams every day. Earlier in my career, I also worked with early stage startups, small freelance clients, and experimental products, which gave me strong exposure to fast paced, zero margin for error environments.

I enjoy turning ideas into systems that actually hold up in production. From frontend architecture, performance optimization, and design systems to backend APIs and database workflows, I care about clean structure, long term maintainability, and software that scales without becoming a mess. Outside engineering, I value different perspectives, continuous learning, and working with diverse people. I believe good software should reduce complexity, move fast, and age well.
`,
  textReplacements: [
    {
      text: 'Optimeleon AI',
      url: 'https://www.optimeleon.com/',
    },
    {
      text: 'Bajaj Finserv Health',
      url: 'https://www.bajajfinservhealth.in/',
    },
  ],
  skillsTitle: "Here are a few technologies I've been working with recently:",
  skills: [
    'TypeScript & JS (ES6+)',
    'React & React based frameworks',
    'Express.js & Nest.js',
    'GraphQL',
    'Prisma & SQL Databases',
    'Docker',
  ],
};

export const experienceData:
  | {
      company: string;
      position: string;
      website: string;
      dateRange: string;
      responsibilities: string[];
      otherPositions?: string[];
    }[]
  | null = [
  {
    company: 'Optimeleon AI',
    position: ' Software Development Engineer - Full Stack',
    website: 'https://www.optimeleon.com/',
    dateRange: 'July 2025 - Present',
    responsibilities: [
      `Worked as a full-stack engineer on an AI-driven conversion rate optimization platform, building and scaling personalized web experiences using React, Node.js, and modern frontend caching and data-fetching strategies.`,
      `Re-architected the monorepo by separating applications, shared UI components, and data layers, enabling independent deployments and improving build performance by approximately 15-20%.`,
      `Designed and implemented backend APIs and core database workflows using NestJS, Express, and Prisma, supporting high-impact product features and internal service integrations.`,
      `Improved frontend performance, reliability, and routing stability through optimized rendering patterns, client-side caching, and migrating from Next.js App Router to Pages Router for improved ecosystem compatibility.`,
    ],
  },
  {
    company: 'Bajaj Finserv Health',
    position: 'Software Development Engineer - Frontend',
    otherPositions: [
      `Intern (Frontend)`,
      `Associate SDE (Frontend)`,
      `SDE (Frontend)`,
    ],
    website: 'https://www.bajajfinservhealth.in/',
    dateRange: 'January 2023 - July 2025',
    responsibilities: [
      `Led frontend development for large-scale internal healthcare and insurance portals, enabling hospital-side workflows such as agent-assisted discharge and claims processing.`,
      `Owned and delivered a production-grade portal end-to-end, including frontend architecture, state management, and close collaboration with backend, DevOps, QA, and product stakeholders.`,
      `Unified multiple frontend codebases into a single Nx-powered monorepo, reducing code duplication by approximately 20% and improving developer productivity through optimized tooling, HMR, and linting workflows.`,
      `Migrated a monolithic frontend application to a micro-frontend architecture, improving scalability and release velocity while reducing JavaScript bundle size by roughly 45% using code splitting, lazy loading, and tree shaking.`,
      // `Built scalable, reusable UI components using Next.js, TypeScript, and Emotion, established a themeable design system, and improved Lighthouse and Core Web Vitals scores from approximately 35 to 90 through performance profiling and optimization.`,
    ],
  },
  {
    company: 'TakeMyCar',
    position: 'Freelance Web Developer',
    website: 'https://takemycarweb.vercel.app/',
    dateRange: 'May 2022',
    responsibilities: [
      `Designed and developed a responsive marketing website to establish the company's online presence and showcase its car rental services.`,
      `Built a static, high-performance website using Next.js and Lottie animations, focusing on fast load times and clean visual presentation.`,
    ],
  },
  {
    company: 'Itaitech',
    position: 'Web Development Intern',
    website: 'https://www.linkedin.com/company/iraitech-innovations/',
    dateRange: 'April 2022 - July 2022',
    responsibilities: [
      `Developed modern, performant, and maintainable frontend code for multiple client-facing and internal web applications.`,
      `Collaborated closely with designers and management to implement UI requirements, document features, and support end-to-end project delivery.`,
    ],
  },
];

export const projectData:
  | {
      title: string;
      subTitle: string;
      descriptions: string[];
      techStack: string[];
      links?: {
        github?: string;
        live?: string;
      };
    }[]
  | null = [
  {
    title: '',
    subTitle: '',
    descriptions: [],
    techStack: [],
    links: {
      github: '',
      live: '',
    },
  },
];

export const contactData = {
  titleUpper: "What's next?",
  titleLower: 'Get In Touch',
  text: `I'm currently exploring new opportunities and open to both full-time roles and freelance projects. If you think I'd be a good fit, feel free to reach out. My inbox is always open, whether you have a role in mind, a project to discuss, or just want to say hi.`,
  ctaText: 'Say Hello',
  ctaLink: socialLinks.EMAIL?.url!,
};
