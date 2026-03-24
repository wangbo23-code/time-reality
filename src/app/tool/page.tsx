"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Paywall } from "@/components/layout/paywall";
import { Sparkles, Loader2, Clock, AlertTriangle, TrendingUp } from "lucide-react";

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

export default function ToolPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Time Reality Check</h1>
      <p className="text-muted-foreground mb-6">
        Describe your typical work week and discover where your hours actually go.
      </p>

      <Paywall featureName="time analysis">
        <ToolForm />
      </Paywall>
    </div>
  );
}

function ToolForm() {
  const { data: session } = useSession();
  const [workHours, setWorkHours] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [result, setResult] = useState<TimeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!description.trim() || !session?.user?.email) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      // Consume a credit
      const creditRes = await fetch("/api/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      });

      if (!creditRes.ok) {
        const err = await creditRes.json();
        setError(err.error ?? "Failed to use credit");
        return;
      }

      // Call AI analysis
      const res = await fetch("/api/tool/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          workHours: workHours || "8",
          role: role || "freelancer",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error ?? "Analysis failed");
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Describe Your Typical Work Day</CardTitle>
          <CardDescription>
            Be honest — the more accurate your description, the better the analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Input
                id="role"
                placeholder="e.g., Freelance designer, Remote developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours">Target Work Hours / Day</Label>
              <Input
                id="hours"
                type="number"
                placeholder="8"
                value={workHours}
                onChange={(e) => setWorkHours(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Your Typical Work Day</Label>
            <Textarea
              id="description"
              placeholder="Example: I wake up at 8am, check emails and Slack for about 30 minutes. Then I try to do focused design work but get interrupted by client calls. Usually have 2-3 meetings that last 30-60 min each. I spend a lot of time on admin tasks like invoicing and project management. I take a lunch break around 1pm. Afternoons are more focused but I often get distracted by social media. I usually stop around 6pm but sometimes check emails in the evening..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading || !description.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing your time...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Analyze My Time (1 credit)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <p className="text-red-600 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && <TimeResultDisplay result={result} />}
    </div>
  );
}

function TimeResultDisplay({ result }: { result: TimeResult }) {
  const scoreColor =
    result.productivityScore >= 70
      ? "text-green-600"
      : result.productivityScore >= 40
        ? "text-yellow-600"
        : "text-red-600";

  const scoreBorder =
    result.productivityScore >= 70
      ? "border-green-200"
      : result.productivityScore >= 40
        ? "border-yellow-200"
        : "border-red-200";

  return (
    <div className="space-y-4">
      {/* Productivity Score */}
      <Card className={scoreBorder}>
        <CardContent className="pt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Your Productivity Score</p>
          <p className={`text-5xl font-bold ${scoreColor}`}>
            {result.productivityScore}
            <span className="text-lg text-muted-foreground">/100</span>
          </p>
          <p className="text-muted-foreground mt-2">{result.verdict}</p>
        </CardContent>
      </Card>

      {/* Key Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="h-5 w-5 mx-auto mb-1 text-blue-500" />
            <p className="text-2xl font-bold">{result.totalWorkHours}h</p>
            <p className="text-xs text-muted-foreground">Total work hours/day</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-red-500" />
            <p className="text-2xl font-bold text-red-600">{result.wastedHours}h</p>
            <p className="text-xs text-muted-foreground">Wasted hours/day</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-500" />
            <p className="text-2xl font-bold text-green-600">
              {(result.totalWorkHours - result.wastedHours).toFixed(1)}h
            </p>
            <p className="text-xs text-muted-foreground">Productive hours/day</p>
          </CardContent>
        </Card>
      </div>

      {/* Time Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Time Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.timeBreakdown.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.category}</span>
                  <span className="text-muted-foreground">
                    {item.hours}h ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Time Sinks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            Top Time Sinks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.topTimeSinks.map((sink, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Badge variant="destructive" className="shrink-0 mt-0.5">
                  {i + 1}
                </Badge>
                {sink}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            Your Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.actionPlan.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-green-500 shrink-0">✓</span>
                {action}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center">
        This analysis is AI-generated based on your self-reported schedule. Actual time allocation may vary.
        Use as a self-reflection tool, not a precise measurement.
      </p>
    </div>
  );
}
