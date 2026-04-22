import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const filters = ["All", "Web", "Branding", "Motion", "Product"] as const;
type Filter = typeof filters[number];

type Project = { title: string; tag: Exclude<Filter, "All">; year: string; img: string };

const projects: Project[] = [
  { title: "Aurora Finance",  tag: "Web",      year: "2025", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=70" },
  { title: "Verse Studio",    tag: "Branding", year: "2024", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=70" },
  { title: "Helio Wearables", tag: "Web",      year: "2024", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=70" },
  { title: "Lumen OS",        tag: "Product",  year: "2025", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=70" },
  { title: "Nova Motion Reel",tag: "Motion",   year: "2024", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=70" },
  { title: "Atlas Hospitality", tag: "Branding", year: "2023", img: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1400&q=70" },
  { title: "Pulse Health",    tag: "Product",  year: "2025", img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=70" },
  { title: "Drift Skiwear",   tag: "Web",      year: "2024", img: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1400&q=70" },
];

const Portfolio = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.tag === filter)),
    [filter]
  );

  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <section className="relative pt-40 pb-16">
        <div className="absolute inset-0 bg-hero-glow -z-10" />
        <div className="absolute inset-0 grid-bg opacity-30 -z-10" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-widest text-secondary">
            Portfolio
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1]"
          >
            Selected <span className="text-gradient">work</span>.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A snapshot of recent collaborations across web, brand, product and motion.
          </motion.p>

          {/* Filters */}
          <div className="mt-12 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative px-5 py-2 rounded-full text-sm border transition-colors ${
                  filter === f
                    ? "border-transparent text-background"
                    : "border-border/70 text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-gradient-primary shadow-glow"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                className={`group relative overflow-hidden rounded-3xl border border-border/60 ${
                  i % 3 === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className={`overflow-hidden ${i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1500ms]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-7 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-secondary">{p.tag} · {p.year}</div>
                    <div className="font-display text-2xl md:text-4xl mt-1">{p.title}</div>
                  </div>
                  <div className="h-11 w-11 grid place-items-center rounded-full bg-gradient-primary text-background shadow-glow group-hover:rotate-45 transition-transform">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;