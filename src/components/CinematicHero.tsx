import { useEffect, useRef, useState, useCallback } from "react";
import { Play, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-cinematic.jpg";

const CinematicHero = () => {
  const [progress, setProgress] = useState(0.25); // 0..1
  const [dragging, setDragging] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  /* ---------- Drag handling ---------- */
  const updateFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    setProgress(p);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      updateFromClientX(x);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, updateFromClientX]);

  /* ---------- Parallax: mouse + scroll ---------- */
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      mouse.current.x = (e.clientX / w - 0.5) * 2; // -1..1
      mouse.current.y = (e.clientY / h - 0.5) * 2;
    };
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      const wrap = imageWrapRef.current;
      if (wrap) {
        const mx = mouse.current.x * 14;
        const my = mouse.current.y * 14;
        const sy = scrollY.current * 0.18; // image moves faster
        wrap.style.transform = `translate3d(${mx}px, ${my - sy}px, 0) scale(1.08)`;
      }
      const section = sectionRef.current;
      if (section) {
        const bg = section.querySelector<HTMLElement>("[data-bg]");
        if (bg) bg.style.transform = `translate3d(0, ${scrollY.current * 0.3}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ---------- Derived values from slider ---------- */
  const imgTranslate = (progress - 0.5) * 80; // px
  const imgBlur = (1 - progress) * 8; // px
  const imgOpacity = 0.55 + progress * 0.45;
  const revealClip = `inset(0 ${(1 - progress) * 100}% 0 0)`;

  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <section
        ref={sectionRef}
        className="relative h-screen min-h-[700px] w-full overflow-hidden select-none"
      >
        {/* Background gradient + grain */}
        <div data-bg className="absolute inset-0 will-change-transform">
          <div className="absolute inset-0 bg-hero-glow" />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
               style={{
                 backgroundImage:
                   "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
               }}
          />
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-secondary/15 blur-[140px]" />
        </div>

        {/* Image — right side */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[58%] lg:w-[55%] overflow-hidden">
          <div
            ref={imageWrapRef}
            className="absolute inset-0 will-change-transform transition-[filter,opacity] duration-300"
            style={{
              filter: `blur(${dragging ? imgBlur + 4 : imgBlur}px)`,
              opacity: imgOpacity,
            }}
          >
            <img
              src={heroImage}
              alt="Cinematic figure in motion"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
              style={{ transform: `translateX(${imgTranslate}px)` }}
            />
          </div>
          {/* Left edge fade for blend */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-background via-background/70 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto h-full max-w-7xl px-6 md:px-10 flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between pt-8">
            <div
              className={`text-xs uppercase tracking-[0.3em] text-muted-foreground transition-all duration-700 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
            >
              Nebula — Studio
            </div>
            <div
              className={`text-xs uppercase tracking-[0.3em] text-muted-foreground transition-all duration-700 delay-150 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
            >
              Chapter 01 / Achieve
            </div>
          </div>

          {/* Heading */}
          <div className="flex-1 flex flex-col justify-center max-w-3xl">
            <h1 className="font-serif leading-[0.95] tracking-tight">
              <span
                className={`block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light italic text-foreground/80 transition-all duration-1000 ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Don't just do.
              </span>
              <span
                className={`block mt-2 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold transition-all duration-1000 ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <span
                  className="text-gradient inline-block"
                  style={{
                    clipPath: revealClip,
                    WebkitClipPath: revealClip,
                    transition: dragging ? "none" : "clip-path 0.6s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  Achieve.
                </span>
              </span>
            </h1>

            <p
              className={`mt-8 max-w-md text-base md:text-lg text-muted-foreground font-sans leading-relaxed transition-all duration-1000 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              A cinematic studio practice — crafting motion, identity and product
              experiences that move people.
            </p>
          </div>

          {/* Slider — center-right */}
          <div
            className={`absolute right-6 md:right-10 lg:right-16 top-1/2 -translate-y-1/2 w-[40%] md:w-[34%] lg:w-[30%] max-w-md transition-all duration-1000 ${
              loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <div className="flex items-center justify-between mb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>Drag</span>
              <span className="tabular-nums">{Math.round(progress * 100)}%</span>
            </div>
            <div
              ref={trackRef}
              onMouseDown={(e) => {
                setDragging(true);
                updateFromClientX(e.clientX);
              }}
              onTouchStart={(e) => {
                setDragging(true);
                updateFromClientX(e.touches[0].clientX);
              }}
              className="relative h-px w-full bg-foreground/15 cursor-ew-resize group"
              style={{ cursor: "ew-resize" }}
            >
              {/* Active line */}
              <div
                className="absolute left-0 top-0 h-px bg-gradient-primary"
                style={{
                  width: `${progress * 100}%`,
                  transition: dragging ? "none" : "width 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
              {/* Knob */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{
                  left: `${progress * 100}%`,
                  transition: dragging ? "none" : "left 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <div
                  className={`relative h-5 w-5 rounded-full bg-foreground shadow-glow transition-transform duration-300 ${
                    dragging ? "scale-125" : "group-hover:scale-110"
                  }`}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-80" />
                  <div className="absolute -inset-3 rounded-full border border-foreground/20" />
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground/70 font-sans italic">
              Slide to reveal the moment.
            </div>
          </div>

          {/* CTA bottom-left */}
          <div
            className={`pb-10 md:pb-14 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            <button className="group inline-flex items-center gap-4 text-left">
              <span className="relative grid place-items-center h-14 w-14 rounded-full border border-foreground/20 transition-all duration-500 group-hover:scale-110 group-hover:border-primary/60 group-hover:shadow-glow">
                <span className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Play className="relative h-4 w-4 text-foreground translate-x-[1px] group-hover:text-background transition-colors" fill="currentColor" />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Watch the film
                </span>
                <span className="font-serif text-lg md:text-xl text-foreground flex items-center gap-2">
                  What do you want to achieve?
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>Scroll</span>
          <span className="relative h-10 w-px bg-foreground/15 overflow-hidden">
            <span className="absolute top-0 left-0 h-4 w-px bg-foreground animate-[scrollDot_2s_ease-in-out_infinite]" />
          </span>
        </div>

        {/* Drag overlay blur */}
        {dragging && (
          <div className="absolute inset-0 backdrop-blur-[1px] bg-background/10 pointer-events-none transition-opacity" />
        )}
      </section>

      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(250%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </main>
  );
};

export default CinematicHero;