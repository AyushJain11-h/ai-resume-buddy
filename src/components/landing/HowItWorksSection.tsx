import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Add Your Details", desc: "Enter your experience, education, and skills—or import from LinkedIn." },
  { num: "02", title: "AI Enhances It", desc: "Our AI rewrites bullet points, adds keywords, and optimizes for ATS." },
  { num: "03", title: "Review & Score", desc: "See your ATS score, fix keyword gaps, and preview your resume in real-time." },
  { num: "04", title: "Download & Apply", desc: "Export a polished PDF and start applying with confidence." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 bg-muted/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">How It Works</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">From Blank Page to Interview</h2>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="text-center relative"
          >
            <div className="text-5xl font-extrabold text-gradient opacity-30 mb-4">{s.num}</div>
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 -right-4 w-8 border-t-2 border-dashed border-border" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
