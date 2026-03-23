import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Perfect for getting started",
    features: ["3 Resumes", "AI Bullet Points", "ATS Score", "PDF Export", "1 Cover Letter"],
    cta: "Get Started Free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    desc: "For serious job seekers",
    features: ["Unlimited Resumes", "Advanced AI Features", "Detailed ATS Analysis", "Unlimited Cover Letters", "Job Tracker", "Priority Support"],
    cta: "Upgrade to Pro",
    featured: true,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24 bg-muted/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">Pricing</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground mt-4">Start free. Upgrade when you're ready.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl border p-8 ${
              p.featured
                ? "border-primary/30 shadow-glow card-gradient"
                : "border-border/40 bg-card"
            }`}
          >
            {p.featured && (
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground mb-4">Most Popular</span>
            )}
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
            <div className="mt-5 mb-6">
              <span className="text-4xl font-extrabold">{p.price}</span>
              {p.period && <span className="text-muted-foreground">{p.period}</span>}
            </div>
            <ul className="space-y-3 mb-8">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant={p.featured ? "hero" : "hero-outline"} className="w-full py-5">
              {p.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
