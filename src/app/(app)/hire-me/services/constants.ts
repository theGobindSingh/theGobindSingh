export const servicesSection = {
  title: "What I build",
  description: "The six kinds of work I take on most often.",
  items: [
    {
      title: "Next.js & React Development",
      description:
        "Production-ready websites and web applications built with the stack I use every day.",
      chips: ["Next.js", "React", "TypeScript", "responsive UI"],
    },
    {
      title: "SaaS & Product Interfaces",
      description:
        "Dashboards, authenticated applications, and the complex workflows behind your product.",
      chips: ["Auth", "roles", "tables", "forms", "charts"],
    },
    {
      title: "AI Integrations",
      description:
        "Add AI to an existing product without turning it into a disconnected demo.",
      chips: ["LLM APIs", "streaming", "product integration"],
    },
    {
      title: "Chrome Extensions",
      description:
        "Custom browser extensions for workflows, automation, and product features.",
      chips: ["Manifest V3", "content scripts", "service workers"],
    },
    {
      title: "Frontend Modernization",
      description:
        "Move an existing frontend forward without throwing away everything that already works.",
      chips: ["Migration", "performance", "architecture", "refactoring"],
    },
    {
      title: "Ongoing Frontend Development",
      description:
        "A developer who can stay with the product instead of disappearing after launch.",
      chips: ["Features", "fixes", "iterations", "maintenance"],
    },
  ],
} as const;
