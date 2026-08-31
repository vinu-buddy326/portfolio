import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MinimalPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let completed = false;
    const safeComplete = () => {
      if (!completed) {
        completed = true;
        if (onComplete) onComplete();
      }
    };

    // Safety fallback: guaranteed unmount after 2.2 seconds even if GSAP stalls
    const timer = setTimeout(safeComplete, 2200);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: safeComplete
      });

      if (preloaderRef.current && contentRef.current) {
        tl.set(preloaderRef.current, { autoAlpha: 1 })
          .fromTo(
            contentRef.current,
            { scale: 0.95, opacity: 0, filter: "blur(8px)" },
            { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
          )
          .to(contentRef.current, {
            scale: 1.05,
            opacity: 0,
            filter: "blur(10px)",
            duration: 0.4,
            ease: "power2.in",
            delay: 0.6
          })
          .to(preloaderRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut"
          });
      } else {
        safeComplete();
      }
    });

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []); // Run effect once on mount

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center select-none overflow-hidden pointer-events-none"
    >
      <div ref={contentRef} className="flex flex-col items-center gap-3">
        {/* Crimson Indicator Pulse Dot */}
        <div className="w-3 h-3 rounded-full bg-red-600 animate-ping"></div>

        {/* Professional Name Header */}
        <h1 
          className="text-2xl md:text-4xl font-black uppercase tracking-[0.25em] text-white text-center"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          ADDALAMITTA VINUTHNA VASANTHI
        </h1>
        <p className="text-xs font-mono text-white/50 tracking-widest uppercase">
          AI & DATA SCIENCE SPECIALIST
        </p>
      </div>
    </div>
  );
};

export default MinimalPreloader;
