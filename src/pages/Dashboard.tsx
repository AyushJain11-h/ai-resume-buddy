import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, TrendingUp, Plus, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { label: "Resumes", value: "3", icon: FileText, color: "text-primary" },
  { label: "Applications", value: "12", icon: Briefcase, color: "text-accent-foreground" },
  { label: "Avg. Score", value: "87", icon: TrendingUp, color: "text-primary" },
  { label: "Interviews", value: "4", icon: Star, color: "text-accent-foreground" },
];

const recentResumes = [
  { id: 1, title: "Software Engineer Resume", score: 92, updated: "2 hours ago" },
  { id: 2, title: "Product Manager Resume", score: 78, updated: "1 day ago" },
  { id: 3, title: "Data Analyst Resume", score: 85, updated: "3 days ago" },
];

const recentJobs = [
  { id: 1, company: "Google", role: "Software Engineer", status: "Interview" },
  { id: 2, company: "Meta", role: "Product Manager", status: "Applied" },
  { id: 3, company: "Stripe", role: "Full Stack Dev", status: "Applied" },
];

const Dashboard = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome back 👋</h1>
          <p className="text-muted-foreground mt-1">Here's an overview of your resume activity.</p>
        </div>
        <Link to="/dashboard/resumes/new">
          <Button variant="hero" size="sm"><Plus className="h-4 w-4 mr-1" /> New Resume</Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="card-gradient border-border/50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Resumes */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Resumes</CardTitle>
            <Link to="/dashboard/resumes" className="text-sm text-primary hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentResumes.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                    <FileText className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{r.updated}</p>
                  </div>
                </div>
                <div className="text-sm font-semibold text-primary">{r.score}/100</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Applications</CardTitle>
            <Link to="/dashboard/jobs" className="text-sm text-primary hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentJobs.map((j) => (
              <div key={j.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium">{j.role}</p>
                  <p className="text-xs text-muted-foreground">{j.company}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  j.status === "Interview" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {j.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  </DashboardLayout>
);

export default Dashboard;
