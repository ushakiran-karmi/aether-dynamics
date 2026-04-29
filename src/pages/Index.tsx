import { motion } from "framer-motion";
import {
  Lightbulb,
  Users,
  PieChart,
  Hourglass,
  Star,
  Award,
  Settings,
  TrendingUp,
  Stars,
  BarChart3,
  MapPin,
} from "lucide-react";

type Cell = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  // grid placement
  col: string; // tailwind col-start
  row: string; // tailwind row-start
  accent?: boolean;
};

const PETALS: Cell[] = [
  { id: "p1", icon: Lightbulb, title: "Lorem Ipsum", body: "Lorem ipsum dolor sit amet, ius quaestio perpetua, cu graece scripta vituperatoribus qui", col: "col-start-3", row: "row-start-1", accent: true },
  { id: "p2", icon: Users,     title: "Lorem Ipsum", body: "Lorem ipsum dolor sit amet, ius quaestio perpetua, cu graece scripta vituperatoribus qui", col: "col-start-1", row: "row-start-2" },
  { id: "p3", icon: Star,      title: "Lorem Ipsum", body: "Lorem ipsum dolor sit amet, ius quaestio perpetua, cu graece scripta vituperatoribus qui", col: "col-start-5", row: "row-start-2" },
  { id: "p4", icon: Settings,  title: "Lorem Ipsum", body: "Lorem ipsum dolor sit amet, ius quaestio perpetua, cu graece scripta vituperatoribus qui", col: "col-start-1", row: "row-start-4" },
  { id: "p5", icon: BarChart3, title: "Lorem Ipsum", body: "Lorem ipsum dolor sit amet, ius quaestio perpetua, cu graece scripta vituperatoribus qui", col: "col-start-5", row: "row-start-4" },
  { id: "p6", icon: MapPin,    title: "Lorem Ipsum", body: "Lorem ipsum dolor sit amet, ius quaestio perpetua, cu graece scripta vituperatoribus qui", col: "col-start-3", row: "row-start-5" },
];

const INNER: Cell[] = [
  { id: "i1", icon: PieChart,    title: "", body: "Lorem ipsum dolor sit amet, ut ius quaestio perpetua", col: "col-start-2", row: "row-start-2" },
  { id: "i2", icon: Hourglass,   title: "", body: "Lorem ipsum dolor sit amet, ut ius quaestio perpetua", col: "col-start-4", row: "row-start-2" },
  { id: "i3", icon: Award,       title: "", body: "Lorem ipsum dolor sit amet, ut ius quaestio perpetua", col: "col-start-2", row: "row-start-3" },
  { id: "i4", icon: Settings,    title: "", body: "Lorem ipsum dolor sit amet, ut ius quaestio perpetua", col: "col-start-4", row: "row-start-3" },
  { id: "i5", icon: TrendingUp,  title: "", body: "Lorem ipsum dolor sit amet, ut ius quaestio perpetua", col: "col-start-2", row: "row-start-4" },
  { id: "i6", icon: Stars,       title: "", body: "Lorem ipsum dolor sit amet, ut ius quaestio perpetua", col: "col-start-4", row: "row-start-4" },
];

