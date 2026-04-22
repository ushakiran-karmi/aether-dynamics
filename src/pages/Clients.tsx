import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const clients = [
  "Aurora", "Verse", "Helio", "Lumen", "Nova", "Atlas", "Pulse", "Drift",
  "Kite", "Orbit", "Forma", "Nimbus", "Halo", "Rune", "Cinder", "Vela",
];

const testimonials = [
  { quote: "Working with Nebula is what every founder hopes for: clarity, taste, and a team that actually ships.", name: "Sarah Lin", role: "CPO, Aurora Finance" },
  { quote: "The motion language they built for us became the brand. Our customers literally tweet about the scroll.", name: "Diego Marín", role: "CEO, Verse Studio" },
  { quote: "Three sprints in, our investors asked who designed the product. Nebula. The answer is always Nebula.", name: "Aisha Khan", role: "Founder, Helio" },
];

const Logo = ({ name }: { name: string }) => (
  <div className="h-20 grid place-items-center rounded-2xl border border-border/60 bg-card/30 hover:border-primary/60 hover:bg-card/60 transition-colors group">
    <span className="font-display text-2xl tracking-tight text-muted-foreground group-hover:text-gradient transition-colors">
      {name}
    </span>
  </div>
);

const Clients = () => {
  const row = [...clients, ...clients];
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <section className="relative pt-40 pb-20">
        <div className="absolute inset-0 bg-hero-glow -z-10" />
        <div className="absolute inset-0 grid-bg opacity-30 -z-10" />
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-widest text-secondary">
            Clients
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1] max-w-5xl"
          >
            In good <span className="text-gradient">company</span>.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground">
            We partner with founders, fast-growing teams and global brands across fintech, health, hospitality and consumer.
          </motion.p>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-10 overflow-hidden border-y border-border/60">
        <div className="flex gap-4 animate-marquee w-max">
          {row.map((c, i) => (
            <div key={i} className="px-10 py-6 font-display text-3xl md:text-5xl text-muted-foreground/60 hover:text-gradient transition-colors">
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* Logo grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <div className="text-xs uppercase tracking-widest text-secondary">Selected partners</div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-semibold">
              A few of our <span className="text-gradient">favorites</span>.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {clients.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <Logo name={c} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <div className="text-xs uppercase tracking-widest text-secondary">Words from clients</div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-semibold max-w-3xl">
              The work speaks. <span className="text-gradient">So do they</span>.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="p-7 rounded-2xl glass border border-border/60"
              >
                <Quote className="text-primary opacity-60" />
                <p className="mt-4 text-base leading-relaxed">{t.quote}</p>
                <footer className="mt-6 text-sm">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Clients;