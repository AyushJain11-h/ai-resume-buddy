import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Resumes Created" },
  { value: "89%", label: "Interview Rate" },
  { value: "4.9★", label: "User Rating" },
  { value: "15 min", label: "Average Setup" },
];

const StatsSection = () => (
  <section className="py-16 border-y border-border/50 bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-3xl md:text-4xl font-extrabold text-gradient">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
