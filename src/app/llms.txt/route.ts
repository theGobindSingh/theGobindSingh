import { faqSection } from "@app/about/faq/constants";
import { designation, email, fullName, SOCIAL_KEYS, socialLinks } from "@data";
import { getAllPosts } from "@lib/blog";
import { getAllCaseStudies } from "@lib/case-studies";
import { SITE_DESCRIPTION, SITE_URL } from "@lib/site-config";

// Must live at the app root, not in the (app) route group — Next does not resolve
// route handlers inside a route group onto the bare `/llms.txt` path, and it
// silently 404s rather than erroring.
const pages = [
  {
    url: SITE_URL,
    title: "Home",
    description:
      "Full stack developer based in Punjab, India. I build, rebuild, and integrate performant web apps using React, Next.js, TypeScript, and Node.js.",
  },
  {
    url: `${SITE_URL}/about`,
    title: "About",
    description:
      "How Gobind Singh works: background, approach, stack, and values. Full stack developer based in Punjab, India.",
  },
  {
    url: `${SITE_URL}/work`,
    title: "Work",
    description:
      "Case studies, shipped projects, and career track record from Gobind Singh, a full stack developer specializing in React, Next.js, TypeScript, and Node.js.",
  },
  {
    url: `${SITE_URL}/blog`,
    title: "Blog",
    description:
      "Technical writing from Gobind Singh on frontend architecture, Next.js, performance, and design systems, drawn from real product work.",
  },
  {
    url: `${SITE_URL}/contact`,
    title: "Contact",
    description:
      "Get in touch with Gobind Singh for freelance web development, full-time roles, or project inquiries. Based in Punjab, India, available remotely.",
  },
  {
    url: `${SITE_URL}/design`,
    title: "Design system",
    description:
      "The live design system behind this portfolio: color ramps, type scale, spacing, elevation, motion, and layout tokens, browsable and searchable.",
  },
];

const GET = async () => {
  const [caseStudies, posts] = await Promise.all([
    getAllCaseStudies(),
    getAllPosts(),
  ]);

  const lines: string[] = [];

  lines.push(`# ${fullName}`, "");
  lines.push(`> ${SITE_DESCRIPTION}`, "");
  lines.push(
    `${fullName} is a ${designation} based in Punjab, India, available for freelance work and open to full-time roles. Contact: ${email}.`,
    "",
  );

  lines.push("## Pages", "");
  pages.forEach(({ url, title, description }) => {
    lines.push(`- [${title}](${url}): ${description}`);
  });
  lines.push("");

  if (caseStudies.length > 0) {
    lines.push("## Work", "");
    caseStudies.forEach((caseStudy) => {
      lines.push(
        `- [${caseStudy.title}](${SITE_URL}/work/${caseStudy.slug}): ${caseStudy.description}`,
      );
    });
    lines.push("");
  }

  if (posts.length > 0) {
    lines.push("## Writing", "");
    posts.forEach((post) => {
      lines.push(
        `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`,
      );
    });
    lines.push("");
  }

  lines.push("## Profiles", "");
  (
    Object.entries(socialLinks) as [
      SOCIAL_KEYS,
      { url: string; label: string },
    ][]
  )
    .filter(([key]) => {
      return key !== SOCIAL_KEYS.EMAIL;
    })
    .forEach(([, link]) => {
      lines.push(`- [${link.label}](${link.url})`);
    });
  lines.push("");

  lines.push("## FAQ", "");
  faqSection.items.forEach(({ question, answer }) => {
    lines.push(`**${question}** — ${answer}`);
  });

  const text = `${lines.join("\n")}\n`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

export { GET };
