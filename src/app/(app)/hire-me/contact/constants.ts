import {
  emailHref,
  whatsappCtaLabel,
  whatsappHref,
  whatsappNumber,
} from "@app/hire-me/constants";
import { email, SOCIAL_KEYS, socialLinks } from "@data";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Mail } from "lucide-react";

export const contactSection = {
  title: "Have something that needs building?",
  lede: "Tell me what you're working on. I'll look at the problem, ask the questions that matter, and tell you whether I can help.",
  primaryCta: { label: "Start a project", href: "#contact-name" },
  secondaryCta: { label: whatsappCtaLabel, href: whatsappHref },
  supportLine: "Usually replies within 24 hours.",
} as const;

const platformChannels = [
  {
    key: SOCIAL_KEYS.UPWORK,
    detail: "Hire me on Upwork",
    reason: "For vendor-platform, escrow, or milestone requirements.",
  },
  {
    key: SOCIAL_KEYS.FIVERR,
    detail: "Hire me on Fiverr",
    reason: "For smaller, well-defined work kept on one platform.",
  },
]
  .map(({ key, detail, reason }) => {
    const link = socialLinks[key];
    return link
      ? {
          key: String(key),
          label: link.label,
          href: link.url,
          logo: link.logo,
          detail,
          reason,
        }
      : null;
  })
  .filter((item): item is NonNullable<typeof item> => {
    return Boolean(item);
  });

export const channelsSection = {
  title: "Or reach me directly",
  items: [
    {
      key: "email",
      label: "Email",
      detail: email,
      href: emailHref,
      logo: Mail,
      reason:
        "For anything you'd rather put in writing from the start, no form required.",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      detail: whatsappNumber,
      href: whatsappHref,
      logo: SiWhatsapp,
      reason: "For a quick back-and-forth before anything formal.",
    },
    ...platformChannels,
  ],
  location: "Punjab, India · IST (UTC+5:30)",
};
