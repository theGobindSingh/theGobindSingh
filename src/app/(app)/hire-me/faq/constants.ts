// Every answer is <= 60 words; this array also feeds the page-local FAQPage
// schema. Keep the cap if any answer is edited.
export const faqSection = {
  title: "Questions I get asked",
  items: [
    {
      question: "Can you help define what actually needs to be built?",
      answer:
        "Yes. You don't need to arrive with a complete technical specification. I can help turn the product requirement into a practical scope before development starts.",
    },
    {
      question: "Is React or Next.js the right fit for what I'm building?",
      answer:
        "My core stack is React, Next.js, TypeScript, and Node.js, plus the backend and tooling around them. If a different framework fits your project better, I'll tell you before you commit to one — that judgement is part of what you're hiring.",
    },
    {
      question: "Can you work with an existing codebase?",
      answer:
        "Yes. I can work inside an existing React or Next.js project, follow its conventions, and take ownership of a defined part of the product without forcing a rewrite.",
    },
    {
      question: "Can you work alongside our in-house developers?",
      answer:
        "Routinely. I join your team's existing workflow — your conventions, your review process, your definition of done — and work alongside your engineers like any other contributor, not as a separate outside track.",
    },
    {
      question: "How do you work with clients in other timezones?",
      answer:
        "I'm in IST (UTC+5:30) and work with clients in other timezones. The overlap gets built around your hours, not mine.",
    },
    {
      question: "How do I see progress while you're working?",
      answer:
        "You see working progress every week, in whatever form suits you — we agree that up front. Each update covers what shipped, what's next, and anything I need from you.",
    },
    {
      question: "Who owns the code, and do we need a contract?",
      answer:
        "You own everything I build for you. The terms go in writing before work starts — scope, ownership, deliverables — so both sides know what's agreed from day one.",
    },
    {
      question: "How do international payments and invoicing work?",
      answer:
        "We agree the payment method and invoicing terms in the proposal, based on what's simplest on your side. If your company prefers a platform to handle the contract and payment, I'm on Upwork and Fiverr too.",
    },
    {
      question: "What happens after the project launches?",
      answer:
        "We can wrap up after delivery, continue with maintenance and improvements, or move into ongoing development. The engagement can end at a sensible boundary rather than locking you into a long-term arrangement.",
    },
  ],
} as const;
