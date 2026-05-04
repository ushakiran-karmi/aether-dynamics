import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Pencil,
  Megaphone,
  Code2,
  Target,
  Clapperboard,
  TrendingUp,
} from "lucide-react";

const ACCENT = "#F9A826";

const SERVICES = [
  {
    num: "01",
    title: "Branding",
    icon: Pencil,
    eyebrow: "BUILDING BRANDS THAT LAST",
    heading: "We create identities\nthat leave a mark.",
    body: "From brand strategy and naming to visual identity and brand communication, we build brands that connect, inspire and stand out.",
    points: ["Brand Strategy", "Visual Identity", "Brand Communication"],
    cta: "EXPLORE BRANDING",
    img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80",
  },
  {
    num: "02",
    title: "Digital Marketing",
    icon: Megaphone,
    eyebrow: "GROWTH THROUGH STRATEGY",
    heading: "We drive growth that\nmoves the needle.",
    body: "From SEO and paid ads to social media and content marketing, we craft campaigns that scale your business and reach the right audience.",
    points: ["SEO & SEM", "Social Media", "Performance Ads"],
    cta: "EXPLORE MARKETING",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    num: "03",
    title: "Web Solutions",
    icon: Code2,
    eyebrow: "ENGINEERED FOR IMPACT",
    heading: "We build websites\nthat perform.",
    body: "From web design to full-stack development, we engineer fast, beautiful and reliable digital products tailored to your brand.",
    points: ["Web Design", "Web Development", "E-commerce"],
    cta: "EXPLORE WEB",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    num: "04",
    title: "Advertising",
    icon: Target,
    eyebrow: "CAMPAIGNS THAT CONVERT",
    heading: "We craft ads that\npeople remember.",
    body: "From concept to creative production, we build advertising that captures attention and converts viewers into customers.",
    points: ["Creative Strategy", "Ad Production", "Campaign Mgmt."],
    cta: "EXPLORE ADVERTISING",
    img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1000&q=80",
  },
  {
    num: "05",
    title: "Film Making",
    icon: Clapperboard,
    eyebrow: "STORIES THAT MOVE",
    heading: "We tell stories\nthrough film.",
    body: "From brand films to commercials and documentaries, we produce cinematic content that emotionally connects with your audience.",
    points: ["Brand Films", "Commercials", "Post Production"],
    cta: "EXPLORE FILM",
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80",
  },
  {
    num: "06",
    title: "Consulting",
    icon: TrendingUp,
    eyebrow: "STRATEGY THAT SCALES",
    heading: "We guide brands\ntoward growth.",
    body: "From market research to business strategy, we partner with you to unlock new opportunities and accelerate sustainable growth.",
    points: ["Market Research", "Brand Audit", "Growth Strategy"],
    cta: "EXPLORE CONSULTING",
    img: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1000&q=80",
  },
];

const STATS = [
  { value: "32+", label: "Years of Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "200+", label: "Happy Clients" },
  { value: "6", label: "Core Services" },
];

const Index = () => {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

  return (
    <main className="min-h-screen bg-[#F5F5F5] font-sans text-neutral-900 antialiased">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.25em]" style={{ color: "#E11D2E" }}>
            OUR SERVICES
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Solutions that drive growth
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-neutral-500">
            From strategy to execution, we craft ideas and experiences that create real impact.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* LEFT MENU */}
          <ul className="flex flex-col">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === active;
              return (
                <li key={s.num}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="relative flex w-full items-center gap-4 px-5 py-5 text-left transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? "#FFF6E6" : "transparent",
                      transform: isActive ? "translateX(4px)" : "translateX(0)",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeBar"
                        className="absolute left-0 top-0 h-full w-[3px]"
                        style={{ backgroundColor: ACCENT }}
                      />
                    )}
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300"
                      style={{
                        transform: isActive ? "scale(1.1)" : "scale(1)",
                        color: isActive ? ACCENT : "#9CA3AF",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col">
                      <span
                        className="text-xs font-semibold transition-colors duration-300"
                        style={{ color: isActive ? ACCENT : "#9CA3AF" }}
                      >
                        {s.num}
                      </span>
                      <span className="text-base font-bold text-neutral-900">{s.title}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* RIGHT CARD */}
          <motion.div
            key={`card-${active}`}
            initial={{ boxShadow: "0 10px 30px -20px rgba(0,0,0,0.1)" }}
            animate={{ boxShadow: "0 30px 60px -30px rgba(0,0,0,0.25)" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-sm bg-white"
          >
            <div className="grid grid-cols-1 gap-8 p-10 md:grid-cols-2">
              <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.num}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <p className="text-xs font-bold tracking-[0.25em]" style={{ color: ACCENT }}>
                      {current.eyebrow}
                    </p>
                    <h3 className="mt-5 whitespace-pre-line text-3xl font-bold leading-tight md:text-4xl">
                      {current.heading}
                    </h3>
                    <div className="mt-3 h-[3px] w-12" style={{ backgroundColor: "#E11D2E" }} />
                    <p className="mt-6 text-sm leading-relaxed text-neutral-500">{current.body}</p>
                    <ul className="mt-6 space-y-3">
                      {current.points.map((p) => (
                        <li key={p} className="flex items-center gap-3 text-sm font-medium text-neutral-800">
                          <span
                            className="flex h-5 w-5 items-center justify-center rounded-full"
                            style={{ backgroundColor: ACCENT }}
                          >
                            <Check className="h-3 w-3 text-white" strokeWidth={3} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#"
                      className="group mt-8 inline-flex items-center gap-4 border-b-2 border-neutral-900 pb-2 text-xs font-bold tracking-[0.15em]"
                    >
                      {current.cta}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                        style={{ color: "#E11D2E" }}
                      />
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative flex min-h-[400px] items-center justify-center">
                <motion.div
                  key={`glow-${current.num}`}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-4 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.img}
                    src={current.img}
                    alt={current.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 h-[360px] w-full rounded-sm object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-neutral-200 md:grid-cols-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-6 py-8 text-center ${i < STATS.length - 1 ? "md:border-r border-neutral-200" : ""}`}
                >
                  <p className="text-3xl font-bold" style={{ color: "#E11D2E" }}>
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;