import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface Job {
  id: number;
  company: string;
  role: string;
  status: string;
  resume: string;
  date: string;
}

const initialJobs: Job[] = [
  { id: 1, company: "Google", role: "Software Engineer", status: "Interview", resume: "SWE Resume", date: "2024-01-15" },
  { id: 2, company: "Meta", role: "Product Manager", status: "Applied", resume: "PM Resume", date: "2024-01-12" },
  { id: 3, company: "Stripe", role: "Full Stack Dev", status: "Applied", resume: "SWE Resume", date: "2024-01-10" },
  { id: 4, company: "Airbnb", role: "Frontend Engineer", status: "Rejected", resume: "SWE Resume", date: "2024-01-08" },
  { id: 5, company: "Netflix", role: "Senior SWE", status: "Offer", resume: "SWE Resume", date: "2024-01-05" },
];

const statusColors: Record<string, string> = {
  Applied: "bg-muted text-muted-foreground",
  Interview: "bg-accent text-accent-foreground",
  Offer: "bg-primary/10 text-primary",
  Rejected: "bg-destructive/10 text-destructive",
};

const JobTracker = () => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newJob, setNewJob] = useState({ company: "", role: "", status: "Applied", resume: "" });
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = jobs.filter((j) => {
    const matchSearch = j.company.toLowerCase().includes(search.toLowerCase()) || j.role.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || j.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const addJob = () => {
    if (!newJob.company || !newJob.role) return;
    setJobs([{ id: Date.now(), ...newJob, date: new Date().toISOString().split("T")[0] }, ...jobs]);
    setNewJob({ company: "", role: "", status: "Applied", resume: "" });
    setDialogOpen(false);
  };

  const statusCounts = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "Applied").length,
    interview: jobs.filter((j) => j.status === "Interview").length,
    offer: jobs.filter((j) => j.status === "Offer").length,
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Job Tracker</h1>
            <p className="text-muted-foreground text-sm mt-1">Track your job applications in one place</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="sm"><Plus className="h-4 w-4 mr-1" /> Add Job</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Job Application</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label>Company</Label>
                  <Input placeholder="e.g. Google" value={newJob.company} onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Role</Label>
                  <Input placeholder="e.g. Software Engineer" value={newJob.role} onChange={(e) => setNewJob({ ...newJob, role: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Status</Label>
                  <Select value={newJob.status} onValueChange={(v) => setNewJob({ ...newJob, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Applied">Applied</SelectItem>
                      <SelectItem value="Interview">Interview</SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Linked Resume</Label>
                  <Select value={newJob.resume} onValueChange={(v) => setNewJob({ ...newJob, resume: v })}>
                    <SelectTrigger><SelectValue placeholder="Select resume" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SWE Resume">SWE Resume</SelectItem>
                      <SelectItem value="PM Resume">PM Resume</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="hero" className="w-full" onClick={addJob}>Add Application</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total", value: statusCounts.total },
            { label: "Applied", value: statusCounts.applied },
            { label: "Interviews", value: statusCounts.interview },
            { label: "Offers", value: statusCounts.offer },
          ].map((s) => (
            <Card key={s.label} className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search jobs..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card className="border-border/50">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((j) => (
                  <TableRow key={j.id}>
                    <TableCell className="font-medium">{j.company}</TableCell>
                    <TableCell>{j.role}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[j.status] || ""}`}>
                        {j.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{j.resume}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{j.date}</TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No jobs found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default JobTracker;
