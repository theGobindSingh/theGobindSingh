import { email, SOCIAL_KEYS, socialLinks } from "@data";

export const heroSection = {
  availabilityLabel: "Available for freelance work",
  location: "Punjab, India · IST (UTC+5:30)",
  title:
    "Tell me what you're building, and I'll tell you honestly if I can help.",
  description:
    "Send a few details below, or reach out directly. I usually reply within a day.",
};

// The rest of the site leads with micro-frontends and monorepos, which reads as
// "too big for my project" to someone who wants a small site. This lists the
// small end first so they don't self-disqualify, without dropping the depth.
export const scopeSection = {
  label: "What I take on",
  items: [
    "Landing pages and marketing sites",
    "Frontend work on a product you already run",
    "Full builds, architecture through production",
  ],
};

export const connectSection = {
  title: "Connect",
  items: [
    SOCIAL_KEYS.EMAIL,
    SOCIAL_KEYS.LINKEDIN,
    SOCIAL_KEYS.GITHUB,
    SOCIAL_KEYS.DISCORD,
    SOCIAL_KEYS.INSTAGRAM,
  ]
    .map((key) => {
      const link = socialLinks[key];
      return link ? { key, ...link } : null;
    })
    .filter((item): item is NonNullable<typeof item> => {
      return Boolean(item);
    }),
  meta: {
    title: "IST · UTC+5:30",
    availability: "Currently open for freelance work.",
    responseTime: "I usually reply within 24 hours.",
  },
};

export const formSection = {
  title: "Get in touch",
  description: "A few lines on what you're building is enough to start.",
  note: "I read every message myself.",
  fields: {
    name: { label: "Name", placeholder: "Jane Doe" },
    email: { label: "Email", placeholder: "jane@company.com" },
    message: {
      label: "The project",
      placeholder: "What are you building, and where are you stuck?",
    },
  },
  submit: {
    idle: "Send message",
    submitting: "Sending…",
    success: "Message sent",
    error: "Something went wrong, try again",
  },
  successMessage: `Thanks, that's landed in my inbox. I'll reply from ${email}.`,
  errorMessage:
    "That didn't go through. Try again, or email me directly below.",
};
