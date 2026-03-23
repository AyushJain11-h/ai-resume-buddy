import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FileText, BarChart3 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-hero pt-32 pb-20 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-accent mb-8">
              <Sparkles className="h-3.5 w-3.5 text-accent-foreground" />
              <span className="text-xs font-medium text-accent-foreground">AI-Powered Resume Builder</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
          >
            Build Resumes That
            <br />
            <span className="text-gradient">Get You Hired</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Create ATS-optimized resumes and tailored cover letters in minutes. 
            Powered by AI, designed for results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="lg" className="text-base px-8 py-6">
              Build Your Resume Free
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6">
              See How It Works
            </Button>
          </motion.div>
        </div>

        {/* Preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border border-border/60 shadow-lg overflow-hidden bg-card">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">ResumeLM — Dashboard</span>
            </div>
            <div className="p-8 grid md:grid-cols-3 gap-6">
              <DashCard icon={<FileText className="h-5 w-5 text-accent-foreground" />} label="Resumes Created" value="3" />
              <DashCard icon={<BarChart3 className="h-5 w-5 text-accent-foreground" />} label="ATS Score" value="92/100" />
              <DashCard icon={<Sparkles className="h-5 w-5 text-accent-foreground" />} label="AI Suggestions" value="14" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const DashCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="card-gradient rounded-xl p-5 border border-border/40">
    <div className="flex items-center gap-3 mb-3">
      <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">{icon}</div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default HeroSection;
