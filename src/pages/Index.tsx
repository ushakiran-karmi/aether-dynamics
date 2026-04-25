import { useEffect, useRef, useState } from "react";

const Index = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sphere1Ref = useRef<HTMLDivElement>(null);
  const sphere2Ref = useRef<HTMLDivElement>(null);
  const sphere3Ref = useRef<HTMLDivElement>(null);
  const sphere4Ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height + vh;
        const scrolled = vh - rect.top;
        const p = Math.min(1, Math.max(0, scrolled / total));
        setProgress(p);

        const y = window.scrollY;
        if (sphere1Ref.current) sphere1Ref.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
        if (sphere2Ref.current) sphere2Ref.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
        if (sphere3Ref.current) sphere3Ref.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
        if (sphere4Ref.current) sphere4Ref.current.style.transform = `translate3d(0, ${y * -0.06}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  const cardProgress = Math.min(1, Math.max(0, (progress - 0.15) / 0.4));
  const eased = ease(cardProgress);

  const leftX = -120 + eased * 120;
  const rightX = 120 - eased * 120;
  const centerOpacity = 0.3 + eased * 0.7;
  const centerScale = 0.94 + eased * 0.06;

  // Sphere style helper - frosted matte spheres like reference
  const sphereBg = (light = "#FFFFFF", mid = "#E8ECF5") =>
    `radial-gradient(circle at 35% 30%, ${light} 0%, ${mid} 55%, #C9D2E0 100%)`;

  return (
    <main className="bg-[#E8ECF5] text-slate-900 overflow-x-hidden font-sans">
      {/* Top spacer */}
      <div className="h-[50vh] flex items-end justify-center pb-12">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Scroll to reveal</p>
      </div>

      {/* Fixed pastel background */}
      <div
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #EEF1F8 0%, #E4E9F3 50%, #DCE3EA 100%)",
        }}
      />

      {/* Built for Growth section */}
      <section
        ref={sectionRef}
        className="relative min-h-[140vh] w-full flex items-center justify-center px-6 py-32"
      >
        <div className="relative w-full max-w-6xl mx-auto h-[600px] flex items-center justify-center">
          {/* Floating frosted spheres (parallax, behind + in front of card) */}
          <div
            ref={sphere1Ref}
            className="absolute will-change-transform pointer-events-none"
            style={{
              top: "-8%",
              left: "38%",
              height: "260px",
              width: "260px",
              borderRadius: "9999px",
              background: sphereBg("#FFFFFF", "#EAEEF6"),
              boxShadow:
                "inset -20px -20px 40px rgba(180, 190, 210, 0.4), inset 20px 20px 40px rgba(255,255,255,0.6), 0 30px 60px -20px rgba(80, 100, 140, 0.25)",
              zIndex: 5,
            }}
          />
          <div
            ref={sphere2Ref}
            className="absolute will-change-transform pointer-events-none"
            style={{
              bottom: "-6%",
              right: "8%",
              height: "320px",
              width: "320px",
              borderRadius: "9999px",
              background: sphereBg("#F5F7FB", "#DDE3EE"),
              boxShadow:
                "inset -25px -25px 50px rgba(170, 180, 200, 0.45), inset 25px 25px 50px rgba(255,255,255,0.55), 0 40px 70px -20px rgba(80, 100, 140, 0.3)",
              zIndex: 5,
            }}
          />
          <div
            ref={sphere3Ref}
            className="absolute will-change-transform pointer-events-none"
            style={{
              bottom: "5%",
              left: "4%",
              height: "120px",
              width: "120px",
              borderRadius: "9999px",
              background: sphereBg("#FFFFFF", "#E4E9F3"),
              boxShadow:
                "inset -10px -10px 20px rgba(180, 190, 210, 0.4), inset 10px 10px 20px rgba(255,255,255,0.6), 0 20px 40px -10px rgba(80, 100, 140, 0.2)",
              zIndex: 5,
            }}
          />
          <div
            ref={sphere4Ref}
            className="absolute will-change-transform pointer-events-none"
            style={{
              top: "20%",
              right: "2%",
              height: "90px",
              width: "90px",
              borderRadius: "9999px",
              background: sphereBg("#FFFFFF", "#E8ECF5"),
              boxShadow:
                "inset -8px -8px 16px rgba(180, 190, 210, 0.4), inset 8px 8px 16px rgba(255,255,255,0.6), 0 15px 30px -10px rgba(80, 100, 140, 0.2)",
              zIndex: 1,
            }}
          />

          {/* Left sliding glass card */}
          <div
            className="absolute left-0 top-1/2 w-64 md:w-72 h-72 rounded-3xl will-change-transform"
            style={{
              transform: `translate(${leftX}%, -50%)`,
              opacity: eased,
              transition: "transform 0.15s linear, opacity 0.4s ease-out",
              background: "rgba(255, 255, 255, 0.35)",
              backdropFilter: "blur(20px) saturate(150%)",
              WebkitBackdropFilter: "blur(20px) saturate(150%)",
              border: "1px solid rgba(255, 255, 255, 0.7)",
              boxShadow:
                "0 20px 50px -15px rgba(80, 100, 140, 0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
              zIndex: 8,
            }}
          >
            <div className="p-7 h-full flex flex-col justify-between">
              <div>
                <div className="h-9 w-9 rounded-xl bg-white/60 border border-white/80 mb-5" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Insights</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Real-time analytics tuned to the moments that matter.
                </p>
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">01</div>
            </div>
          </div>

          {/* Right sliding glass card */}
          <div
            className="absolute right-0 top-1/2 w-64 md:w-72 h-72 rounded-3xl will-change-transform"
            style={{
              transform: `translate(${rightX}%, -50%)`,
              opacity: eased,
              transition: "transform 0.15s linear, opacity 0.4s ease-out",
              background: "rgba(255, 255, 255, 0.35)",
              backdropFilter: "blur(20px) saturate(150%)",
              WebkitBackdropFilter: "blur(20px) saturate(150%)",
              border: "1px solid rgba(255, 255, 255, 0.7)",
              boxShadow:
                "0 20px 50px -15px rgba(80, 100, 140, 0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
              zIndex: 8,
            }}
          >
            <div className="p-7 h-full flex flex-col justify-between">
              <div>
                <div className="h-9 w-9 rounded-xl bg-white/60 border border-white/80 mb-5" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Automation</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Workflows that scale silently in the background.
                </p>
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">02</div>
            </div>
          </div>

          {/* Center main glass card (like reference) */}
          <div
            className="relative w-full max-w-3xl rounded-[2rem] px-10 py-16 md:px-20 md:py-20 will-change-transform"
            style={{
              transform: `scale(${centerScale})`,
              opacity: centerOpacity,
              transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
              background: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(30px) saturate(160%)",
              WebkitBackdropFilter: "blur(30px) saturate(160%)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              boxShadow:
                "0 30px 80px -20px rgba(80, 100, 140, 0.3), inset 0 1px 0 rgba(255,255,255,0.95)",
              zIndex: 6,
            }}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-400/70 leading-[0.95] mb-6">
              Built for
              <br />
              Growth
            </h2>
            <p className="text-sm md:text-base text-slate-500/80 leading-relaxed max-w-xl font-light">
              A quiet system designed to scale with you — refined interactions,
              measured motion, and the calm of clean defaults. Built with
              precision for teams that move fast without breaking the elegance
              of their craft.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-[60vh] flex items-start justify-center pt-20">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Keep scrolling</p>
      </div>
    </main>
  );
};

export default Index;
