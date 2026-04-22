import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Heart, Rocket, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "2018", title: "Studio founded", text: "Two friends, one laptop and a love for craft start Nebula in a Berlin loft." },
  { year: "2020", title: "First Awwwards", text: "Our work for a fintech startup wins SOTD and puts us on the global map." },
  { year: "2022", title: "Motion division", text: "We launch a dedicated motion + 3D team to push interactive storytelling." },
  { year: "2024", title: "120 projects", text: "Crossed 120 shipped projects across 18 countries with a team of 22." },
  { year: "2025", title: "Nebula Labs", text: "Open-sourcing tools, shaders and prototypes the studio relies on every day." },
];

const values = [
  { icon: Sparkles, title: "Craft over volume", text: "Fewer projects, deeper focus, sharper outcomes." },
  { icon: Heart, title: "Generous partnership", text: "We treat your business like our own — long after launch." },
  { icon: Rocket, title: "Bias for momentum", text: "Decisions in days, not weeks. Ship, learn, refine." },
  { icon: Compass, title: "Strong points of view", text: "Opinions, informed by research and tested by motion." },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -160]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((el) => {
        gsap.fromTo(
          el,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
      gsap.to(".tl-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".tl-track", start: "top center", end: "bottom center", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section ref={ref} className="relative pt-40 pb-24">
        <motion.div style={{ y }} className="absolute -z-10 inset-0 bg-hero-glow" />
        <div className="absolute inset-0 grid-bg opacity-30 -z-10" />
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 glass text-xs uppercase tracking-widest text-muted-foreground"
          >
            About Nebula
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
            className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1] max-w-5xl"
          >
            A small studio with a <span className="text-gradient">big point of view</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-8 text-lg text-muted-foreground max-w-2xl"
          >
            We're 22 designers, engineers and motion artists obsessed with what happens when craft meets code. We build digital experiences that look beautiful, move beautifully, and ship on time.
          </motion.p>
        </div>
      </section>

      {/* PARALLAX IMAGE STRIP */}
      <section className="relative py-12 overflow-hidden">
        <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto px-6">
          {[
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=70",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=70",
            "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=900&q=70",
          ].map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.12 }}
              className={`overflow-hidden rounded-2xl border border-border/60 ${i === 1 ? "translate-y-12" : ""}`}
            >
              <img src={src} alt="studio" loading="lazy" className="aspect-[4/5] w-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16">
            <div className="text-xs uppercase tracking-widest text-secondary">Our journey</div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-semibold">
              Seven years, <span className="text-gradient">one obsession</span>.
            </h2>
          </div>

          <div className="tl-track relative pl-10 md:pl-20">
            <div className="absolute left-3 md:left-8 top-0 bottom-0 w-px bg-border/70" />
            <div className="tl-progress absolute left-3 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary to-secondary origin-top scale-y-0" />

            {milestones.map((m) => (
              <div key={m.year} className="tl-item relative pb-14 last:pb-0">
                <div className="absolute -left-[26px] md:-left-[34px] top-1.5 h-3 w-3 rounded-full bg-gradient-primary shadow-glow" />
                <div className="text-sm font-mono text-secondary">{m.year}</div>
                <h3 className="mt-1 font-display text-2xl md:text-3xl">{m.title}</h3>
                <p className="mt-3 text-muted-foreground max-w-xl">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative py-32 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <div className="text-xs uppercase tracking-widest text-secondary">Operating values</div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-semibold max-w-3xl">
              How we <span className="text-gradient">work together</span>.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="p-7 rounded-2xl border border-border/70 bg-card/40 hover:border-primary/60 transition-colors"
              >
                <div className="h-11 w-11 grid place-items-center rounded-xl bg-gradient-primary text-background">
                  <v.icon size={18} />
                </div>
                <h3 className="mt-5 font-display text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;