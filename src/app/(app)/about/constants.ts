import { fullName, skillCategories } from "@data";
import { getPageCta } from "@lib/page-cta";

export const heroSection = {
  nameLabel: fullName,
  title: "Skilled is easy to claim. \nReliable is what I try to prove.",
  accentWords: ["Reliable"],
};

export const introSection = {
  title:
    "I architect systems that bridge the gap between technical rigor and human experience.",
  paragraph:
    "I got into programming somewhere between a fascination with how things break and a stubborn need to fix them properly instead of patching the symptom. That instinct has stuck. I care less about shipping something that works today, and more about whether it still works, and still makes sense to the next engineer, a year from now.",
};

export const approachSection = {
  title: "My Approach",
  statement: "Understand the constraint before touching the code.",
  paragraphs: [
    "Most of my three years in production have been spent inside systems other people depend on daily. A hospital-side insurance portal used for real discharge and claims workflows. A monorepo powering an AI product moving fast enough that the architecture had to keep pace. Different problems, same discipline.",
    "The parts of the job I like most rarely show up in a demo. Migrating a legacy codebase without breaking anything for the people already using it. Explaining a tradeoff in terms a non-technical stakeholder can act on. Noticing the thing that's going to become a problem in six months, and fixing it now instead.",
  ],
};

export const principlesSection = {
  title: "Principles",
  description: "The parts of quality and communication I don't compromise on.",
  items: [
    {
      title: "Communication",
      description:
        "I flag risks and tradeoffs early, before they become someone else's problem.",
    },
    {
      title: "Ownership",
      description:
        "I follow a project from first commit to production, not just the interesting parts.",
    },
    {
      title: "Clarity",
      description:
        "Technical decisions get explained in terms a non-technical stakeholder can act on.",
    },
    {
      title: "Reliability",
      description:
        "Deadlines and commitments get kept, or renegotiated early. Never missed quietly.",
    },
  ],
};

export const stackSection = {
  title: "Stack",
  description: "What I reach for, grouped by where it does its job.",
  skills: skillCategories,
};

export const getAboutCta = async () => {
  return getPageCta("about");
};
