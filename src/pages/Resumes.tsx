import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, MoreVertical, Copy, Trash2, Edit, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const resumes = [
  { id: 1, title: "Software Engineer Resume", score: 92, updated: "2 hours ago", template: "Modern" },
  { id: 2, title: "Product Manager Resume", score: 78, updated: "1 day ago", template: "Classic" },
  { id: 3, title: "Data Analyst Resume", score: 85, updated: "3 days ago", template: "Minimal" },
  { id: 4, title: "UX Designer Resume", score: 70, updated: "1 week ago", template: "Creative" },
];

const Resumes = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Resumes</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and create tailored resumes</p>
        </div>
        <Link to="/dashboard/resumes/new">
          <Button variant="hero" size="sm"><Plus className="h-4 w-4 mr-1" /> Create Resume</Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* New Resume Card */}
        <Link to="/dashboard/resumes/new">
          <Card className="border-dashed border-2 border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-muted-foreground hover:text-primary transition-colors">
              <Plus className="h-10 w-10 mb-2" />
              <p className="font-medium">Create New Resume</p>
            </CardContent>
          </Card>
        </Link>

        {resumes.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border-border/50 hover:shadow-md transition-all group">
              <CardContent className="p-0">
                {/* Preview Area */}
                <div className="h-32 bg-muted/30 border-b border-border/50 flex items-center justify-center relative">
                  <FileText className="h-12 w-12 text-muted-foreground/30" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem><Copy className="h-3.5 w-3.5 mr-2" /> Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="h-3.5 w-3.5 mr-2" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm">{r.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{r.updated}</span>
                    <div className="flex items-center gap-1 text-xs font-medium text-primary">
                      <Star className="h-3 w-3" /> {r.score}/100
                    </div>
                  </div>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{r.template}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </DashboardLayout>
);

export default Resumes;
