import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, Plus } from "lucide-react";

const NAV = ["Work", "Services", "About", "Insights", "Contact"];

const SERVICES = [
  { num: "01", title: "Brand Strategy" },
  { num: "02", title: "Visual Identity" },
  { num: "03", title: "Brand Experience" },
  { num: "04", title: "Brand Guidelines" },
];

const PROCESS = [
  { num: "01", title: "Discover", body: "We research your brand, audience and market to find the right direction." },
  { num: "02", title: "Define", body: "We define your brand strategy, positioning and personality." },
  { num: "03", title: "Design", body: "We create a unique visual identity that expresses who you are." },
  { num: "04", title: "Deliver", body: "We build guidelines and assets to ensure a consistent brand experience." },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-[#F5F3EF] font-sans text-neutral-900 antialiased">
      {/* Navbar */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-8 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center">
            <svg viewBox="0 0 40 40" className="h-7 w-7 fill-neutral-900">
              <polygon points="20,4 4,34 36,34" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-[0.18em] text-neutral-900">MEDIA WAGON</span>
        </div>

        <nav className="hidden items-center gap-10 text-[13px] font-medium text-neutral-700 md:flex">
          {NAV.map((item) => (
            <a key={item} href="#" className={`transition-colors hover:text-neutral-900 ${item === "Services" ? "border-b border-neutral-900 pb-1 text-neutral-900" : ""}`}>
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-[13px] font-medium text-neutral-900 transition-all hover:border-neutral-900"
          >
            Let's Talk
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-8 pb-24 pt-8 lg:grid-cols-2">
        <div className="relative">
          <div className="flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-neutral-500">
            <span>01</span>
            <span className="h-px w-8 bg-neutral-400" />
            <span>SERVICE</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 text-[120px] leading-[0.9] tracking-tight text-neutral-900"
            style={{ fontFamily: '"Dancing Script", "Brush Script MT", cursive', fontWeight: 500 }}
          >
            Branding
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8 text-3xl font-light tracking-tight text-neutral-900"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            that defines identity.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 text-sm leading-relaxed text-neutral-600"
          >
            We craft brands that stand out,
            <br />
            connect deeply and stay remembered.
          </motion.p>

          <motion.a
            href="#"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="group mt-12 inline-flex items-center gap-6 border-b border-neutral-900 pb-2 text-sm font-semibold text-neutral-900"
          >
            Start a Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* Right hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[520px]"
        >
          {/* Big circle */}
          <div className="absolute right-10 top-6 h-[420px] w-[420px] rounded-full bg-[#EBE7DF]" />

          {/* Floating dots */}
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[35%] top-[18%] h-3 w-3 rounded-full bg-white shadow-md"
          />
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[6%] top-[12%] h-4 w-4 rounded-full bg-white shadow-md"
          />
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[2%] top-[55%] h-5 w-5 rounded-full bg-white shadow-md"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute right-24 top-20 flex h-[360px] w-[260px] flex-col items-center justify-center rounded-sm bg-[#F8F6F1] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]"
          >
            <svg viewBox="0 0 100 60" className="h-12 w-20 stroke-neutral-700" fill="none" strokeWidth="1.2">
              <path d="M10 50 L30 15 L50 40 L70 15 L90 50" />
            </svg>
            <p className="mt-4 text-lg tracking-[0.35em] text-neutral-700" style={{ fontFamily: 'Georgia, serif' }}>
              MONVÉR
            </p>
            <p className="mt-1 text-[9px] tracking-[0.4em] text-neutral-500">BEYOND ORDINARY</p>
          </motion.div>

          {/* Small circle disc */}
          <div className="absolute bottom-16 right-72 flex h-20 w-20 items-center justify-center rounded-full bg-[#F8F6F1] shadow-lg">
            <svg viewBox="0 0 100 60" className="h-6 w-10 stroke-neutral-600" fill="none" strokeWidth="1.5">
              <path d="M10 50 L30 15 L50 40 L70 15 L90 50" />
            </svg>
          </div>

          {/* Clip */}
          <div className="absolute bottom-10 right-32 h-10 w-6 rounded-sm bg-neutral-800 shadow-md" />
        </motion.div>
      </section>

      {/* What we do */}
      <section className="border-t border-neutral-200 bg-[#F5F3EF]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 py-24 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.25em] text-neutral-500">
              WHAT WE DO
              <span className="h-px w-8 bg-neutral-400" />
            </div>
            <h3 className="mt-10 text-4xl leading-tight tracking-tight text-neutral-900" style={{ fontFamily: 'Georgia, serif' }}>
              End-to-end
              <br />
              branding that
              <br />
              builds <em className="italic">perception.</em>
            </h3>
            <div className="mt-8 h-px w-10 bg-neutral-400" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-neutral-600">
              From strategy to execution, we create meaningful brands that leave a lasting impact.
            </p>
          </div>

          <div className="lg:col-span-1">
            <ul>
              {SERVICES.map((s) => (
                <li key={s.num} className="group flex items-center justify-between border-b border-neutral-300 py-7">
                  <div className="flex items-center gap-10">
                    <span className="text-xs text-neutral-500">{s.num}</span>
                    <span className="text-xl text-neutral-900" style={{ fontFamily: 'Georgia, serif' }}>{s.title}</span>
                  </div>
                  <Plus className="h-4 w-4 text-neutral-500 transition-transform group-hover:rotate-90" />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="aspect-[4/5] w-full overflow-hidden bg-[#EBE7DF]">
              <div className="flex h-full w-full items-end justify-center bg-gradient-to-b from-[#F0EDE6] to-[#DDD8CE] p-6">
                <div className="w-full bg-white/70 px-3 py-2 text-center">
                  <p className="text-[10px] tracking-[0.3em] text-neutral-700" style={{ fontFamily: 'Georgia, serif' }}>MONVÉR</p>
                  <p className="text-[7px] tracking-[0.3em] text-neutral-500">BRAND GUIDELINES</p>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-neutral-700" style={{ fontFamily: 'Georgia, serif' }}>
              Thoughtful strategy. Timeless identity.
              <br />
              Consistent everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Our process */}
      <section className="border-t border-neutral-200 bg-[#F5F3EF]">
        <div className="mx-auto max-w-7xl px-8 py-20">
          <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.25em] text-neutral-500">
            OUR PROCESS
            <span className="h-px w-8 bg-neutral-400" />
          </div>

          <div className="relative mt-16 grid grid-cols-1 gap-12 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-light text-neutral-900" style={{ fontFamily: 'Georgia, serif' }}>{p.num}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                  {i < PROCESS.length - 1 && (
                    <span className="hidden flex-1 border-t border-dashed border-neutral-400 md:block" />
                  )}
                  {i < PROCESS.length - 1 && (
                    <span className="hidden h-1.5 w-1.5 rounded-full bg-neutral-900 md:block" />
                  )}
                </div>
                <h4 className="mt-8 text-lg text-neutral-900" style={{ fontFamily: 'Georgia, serif' }}>{p.title}</h4>
                <p className="mt-4 max-w-[200px] text-sm leading-relaxed text-neutral-600">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
