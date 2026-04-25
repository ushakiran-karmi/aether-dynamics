import { useEffect, useRef, useState } from "react";

const Index = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const sphere1Ref = useRef<HTMLDivElement>(null);
  const sphere2Ref = useRef<HTMLDivElement>(null);
  const sphere3Ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 scroll progress through section

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress: 0 when section top hits bottom of viewport, 1 when section bottom hits top
        const total = rect.height + vh;
        const scrolled = vh - rect.top;
        const p = Math.min(1, Math.max(0, scrolled / total));
        setProgress(p);

        // Parallax spheres
        const y = window.scrollY;
        if (sphere1Ref.current) sphere1Ref.current.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
        if (sphere2Ref.current) sphere2Ref.current.style.transform = `translate3d(0, ${y * -0.1}px, 0)`;
        if (sphere3Ref.current) sphere3Ref.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Animate cards based on progress (0.2 → 0.6 = active animation window)
  const ease = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic
  const cardProgress = Math.min(1, Math.max(0, (progress - 0.15) / 0.4));
  const eased = ease(cardProgress);

  const leftX = -100 + eased * 100; // -100% → 0%
  const rightX = 100 - eased * 100; // 100% → 0%
  const cardOpacity = eased;
  const centerScale = 0.92 + eased * 0.08;

  return (
    <main className="bg-[#F3F4F6] text-slate-900 overflow-x-hidden font-sans">
      {/* Spacer to allow scroll */}
      <div className="h-[40vh] flex items-end justify-center pb-12">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Scroll to reveal</p>
      </div>

      {/* Fixed background layer with blurred 3D spheres */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-gradient-to-br from-white via-[#F3F4F6] to-[#DCE3EA]">
        <div
          ref={sphere1Ref}
          className="absolute -top-32 -left-20 h-[480px] w-[480px] rounded-full opacity-70 will-change-transform"
          style={{
            background: "radial-gradient(circle at 30% 30%, #FFFFFF 0%, #DCE3EA 45%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          ref={sphere2Ref}
          className="absolute top-1/3 -right-32 h-[560px] w-[560px] rounded-full opacity-60 will-change-transform"
          style={{
            background: "radial-gradient(circle at 60% 40%, #E8EEF5 0%, #DCE3EA 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          ref={sphere3Ref}
          className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full opacity-50 will-change-transform"
          style={{
            background: "radial-gradient(circle at 50% 50%, #FFFFFF 0%, #EDF1F5 40%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Built for Growth section */}
      <section
        ref={sectionRef}
        className="relative min-h-[140vh] w-full flex items-center justify-center px-6 py-32"
      >
        <div className="relative w-full max-w-6xl mx-auto h-[600px] flex items-center justify-center">
          {/* Left sliding card */}
          <div
            ref={leftCardRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-72 md:w-80 h-80 rounded-3xl will-change-transform"
            style={{
              transform: `translate(${leftX}%, -50%)`,
              opacity: cardOpacity,
              transition: "transform 0.1s linear, opacity 0.3s ease-out",
              background: "rgba(255, 255, 255, 0.55)",
              backdropFilter: "blur(24px) saturate(140%)",
              WebkitBackdropFilter: "blur(24px) saturate(140%)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow:
                "0 20px 60px -20px rgba(15, 23, 42, 0.15), 0 4px 16px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-white/70 border border-white/80 mb-6 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#DCE3EA] to-slate-400" />
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-2">Insights</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Real-time analytics tuned to the moments that matter.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest">
                <span className="h-px w-8 bg-slate-300" />
                01
              </div>
            </div>
          </div>

          {/* Right sliding card */}
          <div
            ref={rightCardRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-72 md:w-80 h-80 rounded-3xl will-change-transform"
            style={{
              transform: `translate(${rightX}%, -50%)`,
              opacity: cardOpacity,
              transition: "transform 0.1s linear, opacity 0.3s ease-out",
              background: "rgba(255, 255, 255, 0.55)",
              backdropFilter: "blur(24px) saturate(140%)",
              WebkitBackdropFilter: "blur(24px) saturate(140%)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow:
                "0 20px 60px -20px rgba(15, 23, 42, 0.15), 0 4px 16px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-xl bg-white/70 border border-white/80 mb-6 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-sm bg-gradient-to-br from-[#DCE3EA] to-slate-400" />
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-2">Automation</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Workflows that scale silently in the background.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest">
                <span className="h-px w-8 bg-slate-300" />
                02
              </div>
            </div>
          </div>

          {/* Center hero card */}
          <div
            ref={centerCardRef}
            className="relative z-10 w-full max-w-2xl rounded-[2rem] px-10 py-16 md:px-16 md:py-20 text-center will-change-transform"
            style={{
              transform: `scale(${centerScale})`,
              opacity: 0.4 + eased * 0.6,
              transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
              background: "rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              border: "1px solid rgba(255, 255, 255, 0.7)",
              boxShadow:
                "0 30px 80px -20px rgba(15, 23, 42, 0.18), 0 8px 24px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400 mb-6">
              Platform
            </p>
            <h2
              className="text-5xl md:text-7xl font-light tracking-tight text-slate-900 mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Built for{" "}
              <span className="italic font-normal text-slate-700">Growth</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 max-w-md mx-auto leading-relaxed font-light">
              A quiet system designed to scale with you — refined interactions,
              measured motion, and the calm of clean defaults.
            </p>

            <div className="mt-10 flex items-center justify-center gap-3">
              <button className="px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors">
                Get started
              </button>
              <button className="px-6 py-3 rounded-full bg-white/60 border border-white/80 text-slate-700 text-sm font-medium hover:bg-white/80 transition-colors backdrop-blur">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-[60vh] flex items-start justify-center pt-20">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          Keep scrolling
        </p>
      </div>
    </main>
  );
};

export default Index;
