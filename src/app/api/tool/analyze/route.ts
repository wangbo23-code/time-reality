import { NextRequest, NextResponse } from "next/server";

interface AnalyzeInput {
  description: string;
  workHours: string;
  role: string;
}

interface TimeBreakdown {
  category: string;
  hours: number;
  percentage: number;
}

interface TimeResult {
  productivityScore: number;
  totalWorkHours: number;
  timeBreakdown: TimeBreakdown[];
  wastedHours: number;
  topTimeSinks: string[];
  actionPlan: string[];
  verdict: string;
}

const SYSTEM_PROMPT = `You are a productivity analyst specializing in time management for freelancers and remote workers.

Given the user's description of their typical work day, analyze where their time actually goes. You MUST output ONLY valid JSON with this exact structure:

{
  "productivityScore": <number 0-100>,
  "totalWorkHours": <number of actual hours worked per day>,
  "timeBreakdown": [
    { "category": "<category name>", "hours": <number>, "percentage": <number> }
  ],
  "wastedHours": <estimated hours wasted per day>,
  "topTimeSinks": ["<time sink 1>", "<time sink 2>", "<time sink 3>", "<time sink 4>"],
  "verdict": "<1-2 sentence summary of their time situation>",
  "actionPlan": ["<specific action 1>", "<action 2>", "<action 3>", "<action 4>", "<action 5>"]
}

Guidelines:
- productivityScore: 80-100 = excellent, 60-79 = good, 40-59 = needs work, 0-39 = major issues
- timeBreakdown categories should include: Deep Work, Meetings, Email/Slack, Admin, Breaks, Context Switching, Social Media, Learning, and any other relevant categories from the description
- All hours in timeBreakdown should sum to totalWorkHours
- percentages should sum to 100
- wastedHours includes: unnecessary meetings, excessive email, social media, context switching overhead
- topTimeSinks: identify the 4 biggest productivity killers from their description
- actionPlan: give 5 specific, actionable changes they can make THIS WEEK (not generic advice)

Be direct and honest. If someone is wasting 3 hours a day on email and meetings, say so clearly.

ONLY output valid JSON. No markdown, no explanation outside the JSON.`;

export async function POST(req: NextRequest) {
  try {
    const input: AnalyzeInput = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(generateFallbackResult(input));
    }

    const model = process.env.AI_MODEL ?? "anthropic/claude-sonnet-4";

    const userPrompt = `Analyze the time allocation of this ${input.role}:

TARGET WORK HOURS PER DAY: ${input.workHours}

TYPICAL WORK DAY DESCRIPTION:
${input.description}

Map out where their time actually goes, identify wasted hours, and create an action plan.`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://timereality.forgetool.co",
        "X-Title": "TimeReality",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!res.ok) {
      console.error("OpenRouter error:", await res.text());
      return NextResponse.json(generateFallbackResult(input));
    }

    const json = await res.json();
    const text: string = json.choices?.[0]?.message?.content ?? "";
    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const result: TimeResult = JSON.parse(cleanText);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Analyze error:", err);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 },
    );
  }
}

/**
 * Simple rule-based fallback when AI is unavailable
 */
function generateFallbackResult(input: AnalyzeInput): TimeResult {
  const targetHours = parseFloat(input.workHours) || 8;
  const desc = input.description.toLowerCase();

  // Estimate time allocation from keywords
  const hasMeetings = desc.includes("meeting") || desc.includes("call");
  const hasEmail = desc.includes("email") || desc.includes("slack") || desc.includes("message");
  const hasSocialMedia = desc.includes("social media") || desc.includes("twitter") || desc.includes("instagram") || desc.includes("reddit");
  const hasAdmin = desc.includes("invoice") || desc.includes("admin") || desc.includes("project management");

  const meetingHours = hasMeetings ? 1.5 : 0.5;
  const emailHours = hasEmail ? 1.5 : 0.5;
  const socialHours = hasSocialMedia ? 1.0 : 0.3;
  const adminHours = hasAdmin ? 1.0 : 0.5;
  const breakHours = 0.5;
  const contextSwitchHours = 0.5;
  const deepWorkHours = Math.max(
    targetHours - meetingHours - emailHours - socialHours - adminHours - breakHours - contextSwitchHours,
    1,
  );

  const total = deepWorkHours + meetingHours + emailHours + socialHours + adminHours + breakHours + contextSwitchHours;
  const wastedHours = Math.round((socialHours + contextSwitchHours + Math.max(emailHours - 0.5, 0) + Math.max(meetingHours - 0.5, 0)) * 10) / 10;

  const pct = (h: number) => Math.round((h / total) * 100);

  const score = Math.round(Math.max(20, Math.min(85, (deepWorkHours / total) * 130 - socialHours * 10)));

  return {
    productivityScore: score,
    totalWorkHours: Math.round(total * 10) / 10,
    timeBreakdown: [
      { category: "Deep Work", hours: Math.round(deepWorkHours * 10) / 10, percentage: pct(deepWorkHours) },
      { category: "Meetings & Calls", hours: Math.round(meetingHours * 10) / 10, percentage: pct(meetingHours) },
      { category: "Email & Messaging", hours: Math.round(emailHours * 10) / 10, percentage: pct(emailHours) },
      { category: "Admin & Invoicing", hours: Math.round(adminHours * 10) / 10, percentage: pct(adminHours) },
      { category: "Social Media", hours: Math.round(socialHours * 10) / 10, percentage: pct(socialHours) },
      { category: "Context Switching", hours: Math.round(contextSwitchHours * 10) / 10, percentage: pct(contextSwitchHours) },
      { category: "Breaks", hours: Math.round(breakHours * 10) / 10, percentage: pct(breakHours) },
    ],
    wastedHours,
    topTimeSinks: [
      "Excessive email checking — batch to 2-3 times per day instead",
      "Context switching between tasks — group similar tasks together",
      "Meetings without clear agendas — require agendas before accepting",
      "Social media during work blocks — use app blockers during focus time",
    ],
    actionPlan: [
      "Block 2-3 hours of uninterrupted deep work every morning before checking email",
      "Set specific email/Slack check times: 9am, 12pm, and 4pm only",
      "Decline meetings without agendas — send this rule to all clients this week",
      "Use a website blocker (Cold Turkey, Freedom) during deep work blocks",
      "End each work day by planning tomorrow's top 3 priorities",
    ],
    verdict: `You're spending about ${deepWorkHours.toFixed(1)} hours on actual productive work out of ${total.toFixed(1)} total hours. That's ${pct(deepWorkHours)}% productivity — there's room for improvement.`,
  };
}
