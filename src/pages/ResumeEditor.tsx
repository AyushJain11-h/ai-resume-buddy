import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Sparkles, Download, Eye, Save, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  school: string;
  year: string;
}

const ResumeEditor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: 1, title: "", company: "", duration: "", description: "" },
  ]);
  const [educations, setEducations] = useState<Education[]>([
    { id: 1, degree: "", school: "", year: "" },
  ]);

  const addExperience = () =>
    setExperiences([...experiences, { id: Date.now(), title: "", company: "", duration: "", description: "" }]);

  const removeExperience = (id: number) =>
    setExperiences(experiences.filter((e) => e.id !== id));

  const updateExperience = (id: number, field: keyof Experience, value: string) =>
    setExperiences(experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const addEducation = () =>
    setEducations([...educations, { id: Date.now(), degree: "", school: "", year: "" }]);

  const removeEducation = (id: number) =>
    setEducations(educations.filter((e) => e.id !== id));

  const updateEducation = (id: number, field: keyof Education, value: string) =>
    setEducations(educations.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Resume Editor</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-1" /> Preview</Button>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export PDF</Button>
            <Button variant="hero" size="sm"><Save className="h-4 w-4 mr-1" /> Save</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="space-y-4">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label>Full Name</Label>
                        <Input placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Email</Label>
                        <Input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Phone</Label>
                      <Input placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="flex items-center justify-between">
                        Professional Summary
                        <Button variant="ghost" size="sm" className="text-xs text-primary h-auto p-0">
                          <Sparkles className="h-3 w-3 mr-1" /> AI Generate
                        </Button>
                      </Label>
                      <Textarea placeholder="Brief overview of your professional background..." value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card className="border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Work Experience</CardTitle>
                    <Button variant="outline" size="sm" onClick={addExperience}>
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experiences.map((exp, idx) => (
                      <div key={exp.id} className="space-y-3 p-4 rounded-lg border border-border/50 relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <GripVertical className="h-4 w-4 cursor-grab" />
                            <span className="text-xs font-medium">Position {idx + 1}</span>
                          </div>
                          {experiences.length > 1 && (
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeExperience(exp.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label>Job Title</Label>
                            <Input placeholder="Software Engineer" value={exp.title} onChange={(e) => updateExperience(exp.id, "title", e.target.value)} />
                          </div>
                          <div className="space-y-1.5">
                            <Label>Company</Label>
                            <Input placeholder="Acme Inc." value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label>Duration</Label>
                          <Input placeholder="Jan 2022 - Present" value={exp.duration} onChange={(e) => updateExperience(exp.id, "duration", e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="flex items-center justify-between">
                            Description
                            <Button variant="ghost" size="sm" className="text-xs text-primary h-auto p-0">
                              <Sparkles className="h-3 w-3 mr-1" /> AI Improve
                            </Button>
                          </Label>
                          <Textarea placeholder="Describe your responsibilities and achievements..." value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} rows={3} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education">
                <Card className="border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Education</CardTitle>
                    <Button variant="outline" size="sm" onClick={addEducation}>
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {educations.map((edu, idx) => (
                      <div key={edu.id} className="space-y-3 p-4 rounded-lg border border-border/50 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground">Education {idx + 1}</span>
                          {educations.length > 1 && (
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeEducation(edu.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label>Degree</Label>
                            <Input placeholder="B.S. Computer Science" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} />
                          </div>
                          <div className="space-y-1.5">
                            <Label>School</Label>
                            <Input placeholder="MIT" value={edu.school} onChange={(e) => updateEducation(edu.id, "school", e.target.value)} />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label>Year</Label>
                          <Input placeholder="2018 - 2022" value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      Skills
                      <Button variant="ghost" size="sm" className="text-xs text-primary">
                        <Sparkles className="h-3 w-3 mr-1" /> AI Suggest
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Textarea placeholder="React, TypeScript, Node.js, Python, SQL..." value={skills} onChange={(e) => setSkills(e.target.value)} rows={4} />
                    <p className="text-xs text-muted-foreground">Separate skills with commas. AI will suggest relevant skills based on your experience.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Live Preview */}
          <div className="hidden lg:block">
            <Card className="border-border/50 sticky top-4">
              <CardHeader className="border-b border-border/50 pb-3">
                <CardTitle className="text-base">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-6 min-h-[600px]">
                <div className="space-y-4">
                  <div className="text-center border-b border-border/50 pb-4">
                    <h2 className="text-xl font-bold">{name || "Your Name"}</h2>
                    <p className="text-sm text-muted-foreground">
                      {[email, phone].filter(Boolean).join(" • ") || "email@example.com • (555) 000-0000"}
                    </p>
                  </div>
                  {summary && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-1">Summary</h3>
                      <p className="text-sm text-muted-foreground">{summary}</p>
                    </div>
                  )}
                  {experiences.some((e) => e.title) && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Experience</h3>
                      {experiences.filter((e) => e.title).map((exp) => (
                        <div key={exp.id} className="mb-3">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">{exp.title}</p>
                            <p className="text-xs text-muted-foreground">{exp.duration}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{exp.company}</p>
                          {exp.description && <p className="text-xs mt-1">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                  {educations.some((e) => e.degree) && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Education</h3>
                      {educations.filter((e) => e.degree).map((edu) => (
                        <div key={edu.id} className="mb-2">
                          <p className="text-sm font-medium">{edu.degree}</p>
                          <p className="text-xs text-muted-foreground">{edu.school} • {edu.year}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {skills && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.split(",").map((s, i) => s.trim() && (
                          <span key={i} className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">{s.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ResumeEditor;
