/**
 * Site configuration — TimeReality: AI time awareness analyzer
 */
export const siteConfig = {
  name: "TimeReality",
  description: "AI time tracker for freelancers — find out where your work hours actually go and reclaim lost productivity",
  url: (process.env.NEXTAUTH_URL ?? "http://localhost:3000").trim(),
  contactEmail: "support@forgetool.co",

  hero: {
    title: "Where Do Your Work Hours Actually Go? AI Finds Out.",
    subtitle:
      "Describe your typical work week — meetings, deep work, admin, breaks. Our AI reveals your real time allocation, hidden productivity leaks, and a concrete plan to reclaim lost hours.",
    cta: "Analyze My Time →",
  },

  howItWorks: [
    { step: "1", title: "Describe your week", description: "Tell us about your typical work day — tasks, meetings, breaks, and routines." },
    { step: "2", title: "AI maps your time", description: "Our AI categorizes every hour and identifies hidden time sinks you don't notice." },
    { step: "3", title: "Get your action plan", description: "Receive a productivity score, time breakdown, and specific changes to reclaim hours." },
  ] as { step: string; title: string; description: string }[],

  faqs: [
    { q: "What information do I need to provide?", a: "Describe your typical work day in natural language — what you do from morning to evening, including meetings, focused work, admin tasks, and breaks." },
    { q: "How accurate is the time analysis?", a: "The AI identifies patterns from your description. It's most accurate when you're honest about how you actually spend time, not how you wish you did." },
    { q: "Who is TimeReality for?", a: "Freelancers, remote workers, solopreneurs, and anyone who feels busy but not productive. Especially useful if you bill by the hour." },
    { q: "What's included in the report?", a: "A productivity score (0-100), visual time breakdown by category, top time sinks, wasted hours estimate, and a personalized action plan." },
    { q: "Can I try it for free?", a: "Yes! Get 3 free time analyses when you sign up. No credit card required." },
    { q: "How is this different from time tracking apps?", a: "Time trackers record what you do. TimeReality analyzes your patterns to reveal what you don't see — hidden time sinks, context switching costs, and optimization opportunities." },
  ] as { q: string; a: string }[],

  pricing: {
    price: "$5",
    period: "one-time" as "one-time" | "monthly",
    credits: 50,
    features: [
      "Productivity score (0-100)",
      "Time allocation breakdown",
      "Hidden time sink detection",
      "Personalized optimization plan",
    ],
  },

  credits: {
    freeOnSignup: 3,
    perUse: 1,
  },

  seo: {
    keywords: ["time tracker for freelancers", "where does my time go", "productivity analyzer", "time audit tool", "work time analysis", "freelancer productivity", "time management AI"],
    metaTitle: "Where Does Your Time Go? Free AI Time Audit for Freelancers | TimeReality",
    metaDescription: "Discover where your work hours actually go with AI. Get a productivity score, time breakdown, and action plan to reclaim lost hours. Try 3 free analyses.",
  },

  lemonSqueezy: {
    productId: process.env.LEMONSQUEEZY_PRODUCT_ID ?? "",
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID ?? "",
  },
};

export type SiteConfig = typeof siteConfig;