/** A single hexagon "tile" rendered with clip-path */
const Hex = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, y: 12 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.04 }}
    className={`relative aspect-[1/1.1547] w-full ${className}`}
    style={{
      clipPath:
        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
    }}
  >
    {/* gradient border via two stacked hex shapes */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-accent/50 to-secondary/60" />
    <div
      className="absolute inset-[1.5px] glass flex items-center justify-center"
      style={{
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
    >
      {children}
    </div>
  </motion.div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background bg-hero-glow font-sans text-foreground overflow-hidden">
      {/* Hero header */}
      <section className="relative pt-32 pb-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent"
        >
          Our Framework
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-4xl md:text-6xl font-light tracking-tight"
        >
          A <span className="text-gradient font-medium">connected</span> system,
          built around your brand.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base text-muted-foreground"
        >
          Twelve disciplines orbiting one core idea — every hex is a service
          working in concert with the others.
        </motion.p>
      </section>

      {/* Honeycomb */}
      <section className="relative px-4 md:px-10 pb-32">
        <div className="relative mx-auto grid w-full max-w-5xl grid-cols-5 grid-rows-5 gap-x-2 gap-y-3 md:gap-x-4 md:gap-y-5">
          {/* Outer petals (with title + body) */}
          {PETALS.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={c.id} className={`${c.col} ${c.row}`}>
                <Hex delay={0.05 * i}>
                  <div className="flex flex-col items-center px-4 text-center">
                    <Icon
                      className={`h-6 w-6 mb-2 ${
                        c.accent ? "text-accent" : "text-foreground/90"
                      }`}
                    />
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
                        c.accent ? "text-accent" : "text-primary"
                      }`}
                    >
                      {c.title}
                    </p>
                    <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground line-clamp-4">
                      {c.body}
                    </p>
                  </div>
                </Hex>
              </div>
            );
          })}

          {/* Inner ring (icon + short body) */}
          {INNER.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={c.id} className={`${c.col} ${c.row}`}>
                <Hex delay={0.4 + 0.05 * i}>
                  <div className="flex flex-col items-center px-3 text-center">
                    <Icon className="h-5 w-5 mb-1.5 text-foreground/80" />
                    <p className="text-[10px] leading-snug text-muted-foreground line-clamp-3">
                      {c.body}
                    </p>
                  </div>
                </Hex>
              </div>
            );
          })}

          {/* Center logo hex */}
          <div className="col-start-3 row-start-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[1/1.1547] w-full"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-primary" />
              <div
                className="absolute inset-[2px] bg-card flex flex-col items-center justify-center"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="h-10 w-10 rounded-md border-2 border-accent rotate-45"
                />
                <p className="mt-3 text-[11px] font-serif italic text-foreground/90">
                  Company
                </p>
                <p className="text-[11px] font-serif italic text-foreground/90 -mt-0.5">
                  Logo
                </p>
              </div>
              <div className="absolute -inset-6 -z-10 rounded-full bg-accent/20 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;

/* Unused legacy export removed below — single-file component above is the page. */
const _Legacy = () => (
  <main className="hidden">
      <section
        ref={containerRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-screen w-full cursor-none select-none"
      >
        {/* Split background */}
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-[#E26D5C]" />
          <div className="bg-white" />
        </div>

        {/* Top nav */}
        <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 md:px-14 py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white text-xl"
          >
            ✦
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hidden md:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700"
          >
            <a href="#" className="hover:text-slate-900 transition-colors">Themes +</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Extensions</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Packages</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Resources +</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Help</a>
            <a
              href="#"
              className="rounded-full bg-slate-800 px-5 py-2 text-white tracking-[0.2em]"
            >
              Login
            </a>
          </motion.nav>
        </header>

        {/* Floating circles (parallax) */}
        <motion.div
          style={{ x: c1X, y: c1Y }}
          className="absolute left-[38%] top-[22%] z-10 h-3 w-3 rounded-full border border-white/80"
        />
        <motion.div
          style={{ x: c2X, y: c2Y }}
          className="absolute left-[56%] top-[30%] z-10 h-2 w-2 rounded-full bg-[#E26D5C]/60"
        />
        <motion.div
          style={{ x: c3X, y: c3Y }}
          className="absolute left-[44%] top-[68%] z-10 h-4 w-4 rounded-full border border-slate-400/60"
        />
        <motion.div
          style={{ x: c4X, y: c4Y }}
          className="absolute left-[60%] top-[60%] z-10 h-2.5 w-2.5 rounded-full bg-white/80"
        />
        <motion.div
          style={{ x: c1X, y: c3Y }}
          className="absolute left-[62%] top-[20%] z-10 h-6 w-6 rounded-full border border-slate-300/70 flex items-center justify-center"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#E26D5C]/70" />
        </motion.div>

        {/* Left text */}
        <motion.div
          style={{ x: leftTextX }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-1/2 z-20 w-1/2 -translate-y-1/2 px-10 md:px-20 text-white"
        >
          <p className="max-w-sm text-2xl md:text-[28px] leading-[1.4] font-light">
            The combination of great design and diligent app development.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/90 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white relative overflow-hidden"
          >
            <span className="relative z-10">View Themes</span>
            <ArrowRight className="h-3.5 w-3.5 relative z-10 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 bg-white/15 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </motion.a>
        </motion.div>

        {/* Right text */}
        <motion.div
          style={{ x: rightTextX }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 top-1/2 z-20 w-1/2 -translate-y-1/2 px-10 md:px-20 text-slate-800"
        >
          <p className="max-w-sm text-2xl md:text-[28px] leading-[1.4] font-light">
            We make{" "}
            <span className="text-[#E26D5C] font-medium">sleek and modern</span>{" "}
            designs for your business.
          </p>
        </motion.div>

        {/* Center bird */}
        <motion.div
          style={{ x: birdX, y: birdY, rotate: birdRot }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative h-[260px] w-[260px] md:h-[340px] md:w-[340px]">
            {/* Left half - design (dark/code-textured wing) */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            >
              <defs>
                <pattern id="codeTex" patternUnits="userSpaceOnUse" width="14" height="14">
                  <rect width="14" height="14" fill="#1f2937" />
                  <text x="1" y="10" fontSize="8" fill="#60a5fa" fontFamily="monospace">{"</>"}</text>
                </pattern>
              </defs>
              {/* Stylized bird body + wing */}
              <path
                d="M40 110 C 60 60, 110 50, 150 80 L 165 100 L 140 110 C 110 130, 70 140, 40 130 Z"
                fill="url(#codeTex)"
              />
              <path
                d="M70 90 L 130 70 L 120 105 Z"
                fill="#0f172a"
                opacity="0.9"
              />
            </svg>

            {/* Right half - photographic bird (warm) */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              style={{ clipPath: "inset(0 0 0 50%)" }}
            >
              <defs>
                <linearGradient id="birdGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F4A261" />
                  <stop offset="100%" stopColor="#C97B4A" />
                </linearGradient>
              </defs>
              <path
                d="M100 110 C 130 80, 160 90, 175 105 L 195 108 L 175 118 C 155 132, 125 138, 100 130 Z"
                fill="url(#birdGrad)"
              />
              {/* Beak */}
              <path d="M175 108 L 198 110 L 175 114 Z" fill="#1f2937" />
              {/* Eye */}
              <circle cx="160" cy="106" r="2.4" fill="#0f172a" />
            </svg>

            {/* Soft glow circles around bird */}
            <motion.span
              animate={{ scale: hovered ? 1.15 : 1, opacity: hovered ? 0.9 : 0.5 }}
              transition={{ duration: 0.6 }}
              className="absolute -top-4 left-6 h-4 w-4 rounded-full border border-white/80"
            />
            <motion.span
              animate={{ scale: hovered ? 1.2 : 1, opacity: hovered ? 0.9 : 0.4 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="absolute bottom-4 right-2 h-3 w-3 rounded-full bg-[#E26D5C]/70"
            />
            <motion.span
              animate={{ scale: hovered ? 1.1 : 1, opacity: hovered ? 0.7 : 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute top-10 -right-6 h-2 w-2 rounded-full bg-slate-700/60"
            />
          </div>
        </motion.div>

        {/* Custom cursor (dot + ring) */}
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none absolute top-0 left-0 z-40 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-2 w-2 rounded-full bg-white mix-blend-difference" />
        </motion.div>
        <motion.div
          style={{ x: cursorRingX, y: cursorRingY }}
          animate={{ scale: hovered ? 1.4 : 1 }}
          className="pointer-events-none absolute top-0 left-0 z-40 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-9 w-9 rounded-full border border-white/70 mix-blend-difference" />
        </motion.div>

        {/* Down arrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute right-8 top-6 z-30 text-slate-700"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
            <span className="text-xs">↓</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
};
