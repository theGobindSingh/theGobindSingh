/**
 * One-off migration: creates entries in the Payload `experience` collection.
 *
 * The data is inlined here rather than imported from src/data.ts because
 * that module also imports static image assets (next/image StaticImageData),
 * which the plain Node/tsx loader `payload run` uses can't resolve outside
 * webpack.
 *
 * Run once with: npx payload run scripts/migrate-experience.ts
 */
import config from "@payload-config";
import { getPayload } from "payload";

const experienceData: {
  company: string;
  position: string;
  website: string;
  timeframeStart: string;
  timeframeEnd?: string;
  responsibilities: string[];
  otherPositions?: string[];
}[] = [
  {
    company: "Optimeleon AI",
    position: " Software Development Engineer - Full Stack",
    website: "https://www.optimeleon.com/",
    timeframeStart: "2025-07-01",
    timeframeEnd: "2026-02-28",
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
    timeframeStart: "2023-01-01",
    timeframeEnd: "2025-07-31",
    responsibilities: [
      `Led frontend development for large-scale internal healthcare and insurance portals, enabling hospital-side workflows such as agent-assisted discharge and claims processing.`,
      `Owned and delivered a production-grade portal end-to-end, including frontend architecture, state management, and close collaboration with backend, DevOps, QA, and product stakeholders.`,
      `Unified multiple frontend codebases into a single Nx-powered monorepo, reducing code duplication by approximately 20% and improving developer productivity through optimized tooling, HMR, and linting workflows.`,
      `Migrated a monolithic frontend application to a micro-frontend architecture, improving scalability and release velocity while reducing JavaScript bundle size by roughly 45% using code splitting, lazy loading, and tree shaking.`,
    ],
  },
  {
    company: "TakeMyCar",
    position: "Freelance Web Developer",
    website: "https://takemycarweb.vercel.app/",
    timeframeStart: "2022-05-01",
    timeframeEnd: "2022-05-31",
    responsibilities: [
      `Designed and developed a responsive marketing website to establish the company's online presence and showcase its car rental services.`,
      `Built a static, high-performance website using Next.js and Lottie animations, focusing on fast load times and clean visual presentation.`,
    ],
  },
  {
    company: "Iraitech",
    position: "Web Development Intern",
    website: "https://www.linkedin.com/company/iraitech-innovations/",
    timeframeStart: "2022-04-01",
    timeframeEnd: "2022-07-31",
    responsibilities: [
      `Developed modern, performant, and maintainable frontend code for multiple client-facing and internal web applications.`,
      `Collaborated closely with designers and management to implement UI requirements, document features, and support end-to-end project delivery.`,
    ],
  },
];

const run = async () => {
  const payload = await getPayload({ config });

  for (const entry of experienceData) {
    const existing = await payload.find({
      collection: "experience",
      where: {
        and: [
          { company: { equals: entry.company } },
          { timeframeStart: { equals: entry.timeframeStart } },
        ],
      },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`Skipping "${entry.company}" — already exists`);
      continue;
    }

    await payload.create({
      collection: "experience",
      data: {
        company: entry.company,
        position: entry.position,
        website: entry.website,
        timeframeStart: entry.timeframeStart,
        ...(entry.timeframeEnd ? { timeframeEnd: entry.timeframeEnd } : {}),
        responsibilities: entry.responsibilities,
        ...(entry.otherPositions
          ? { otherPositions: entry.otherPositions }
          : {}),
      },
    });

    console.log(`Migrated "${entry.company}"`);
  }
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
