/**
 * Site configuration — TimeReality
 *
 * GEO-OPTIMIZED TEMPLATE
 * Fields marked [GEO] are designed for AI search optimization.
 */
export const siteConfig = {
  name: "TimeReality",
  // [GEO] Complete, self-contained definition sentence
  description:
    "TimeReality is an AI time audit tool that helps freelancers and remote workers discover where their work hours actually go by analyzing daily routines, identifying hidden time sinks, and generating a concrete plan to reclaim lost productivity.",
  // [GEO] Deployed URL
  url: "https://time-reality.vercel.app",
  contactEmail: "support@forgetool.co",

  // [GEO] Organization info for Schema markup
  organization: {
    name: "ForgeTools",
    url: "https://forgetool.co",
    sameAs: [] as string[],
  },

  // [GEO] Publication dates for Article Schema
  dates: {
    published: "2025-01-15",
  },

  hero: {
    title: "Where Do Your Work Hours Actually Go? AI Finds Out.",
    subtitle:
      "Describe your typical work week — meetings, deep work, admin, breaks. Our AI reveals your real time allocation, hidden productivity leaks, and a concrete plan to reclaim lost hours.",
    // [GEO] BLUF
    bluf: "TimeReality is an AI-powered time audit tool for freelancers, remote workers, and solopreneurs who feel busy but not productive. Describe your typical work day in natural language, and the AI categorizes every hour, identifies hidden time sinks like context switching and unnecessary meetings, and delivers a productivity score with a specific plan to reclaim wasted hours.",
    cta: "Analyze My Time →",
  },

  // [GEO] Key use cases
  useCases: [
    {
      problem: "You work 50+ hours a week but your output does not reflect the effort",
      solution: "TimeReality reveals the hidden time sinks eating your productive hours",
      detail: "The AI identifies patterns you do not notice — context switching costs, meeting overload, admin creep, and unfocused work blocks — then quantifies exactly how many hours each one costs you per week.",
    },
    {
      problem: "You bill by the hour but suspect you are not tracking time accurately",
      solution: "TimeReality maps your actual time allocation versus what you think you spend",
      detail: "Most freelancers overestimate their billable hours and underestimate admin time. The analysis shows the real split between client work, admin, marketing, and downtime.",
    },
    {
      problem: "You cannot find time for deep work because your day is fragmented",
      solution: "TimeReality identifies fragmentation patterns and recommends schedule restructuring",
      detail: "The report shows where context switches happen, how long your focused blocks actually last, and suggests a restructured schedule that protects deep work time.",
    },
    {
      problem: "You want to be more productive but do not know where to start optimizing",
      solution: "TimeReality gives you a prioritized action plan based on your biggest time leaks",
      detail: "Instead of generic productivity tips, you get changes ranked by potential time savings — so you fix the biggest problems first and see results immediately.",
    },
  ] as { problem: string; solution: string; detail: string }[],

  // [GEO] Differentiator
  differentiator: {
    title: "What Makes TimeReality Different",
    content:
      "Unlike time tracking apps that record what you do, TimeReality analyzes your patterns to reveal what you do not see — hidden time sinks, context switching costs, and optimization opportunities that passive tracking never surfaces.",
    comparisons: [
      { vs: "Toggl or Clockify", difference: "Time trackers record hours after the fact; TimeReality analyzes your routine to find hidden inefficiencies and recommends specific changes to your schedule." },
      { vs: "RescueTime", difference: "RescueTime monitors app usage on your computer; TimeReality analyzes your entire work pattern including meetings, breaks, and offline tasks to give a complete productivity picture." },
      { vs: "Self-assessment", difference: "People consistently misjudge their time use by 30-50%; TimeReality uses AI pattern analysis to produce an objective breakdown of where your hours actually go." },
    ] as { vs: string; difference: string }[],
  },

  howItWorks: [
    {
      step: "1",
      title: "Describe your work week",
      description:
        'Tell us about your typical work day in natural language. For example: "I check email for 30 min, then have a team standup, work on client projects until lunch, spend the afternoon on calls and admin, then do some marketing in the evening".',
    },
    {
      step: "2",
      title: "AI maps your time",
      description:
        "Our AI categorizes every hour into productive work, admin, meetings, breaks, and wasted time — then identifies hidden time sinks like context switching and notification interruptions.",
    },
    {
      step: "3",
      title: "Get your action plan",
      description:
        "Receive a productivity score (0-100), visual time breakdown by category, your top time sinks with hours lost per week, and a prioritized list of changes to reclaim those hours.",
    },
  ] as { step: string; title: string; description: string }[],

  faqs: [
    {
      q: "What information do I need to provide?",
      a: "Describe your typical work day in natural language — what you do from morning to evening, including meetings, focused work, admin tasks, and breaks. The more detail you include, the more accurate the analysis.",
    },
    {
      q: "How accurate is the time analysis?",
      a: "The AI identifies patterns from your description and is most accurate when you are honest about how you actually spend time, not how you wish you did. It catches inefficiencies most people overlook.",
    },
    {
      q: "Who is TimeReality for?",
      a: "Freelancers, remote workers, solopreneurs, and anyone who feels busy but not productive. It is especially useful if you bill by the hour or need to maximize limited work time.",
    },
    {
      q: "What is included in the report?",
      a: "A productivity score (0-100), visual time breakdown by category, top time sinks identified, estimated wasted hours per week, and a personalized action plan prioritized by potential time savings.",
    },
    {
      q: "Is it free to try?",
      a: "You get 3 free time analyses when you sign up with no credit card required. After that, purchase 50 credits for $5 (one-time). Each credit generates one full analysis.",
    },
    {
      q: "How is this different from time tracking apps?",
      a: "Time trackers record what you do passively. TimeReality actively analyzes your patterns to reveal what you do not see — hidden time sinks, context switching costs, and specific optimization opportunities.",
    },
    {
      q: "How long do credits last?",
      a: "Credits never expire. Once purchased, your 50 credits are available until used. There are no monthly fees or subscriptions.",
    },
    {
      q: "Is my data safe?",
      a: "We do not store your schedule details or analysis results after your session ends. Your data is processed in real time and not retained. See our Privacy Policy for details.",
    },
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
    keywords: [
      "time tracker for freelancers",
      "where does my time go",
      "productivity analyzer",
      "time audit tool",
      "work time analysis",
      "freelancer productivity",
      "time management AI",
    ],
    metaTitle:
      "Where Does Your Time Go? Free AI Time Audit for Freelancers | TimeReality",
    metaDescription:
      "Discover where your work hours actually go with AI. Get a productivity score, time breakdown, and action plan to reclaim lost hours. Try 3 free analyses.",
  },

  // [GEO] External authority links
  authorityLinks: [
    { label: "Cal Newport: Deep Work", url: "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/" },
    { label: "Harvard Business Review: Time Management", url: "https://hbr.org/topic/time-management" },
    { label: "American Psychological Association: Multitasking", url: "https://www.apa.org/topics/research/multitasking" },
  ] as { label: string; url: string }[],

  lemonSqueezy: {
    productId: process.env.LEMONSQUEEZY_PRODUCT_ID ?? "",
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID ?? "",
  },
};

export type SiteConfig = typeof siteConfig;
