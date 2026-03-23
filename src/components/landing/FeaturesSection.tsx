import { motion } from "framer-motion";
import { Sparkles, BarChart3, FileText, LayoutDashboard, Briefcase, Download } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "AI Resume Builder",
    desc: "Generate professional bullet points, optimize keywords, and craft compelling content with AI assistance.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "ATS Score Analysis",
    desc: "Get a detailed score with keyword gaps and actionable suggestions to beat applicant tracking systems.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Cover Letter Generator",
    desc: "Create tailored cover letters from your resume and job description in multiple tones.",
  },
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    title: "Resume Dashboard",
    desc: "Manage multiple resumes, duplicate templates, and tailor each one for different roles.",
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: "Job Tracker",
    desc: "Track applications, link resumes to jobs, and monitor your status from applied to hired.",
  },
  {
    icon: <Download className="h-5 w-5" />,
    title: "PDF Export",
    desc: "Download polished, ATS-friendly PDFs with professional templates and themes.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">Features</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Everything You Need to Land the Job</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          From AI-powered content to ATS analysis, ResumeLM handles every step of your job search.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group card-gradient rounded-2xl border border-border/40 p-7 hover:shadow-glow hover:border-primary/20 transition-all duration-300"
          >
            <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center text-accent-foreground mb-5 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
