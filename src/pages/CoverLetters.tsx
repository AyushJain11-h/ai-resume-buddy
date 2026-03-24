import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Copy, Download, FileEdit, Plus } from "lucide-react";
import { motion } from "framer-motion";

const savedLetters = [
  { id: 1, title: "Google - SWE Cover Letter", created: "2 days ago" },
  { id: 2, title: "Stripe - Full Stack Cover Letter", created: "1 week ago" },
];

const CoverLetters = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState("professional");
  const [generated, setGenerated] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGenerated(
        `Dear Hiring Manager,\n\nI am writing to express my strong interest in the position at your company. With my background in software engineering and passion for building impactful products, I believe I would be a valuable addition to your team.\n\nMy experience includes developing scalable web applications, collaborating with cross-functional teams, and delivering high-quality solutions that drive business results.\n\nI am excited about the opportunity to contribute to your mission and would welcome the chance to discuss how my skills align with your needs.\n\nBest regards,\n[Your Name]`
      );
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Cover Letter Generator</h1>
          <p className="text-muted-foreground text-sm mt-1">Generate tailored cover letters with AI</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Generate New</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Select Resume</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Choose a resume" /></SelectTrigger>
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
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={6}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="confident">Confident</SelectItem>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="hero" className="w-full" onClick={handleGenerate} disabled={isGenerating}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate Cover Letter"}
                </Button>
              </CardContent>
            </Card>

            {/* Saved Letters */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Saved Letters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {savedLetters.map((l) => (
                  <div key={l.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FileEdit className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{l.title}</p>
                        <p className="text-xs text-muted-foreground">{l.created}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Generated Cover Letter</CardTitle>
                {generated && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Copy className="h-3.5 w-3.5 mr-1" /> Copy</Button>
                    <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1" /> Export</Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {generated ? (
                  <Textarea
                    value={generated}
                    onChange={(e) => setGenerated(e.target.value)}
                    className="min-h-[400px] resize-none"
                  />
                ) : (
                  <div className="min-h-[400px] flex flex-col items-center justify-center text-muted-foreground">
                    <FileEdit className="h-12 w-12 mb-3 opacity-30" />
                    <p className="font-medium">No cover letter generated yet</p>
                    <p className="text-sm">Paste a job description and click generate</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default CoverLetters;
