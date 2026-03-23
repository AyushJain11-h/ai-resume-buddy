import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah K.",
    role: "Software Engineer",
    text: "ResumeLM helped me tailor my resume for every application. I landed 3 interviews in the first week!",
  },
  {
    name: "Marcus L.",
    role: "Product Manager",
    text: "The ATS scoring feature is a game-changer. I finally understood why my resume was getting filtered out.",
  },
  {
    name: "Priya R.",
    role: "Data Analyst",
    text: "The AI-generated cover letters saved me hours. Every letter felt personal and on-point.",
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">Testimonials</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Loved by Job Seekers</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-gradient rounded-2xl border border-border/40 p-7"
          >
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
            <div>
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
