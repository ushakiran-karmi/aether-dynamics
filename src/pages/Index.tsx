import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Zap, Layers, Code2, Quote } from "lucide-react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- 3D Hero ---------------- */
const Blob = ({ position, color, scale = 1, speed = 1 }: any) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    ref.current.rotation.x = s.clock.elapsedTime * 0.15 * speed;
    ref.current.rotation.y = s.clock.elapsedTime * 0.2 * speed;
  });
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial color={color} distort={0.45} speed={1.6} roughness={0.15} metalness={0.6} />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const ref = useRef<THREE.Points>(null!);
  const count = 600;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#5eead4" transparent opacity={0.85} sizeAttenuation />
    </points>
  );
};

const Hero3D = () => (
  <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={0.4} />
    <directionalLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
    <directionalLight position={[-5, -3, -5]} intensity={1} color="#34d399" />
    <Suspense fallback={null}>
      <Blob position={[-2.4, 0.6, 0]} color="#22d3ee" scale={1.1} />
      <Blob position={[2.6, -0.4, -1]} color="#10b981" scale={1.4} speed={-1} />
      <Blob position={[0, -1.6, 1]} color="#3b82f6" scale={0.6} />
      <Particles />
      <Environment preset="night" />
    </Suspense>
  </Canvas>
);

/* ---------------- Page ---------------- */
const services = [
  { icon: Sparkles, title: "Brand & Identity", desc: "Visual systems that stand out and scale across every touchpoint." },
  { icon: Layers, title: "Web Design", desc: "Editorial, immersive websites with motion and micro-interactions." },
  { icon: Code2, title: "Development", desc: "Production-grade React, Next.js and headless e-commerce stacks." },
  { icon: Zap, title: "Motion & 3D", desc: "WebGL, Three.js and shader-driven interactive experiences." },
];

const projects = [
  { title: "Aurora Finance", tag: "FinTech · 2025", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70" },
  { title: "Verse Studio", tag: "Branding · 2024", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=70" },
  { title: "Helio Wearables", tag: "E-commerce", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=70" },
];

const testimonials = [
  { quote: "Nebula gave our product the edge it needed. The motion work alone tripled our demo conversion.", name: "Sarah Lin", role: "CPO, Aurora" },
  { quote: "Easily the most thoughtful studio we've worked with. Craft, speed and a real point of view.", name: "Diego Marín", role: "CEO, Verse" },
  { quote: "From concept to launch in 8 weeks, with a website that genuinely felt premium. Magic.", name: "Aisha Khan", role: "Founder, Helio" },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
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
      gsap.utils.toArray<HTMLElement>(".parallax-slow").forEach((el) => {
        gsap.to(el, {
          yPercent: -25,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-24">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0">
          <Hero3D />
        </div>

        <motion.div style={{ y: y2, opacity }} className="absolute -top-10 right-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <motion.div style={{ y: y1 }} className="absolute bottom-10 -left-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 glass text-xs uppercase tracking-widest text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
            Premium digital studio · Est. 2018
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display font-semibold tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl"
          >
            We design <span className="text-gradient">immersive</span> brands & products that move.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Nebula is a motion-first studio crafting websites, identities and 3D experiences for ambitious teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-primary text-background font-medium shadow-glow hover:scale-[1.03] transition-transform"
            >
              Start a project
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border/70 hover:border-primary/70 text-sm transition-colors"
            >
              View our work
            </Link>
          </motion.div>

          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
            {[
              ["120+", "Projects shipped"],
              ["38", "Awwwards & FWA"],
              ["18", "Countries served"],
              ["7yr", "Studio practice"],
            ].map(([n, l]) => (
              <div key={l} className="reveal">
                <div className="font-display text-3xl md:text-4xl text-gradient">{n}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-6 mb-16 reveal">
            <div>
              <div className="text-xs uppercase tracking-widest text-secondary">What we do</div>
              <h2 className="mt-3 font-display text-4xl md:text-6xl font-semibold leading-tight max-w-2xl">
                A studio built for <span className="text-gradient">craft & speed</span>.
              </h2>
            </div>
            <Link to="/services" className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              All services <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative p-7 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm hover:border-primary/60 transition-colors"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 to-secondary/10" />
                <div className="relative">
                  <div className="h-12 w-12 grid place-items-center rounded-xl bg-gradient-primary text-background shadow-glow">
                    <s.icon size={20} />
                  </div>
                  <h3 className="mt-6 font-display text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO HIGHLIGHT */}
      <section className="relative py-32 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-16">
            <div className="text-xs uppercase tracking-widest text-secondary">Selected work</div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-semibold leading-tight max-w-3xl">
              Recent stories we're <span className="text-gradient">proud of</span>.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border border-border/60 ${i === 1 ? "md:translate-y-12" : ""}`}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="parallax-slow h-full w-full object-cover scale-110 group-hover:scale-125 transition-transform duration-[1500ms]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-secondary">{p.tag}</div>
                    <div className="font-display text-2xl mt-1">{p.title}</div>
                  </div>
                  <ArrowUpRight className="opacity-60 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-32 border-t border-border/60">
        <div className="absolute inset-0 bg-hero-glow opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="reveal mb-14">
            <div className="text-xs uppercase tracking-widest text-secondary">Kind words</div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-semibold leading-tight max-w-3xl">
              Trusted by <span className="text-gradient">founders & teams</span> worldwide.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative p-7 rounded-2xl glass border border-border/60"
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

export default Index;
