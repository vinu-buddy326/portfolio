import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certData = [
  {
    title: "Microsoft 365 Copilot Chat & Essentials",
    issuer: "MICROSOFT",
    image: "/microsoft-365-copilot-chat.jpeg",
    pdf: false,
    tag: "AI & PRODUCTIVITY"
  },
  {
    title: "Explore Generative AI & AI Foundations",
    issuer: "MICROSOFT / TATA / DELOITTE",
    image: "/explore-generative-ai.jpeg",
    pdf: false,
    tag: "GENERATIVE AI"
  },
  {
    title: "HP AI For Beginners",
    issuer: "HP FOUNDATION",
    image: "/hp-foundation.jpeg",
    pdf: false,
    tag: "ARTIFICIAL INTELLIGENCE"
  },
  {
    title: "NPTEL Certification on Blockchains",
    issuer: "NPTEL",
    image: "/nptel-blockchain-certificate.pdf",
    pdf: true,
    tag: "BLOCKCHAIN & SECURITY"
  }
];

const Certifications = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      cardsRef.current,
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white py-24 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Background Watermark Section Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[18vw] font-black text-white/[0.03] uppercase tracking-tighter select-none whitespace-nowrap">
          CERTIFICATIONS
        </h1>
      </div>

      {/* Red Ambient Glow */}
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold">04</span>
            <span className="text-white/40">|</span>
            <span>VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            CERTIFICATIONS & BADGES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
              OFFICIAL INDUSTRY RECOGNITION.
            </span>
          </h2>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certData.map((cert, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-red-600/60 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-5 space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 bg-red-600/10 px-2.5 py-0.5 rounded border border-red-600/25">
                  {cert.tag}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-red-500 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-white/50 tracking-wider">
                  ISSUED BY: {cert.issuer}
                </p>
              </div>

              <div className="p-5 pt-0 flex gap-3">
                <a
                  href={cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded bg-white/10 hover:bg-red-600 text-white font-mono font-bold text-xs uppercase tracking-widest text-center transition-all"
                >
                  View
                </a>
                <a
                  href={cert.image}
                  download
                  className="py-2 px-3 rounded bg-white/5 hover:bg-white/20 text-white/80 font-mono font-bold text-xs uppercase tracking-widest text-center transition-all"
                >
                  📥
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
