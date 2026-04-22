import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Brush, Code2, Cpu, Layers, Sparkles, Wand2 } from "lucide-react";

const services = [
  { slug: "brand", icon: Sparkles, title: "Brand & Identity", desc: "Naming, visual systems, logos and guidelines for ambitious teams.", tags: ["Strategy", "Logo", "System"] },
  { slug: "web", icon: Layers, title: "Web Design", desc: "Editorial, immersive websites with art-directed sections and motion.", tags: ["UX", "UI", "Art Direction"] },
  { slug: "dev", icon: Code2, title: "Development", desc: "React, Next.js, headless CMS, and high-performance e-commerce.", tags: ["Next.js", "Headless", "DX"] },
  { slug: "motion", icon: Wand2, title: "Motion & 3D", desc: "WebGL, Three.js, shaders and scroll-driven storytelling.", tags: ["GSAP", "R3F", "GLSL"] },
  { slug: "product", icon: Cpu, title: "Product Design", desc: "Dashboards, SaaS apps and data-rich interfaces that feel effortless.", tags: ["SaaS", "Dashboards"] },
  { slug: "art", icon: Brush, title: "Art Direction", desc: "Photography, type and visual languages that make brands unmistakable.", tags: ["Type", "Photo", "Color"] },
];

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative will-change-transform"
    >
      {children}
    </motion.div>
  );
};

const Services = () => {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-40 pb-20">
        <div className="absolute inset-0 bg-hero-glow -z-10" />
        <div className="absolute inset-0 grid-bg opacity-30 -z-10" />
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-widest text-secondary">
            Services
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1] max-w-5xl"
          >
            End-to-end <span className="text-gradient">digital craft</span>.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground">
            One studio, six disciplines. We embed with your team and deliver from strategy through to a polished, performant launch.
          </motion.p>
        </div>
      </section>

      {/* GRID */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
            >
              <TiltCard>
                <Link
                  to={`/services#${s.slug}`}
                  className="group relative block p-8 rounded-3xl border border-border/70 bg-card/40 backdrop-blur-sm hover:border-primary/60 transition-colors overflow-hidden"
                >
                  <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                       style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), hsl(var(--primary)/0.15), transparent 60%)" }} />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div className="h-12 w-12 grid place-items-center rounded-xl bg-gradient-primary text-background shadow-glow group-hover:scale-110 transition-transform">
                        <s.icon size={20} />
                      </div>
                      <ArrowUpRight className="opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
                    </div>
                    <h3 className="mt-8 font-display text-2xl md:text-3xl">{s.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full text-[11px] uppercase tracking-widest border border-border/70 text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative py-32 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <div className="text-xs uppercase tracking-widest text-secondary">How we deliver</div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-semibold max-w-3xl">
              A four-step <span className="text-gradient">delivery model</span>.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {["Discover","Design","Build","Launch"].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl glass border border-border/60"
              >
                <div className="font-mono text-secondary text-sm">0{i+1}</div>
                <div className="mt-2 font-display text-2xl">{step}</div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {[
                    "Workshops, audits and a clear strategy doc with measurable goals.",
                    "Brand systems, art direction and high-fidelity prototypes.",
                    "Production-grade engineering with motion and 3D where it counts.",
                    "QA, performance, analytics — and a partnership that continues."
                  ][i]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;