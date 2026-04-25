import { useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type Project = {
  title: string;
  subtitle: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "Nature",
    subtitle: "Quiet landscapes around the world.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cars",
    subtitle: "Performance, design and motion.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Animals",
    subtitle: "Wildlife portraits in their habitat.",
    image:
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Architecture",
    subtitle: "Modern buildings around the world.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Sport",
    subtitle: "Movement, focus and discipline.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Fashion",
    subtitle: "Editorial style and craft.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
  },
];

const Index = () => {
  const [active, setActive] = useState(3);
  const total = projects.length;

  const go = (delta: number) =>
    setActive((i) => (i + delta + total) % total);
  const setIndex = (i: number) => setActive((i + total) % total);

  const visible = useMemo(() => {
    // show 5 cards centered around active: -2,-1,0,+1,+2
    return [-2, -1, 0, 1, 2].map((offset) => {
      const idx = (active + offset + total) % total;
      return { ...projects[idx], offset, idx };
    });
  }, [active, total]);

  return (
    <main className="min-h-screen bg-[#F3F4F6] font-sans text-slate-900 overflow-x-hidden">
      <div className="mx-auto max-w-[1280px] px-4 py-6 md:px-8 md:py-10">
        <div
          className="rounded-[28px] bg-white px-6 py-7 md:px-12 md:py-10"
          style={{ boxShadow: "0 30px 80px -40px rgba(15, 23, 42, 0.2)" }}
        >
          {/* Top navigation */}
          <header className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white text-[13px] font-semibold">
                S
              </span>
              <span className="text-sm font-medium tracking-tight text-slate-800">
                studio<span className="text-slate-400">.</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium uppercase tracking-[0.18em]">
              <a href="#" className="text-slate-400 hover:text-slate-700 transition-colors">
                My Story
              </a>
              <a href="#" className="relative text-slate-900">
                My Work
                <span className="absolute -bottom-2 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-slate-900" />
              </a>
            </nav>

            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Contact
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </header>

          {/* Heading */}
          <section className="mt-14 md:mt-20 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-slate-400">
              My Work
            </p>
            <h1 className="mt-4 mx-auto max-w-3xl text-3xl md:text-5xl lg:text-[56px] font-semibold tracking-tight leading-[1.05] text-slate-900">
              A collection of theme
              <br className="hidden md:block" /> divided portfolios.
            </h1>
          </section>

          {/* Carousel */}
          <section className="relative mt-12 md:mt-16">
            <div className="relative h-[440px] md:h-[520px] flex items-center justify-center">
              {visible.map((card) => {
                const { offset, idx } = card;
                const isCenter = offset === 0;
                const abs = Math.abs(offset);

                // sizes
                const width = isCenter
                  ? "w-[300px] md:w-[640px]"
                  : abs === 1
                  ? "w-[80px] md:w-[110px]"
                  : "w-[60px] md:w-[80px]";
                const height = isCenter
                  ? "h-[420px] md:h-[500px]"
                  : "h-[360px] md:h-[440px]";

                // horizontal placement
                const translatePx =
                  offset === 0
                    ? 0
                    : offset < 0
                    ? -360 + (offset + 1) * 100 // -1 -> -360, -2 -> -460
                    : 360 + (offset - 1) * 100; // 1 -> 360, 2 -> 460

                const opacity = abs === 0 ? 1 : abs === 1 ? 0.85 : 0.55;
                const z = 10 - abs;

                return (
                  <button
                    key={`${idx}-${offset}`}
                    onClick={() => setIndex(idx)}
                    className={`group absolute ${width} ${height} overflow-hidden rounded-[22px] text-left transition-all duration-500 ease-out`}
                    style={{
                      transform: `translateX(${translatePx}px) scale(${
                        isCenter ? 1 : 0.98
                      })`,
                      opacity,
                      zIndex: z,
                      boxShadow: isCenter
                        ? "0 30px 60px -25px rgba(15, 23, 42, 0.45)"
                        : "0 15px 30px -20px rgba(15, 23, 42, 0.35)",
                    }}
                    aria-label={card.title}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* dark overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isCenter
                          ? "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)"
                          : "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)",
                      }}
                    />

                    {/* Side card vertical label */}
                    {!isCenter && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="text-[11px] md:text-xs font-medium uppercase tracking-[0.32em] text-white/90"
                          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                        >
                          {card.title}
                        </span>
                      </div>
                    )}

                    {/* Center card content */}
                    {isCenter && (
                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white">
                        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/70">
                          Featured
                        </p>
                        <h3 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">
                          {card.title}
                        </h3>
                        <p className="mt-2 max-w-md text-sm md:text-base text-white/80">
                          {card.subtitle}
                        </p>
                        <span className="mt-5 inline-flex w-max items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-slate-900 transition-transform group-hover:translate-x-1">
                          Show Portfolio
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Arrows */}
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className="absolute left-2 md:left-6 top-1/2 z-20 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur border border-slate-200 text-slate-700 hover:bg-white transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next"
                className="absolute right-2 md:right-6 top-1/2 z-20 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur border border-slate-200 text-slate-700 hover:bg-white transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Progress + indicator */}
            <div className="mt-10 flex items-center justify-between gap-6">
              <span className="text-[12px] font-medium uppercase tracking-[0.28em] text-slate-400">
                {String(active + 1).padStart(2, "0")}
                <span className="mx-2 text-slate-300">/</span>
                {String(total).padStart(2, "0")}
              </span>

              <div className="relative flex-1 h-[2px] bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-slate-900 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((active + 1) / total) * 100}%` }}
                />
              </div>

              <span className="text-[12px] font-medium uppercase tracking-[0.28em] text-slate-500 hidden md:block">
                {projects[active].title}
              </span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Index;
