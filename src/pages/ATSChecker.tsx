import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, FileText, Target, TrendingUp, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface ScoreResult {
  overall: number;
  sections: { label: string; score: number; icon: React.ReactNode }[];
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

const scoreColor = (s: number) =>
  s >= 80 ? "text-green-500" : s >= 60 ? "text-yellow-500" : "text-destructive";

const scoreBg = (s: number) =>
  s >= 80 ? "bg-green-500" : s >= 60 ? "bg-yellow-500" : "bg-destructive";

const ATSChecker = () => {
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description to analyze against.");
      return;
    }
    setLoading(true);

    // Simulated analysis — will be replaced with AI backend call
    setTimeout(() => {
      setResult({
        overall: 74,
        sections: [
          { label: "Keyword Match", score: 68, icon: <Target className="h-4 w-4" /> },
          { label: "Formatting", score: 90, icon: <FileText className="h-4 w-4" /> },
          { label: "Impact Statements", score: 65, icon: <TrendingUp className="h-4 w-4" /> },
          { label: "Readability", score: 82, icon: <Lightbulb className="h-4 w-4" /> },
        ],
        matchedKeywords: ["React", "TypeScript", "JavaScript", "REST API", "Git", "Agile", "CI/CD"],
        missingKeywords: ["Kubernetes", "AWS", "GraphQL", "Docker", "Terraform", "System Design"],
        suggestions: [
          "Add more quantifiable achievements (e.g., 'Improved load time by 40%')",
          "Include keywords like 'Kubernetes' and 'AWS' that appear in the job description",
          "Use stronger action verbs: 'Architected', 'Spearheaded', 'Orchestrated'",
          "Add a 'Technical Skills' section with explicit technology names",
          "Tailor your summary to mirror the job title and core requirements",
        ],
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">ATS Resume Checker</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Score your resume against a job description for ATS compatibility
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="space-y-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Analyze Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Select Resume</Label>
                  <Select value={resumeId} onValueChange={setResumeId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a resume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Software Engineer Resume</SelectItem>
                      <SelectItem value="2">Product Manager Resume</SelectItem>
                      <SelectItem value="3">Data Analyst Resume</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Job Description</Label>
                  <Textarea
                    placeholder="Paste the target job description here…"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={10}
                  />
                </div>
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handleAnalyze}
                  disabled={loading}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {loading ? "Analyzing…" : "Check ATS Score"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-muted-foreground"
                >
                  <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
                  <p className="font-medium">Scanning your resume…</p>
                  <p className="text-sm">Comparing keywords and structure against ATS standards</p>
                </motion.div>
              )}

              {!loading && !result && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-muted-foreground"
                >
                  <Target className="h-14 w-14 mb-3 opacity-20" />
                  <p className="font-medium">No analysis yet</p>
                  <p className="text-sm">Select a resume and paste a job description to get started</p>
                </motion.div>
              )}

              {!loading && result && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Overall Score */}
                  <Card className="border-border/50 overflow-hidden">
                    <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative h-28 w-28 flex-shrink-0">
                        <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                          <circle
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                            stroke={result.overall >= 80 ? "#22c55e" : result.overall >= 60 ? "#eab308" : "hsl(var(--destructive))"}
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={`${(result.overall / 100) * 327} 327`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-3xl font-bold ${scoreColor(result.overall)}`}>{result.overall}</span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Score</span>
                        </div>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-lg font-semibold">
                          {result.overall >= 80
                            ? "Great match! Your resume is ATS-ready."
                            : result.overall >= 60
                            ? "Good start — a few improvements will help."
                            : "Needs work — key gaps found."}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your resume matched {result.matchedKeywords.length} of{" "}
                          {result.matchedKeywords.length + result.missingKeywords.length} key terms from the job description.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Section Scores */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {result.sections.map((s) => (
                      <Card key={s.label} className="border-border/50">
                        <CardContent className="p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              {s.icon}
                              {s.label}
                            </div>
                            <span className={`text-sm font-bold ${scoreColor(s.score)}`}>{s.score}%</span>
                          </div>
                          <Progress value={s.score} className={`h-2 [&>div]:${scoreBg(s.score)}`} />
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Keywords */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Card className="border-border/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" /> Matched Keywords
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1.5">
                          {result.matchedKeywords.map((kw) => (
                            <span key={kw} className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-border/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-destructive" /> Missing Keywords
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1.5">
                          {result.missingKeywords.map((kw) => (
                            <span key={kw} className="text-xs bg-destructive/10 text-destructive px-2.5 py-1 rounded-full">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Suggestions */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" /> Improvement Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.suggestions.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="mt-0.5 h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-medium flex-shrink-0">
                              {i + 1}
                            </span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ATSChecker;
