import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  Gem,
  Megaphone,
  Search,
  PieChart,
  TrendingUp,
  Smile,
  Rocket,
  LineChart,
} from "lucide-react";

const NAV = ["Home", "About", "Services", "Portfolio", "Contact"];

const FLOATERS = [
  {
    icon: Target,
    title: "Strategy",
    body: "Data-backed marketing strategies",
    iconColor: "text-blue-500",
    pos: "top-[2%] left-[42%]",
    delay: 0.2,
  },
  {
    icon: Gem,
    title: "Branding",
    body: "Build memorable brand identities",
    iconColor: "text-rose-400",
    pos: "top-[28%] left-[6%]",
    delay: 0.35,
  },
  {
    icon: Megaphone,
    title: "Ads Campaigns",
    body: "High-converting ad campaigns",
    iconColor: "text-amber-400",
    pos: "top-[32%] right-[2%]",
    delay: 0.5,
  },
  {
    icon: Search,
    title: "SEO",
    body: "Rank higher & get found faster",
    iconColor: "text-emerald-500",
    pos: "bottom-[10%] left-[20%]",
    delay: 0.65,
  },
  {
    icon: PieChart,
    title: "Analytics",
    body: "Track, analyze & improve performance",
    iconColor: "text-blue-500",
    pos: "bottom-[4%] right-[4%]",
    delay: 0.8,
  },
];

const STATS = [
  { icon: Smile, color: "bg-blue-100 text-blue-500", value: "120+", label: "Happy Clients" },
  { icon: Rocket, color: "bg-violet-100 text-violet-500", value: "250+", label: "Projects Delivered" },
  { icon: LineChart, color: "bg-emerald-100 text-emerald-500", value: "8X", label: "Average ROI" },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-[#F1F3FA] font-sans text-slate-900 overflow-hidden">
      {/* Navbar */}
      <header className="sticky top-6 z-40 mx-auto flex max-w-5xl items-center justify-between rounded-2xl bg-white px-6 py-3 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)]">
        <div className="flex items-center gap-1 text-2xl font-extrabold tracking-tight">
          <span className="text-blue-500">M</span>
          <span className="text-emerald-500">W</span>
        </div>
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-600">
          {NAV.map((item) => (
            <a
              key={item}
              href="#"
              className={`rounded-full px-5 py-2 transition-colors ${
                item === "About"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:text-slate-900"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section className="relative mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:px-14">
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-slate-400">
            <span className="h-px w-10 bg-slate-300" />
            Scroll To Reveal About Us
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-sm font-semibold uppercase tracking-[0.28em] text-blue-600"
          >
            Who We Are
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-slate-900"
          >
            We Don&apos;t Just Market,
            <br />
            We{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Grow Brands.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-md text-base leading-relaxed text-slate-500"
          >
            We&apos;re a performance-driven marketing &amp; advertising agency
            that combines strategy, creativity, and data to deliver measurable
            growth for your business.
          </motion.p>

          <motion.a
            href="#"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 py-3 pl-7 pr-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30"
          >
            Know More About Us
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </motion.a>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-center gap-10">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${s.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">{s.value}</p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Orbit */}
        <div className="relative h-[560px] lg:h-[640px]">
          {/* Orbit rings */}
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/60" />
          <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/70" />

          {/* Orbit dots */}
          <span className="absolute left-[26%] top-[18%] h-2.5 w-2.5 rounded-full border border-blue-400 bg-white" />
          <span className="absolute right-[20%] top-[28%] h-2.5 w-2.5 rounded-full bg-pink-400" />
          <span className="absolute right-[14%] top-[55%] h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="absolute bottom-[12%] left-[42%] h-2.5 w-2.5 rounded-full border border-blue-400 bg-white" />

          {/* Decorative spheres */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[2%] top-[8%] h-24 w-24 rounded-full bg-gradient-to-br from-violet-300 to-indigo-400 opacity-80 blur-[1px]"
          />
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[18%] left-[6%] h-16 w-16 rounded-full bg-gradient-to-br from-white to-slate-200 shadow-lg"
          />

          {/* Central hero sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative h-[300px] w-[300px] md:h-[340px] md:w-[340px]">
              {/* Glow */}
              <div className="absolute -inset-10 rounded-full bg-pink-300/40 blur-3xl" />
              <div className="absolute -inset-6 rounded-full bg-blue-400/30 blur-2xl" />

              <div className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_30%_30%,#a78bfa,#6366f1_45%,#4f46e5_75%)] shadow-[inset_-30px_-30px_60px_rgba(0,0,0,0.25),0_30px_80px_-20px_rgba(99,102,241,0.6)]">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <TrendingUp className="h-20 w-20" strokeWidth={2.2} />
                  </motion.div>
                  <p className="mt-4 text-lg font-semibold">Strategy. Creativity.</p>
                  <p className="text-lg font-semibold">Performance.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating service cards */}
          {FLOATERS.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: f.delay, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.03 }}
                className={`absolute ${f.pos} z-20 w-56 rounded-2xl bg-white px-4 py-3 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.25)]`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                    <Icon className={`h-5 w-5 ${f.iconColor}`} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">{f.title}</p>
                    <p className="text-xs leading-snug text-slate-500">{f.body}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Subtle dotted decorations */}
      <div
        className="pointer-events-none absolute right-10 top-32 h-24 w-24 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-10 left-10 h-24 w-24 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
    </main>
  );
};

export default Index;
