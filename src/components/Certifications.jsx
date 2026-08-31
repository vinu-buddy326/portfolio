import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certData = [
  {
    episode: 'CREDENTIAL #01',
    title: 'Full Stack Development Virtual Internship',
    issuer: 'CODGEN',
    date: '31 AUG 2026',
    code: 'CG-2026-1033',
    duration: '4 WEEKS',
    image: '/internship-completion-certificate.jpeg',
    file: '/internship-completion-certificate.pdf',
    isPdf: true,
    tag: 'FULL STACK INTERNSHIP',
    verifyUrl: 'https://codegen.in/verify-cert',
    desc: 'Awarded for successful completion of the 4-Week CodGen Virtual Internship Program in Full Stack Development with hands-on project-based learning and real-world software engineering outcomes.'
  },
  {
    episode: 'CREDENTIAL #02',
    title: 'Microsoft 365 Copilot Chat & Essentials',
    issuer: 'MICROSOFT',
    date: '2025',
    code: 'MS-COPILOT-365',
    duration: 'VERIFIED',
    image: '/microsoft-365-copilot-chat.jpeg',
    file: '/microsoft-365-copilot-chat.jpeg',
    isPdf: false,
    tag: 'AI & PRODUCTIVITY',
    verifyUrl: null,
    desc: 'Certified expertise in Microsoft 365 Copilot, prompt engineering, generative AI integration, and enterprise workflow automation.'
  },
  {
    episode: 'CREDENTIAL #03',
    title: 'Explore Generative AI & AI Foundations',
    issuer: 'MICROSOFT / TATA / DELOITTE',
    date: '2025',
    code: 'GENAI-FOUNDATIONS',
    duration: 'VERIFIED',
    image: '/explore-generative-ai.jpeg',
    file: '/explore-generative-ai.jpeg',
    isPdf: false,
    tag: 'GENERATIVE AI',
    verifyUrl: null,
    desc: 'Foundational certification covering Large Language Models (LLMs), generative architecture, neural networks, and ethical AI deployment.'
  },
  {
    episode: 'CREDENTIAL #04',
    title: 'HP AI For Beginners',
    issuer: 'HP FOUNDATION',
    date: '2025',
    code: 'HP-AI-BEGINNER',
    duration: 'VERIFIED',
    image: '/hp-foundation.jpeg',
    file: '/hp-foundation.jpeg',
    isPdf: false,
    tag: 'ARTIFICIAL INTELLIGENCE',
    verifyUrl: null,
    desc: 'Official HP Foundation credential in AI core principles, machine learning models, data analytics, and computational logic.'
  },
  {
    episode: 'CREDENTIAL #05',
    title: 'NPTEL Certification on Blockchains',
    issuer: 'NPTEL / IIT',
    date: '2026',
    code: 'NPTEL-BC-2026',
    duration: '12 WEEKS',
    image: '/nptel-blockchain-certificate.pdf',
    file: '/nptel-blockchain-certificate.pdf',
    isPdf: true,
    tag: 'BLOCKCHAIN & SECURITY',
    verifyUrl: null,
    desc: 'Academic certification covering distributed ledger architectures, smart contracts, cryptographic protocols, and Web3 security.'
  }
];

const Certifications = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);

  // Mobile Touch Swipe Handler
  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;
    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;
    
    let activeIdx = 0;
    let minDiff = Infinity;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    setActiveCardIndex(activeIdx);

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, { 
          scale: i === activeIdx ? 1 : 0.9, 
          opacity: i === activeIdx ? 1 : 0.6,
          duration: 0.4, 
          ease: "power2.out", 
          overwrite: "auto" 
        });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) gsap.to(bg, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
    
    textRefs.current.forEach((txt, i) => {
      if (txt) gsap.to(txt, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const totalCards = certData.length;

        const updateCards = (progressIndex) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - progressIndex;
            const absOffset = Math.abs(offset);

            // 3D Coverflow positioning math
            const x = offset * 320;
            const scale = Math.max(0.7, 1 - absOffset * 0.15);
            const opacity = Math.max(0, 1 - absOffset * 0.4);
            const rotationY = offset * -18;
            const zIndex = 100 - Math.round(absOffset * 10);

            gsap.set(card, {
              x: x,
              scale: scale,
              opacity: opacity,
              rotationY: rotationY,
              zIndex: zIndex,
              transformPerspective: 1000
            });

            if (bgRefs.current[i]) {
              gsap.set(bgRefs.current[i], { opacity: Math.max(0, 1 - absOffset * 0.8) });
            }
            if (textRefs.current[i]) {
              gsap.set(textRefs.current[i], { opacity: Math.max(0, 1 - absOffset * 0.8) });
            }
          });

          setActiveCardIndex(Math.round(progressIndex));
        };

        // Pin section and animate 3D Coverflow on scroll
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${totalCards * 600}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * (totalCards - 1);
            updateCards(p);
          }
        });

        // Initialize position
        updateCards(0);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addToBgs = (el) => {
    if (el && !bgRefs.current.includes(el)) {
      bgRefs.current.push(el);
    }
  };

  const addToTexts = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#050505] text-white overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Watermark Section Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[20vw] font-black text-white/[0.02] uppercase tracking-tighter select-none whitespace-nowrap">
          CERTIFICATIONS
        </h1>
      </div>

      {/* Dynamic Background Red Ambient Glow for Active Certification */}
      {certData.map((_, idx) => (
        <div
          key={idx}
          ref={addToBgs}
          className="absolute inset-0 bg-radial from-red-600/20 via-black/80 to-[#050505] transition-opacity duration-700 pointer-events-none z-0"
          style={{ opacity: idx === 0 ? 1 : 0 }}
        />
      ))}

      {/* Header Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 pt-16 md:pt-20 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold">04</span>
            <span className="text-white/40">|</span>
            <span>VERIFIED CREDENTIALS // 3D COVERFLOW</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            CERTIFICATIONS & BADGES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
              CODGEN INTERNSHIP & INDUSTRY RECOGNITION.
            </span>
          </h2>
        </div>

        {/* Dynamic Episode Tracker Indicator */}
        <div className="text-xs font-mono text-white/50 tracking-widest uppercase flex items-center gap-3">
          <span className="text-red-500 font-bold text-base">{activeCardIndex + 1}</span>
          <span>/</span>
          <span>{certData.length} CREDENTIALS</span>
        </div>
      </div>

      {/* Center 3D Coverflow Stage (Desktop & Mobile) */}
      <div className="relative z-20 w-full my-auto flex items-center justify-center">
        
        {/* DESKTOP VIEW: 3D Stack Stage */}
        <div 
          ref={cardsContainerRef}
          className="hidden md:flex relative w-full max-w-7xl h-[440px] items-center justify-center perspective-[1200px]"
        >
          {certData.map((cert, idx) => (
            <div
              key={idx}
              ref={addToCards}
              className="absolute w-[360px] md:w-[420px] p-7 bg-[#141414]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col justify-between transform-gpu transition-all duration-300 group hover:border-red-600/80"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Specular Crimson Spotlight Hover Layer */}
              <div 
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229,9,20,0.2), transparent 70%)'
                }}
              />

              <div className="space-y-4 relative z-10">
                {/* Header Tag & Credential Code */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-3 py-1 rounded border border-red-600/30 shadow-md">
                    {cert.tag}
                  </span>
                  <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase border border-white/10 px-2.5 py-0.5 rounded bg-black/40">
                    ID: {cert.code}
                  </span>
                </div>

                {/* Certificate Preview Image Box */}
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 bg-black/50 group-hover:border-red-600/40 transition-colors">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[10px] font-mono text-white/70 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    DATE: {cert.date}
                  </span>
                </div>

                {/* Certificate Title & Issuer */}
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300 line-clamp-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-white/50 tracking-wider mt-0.5">
                    ORGANIZATION: <span className="text-white/90 font-bold">{cert.issuer}</span>
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                  {cert.desc}
                </p>
              </div>

              {/* View & Download Buttons */}
              <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex gap-3">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-red-600 text-white font-mono font-bold text-xs uppercase tracking-widest text-center transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                >
                  View Credential
                </button>
                <a
                  href={cert.file}
                  download
                  title="Download Certificate"
                  className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/20 text-white/90 font-mono font-bold text-xs uppercase tracking-widest text-center transition-all duration-300 border border-white/10 hover:border-white/30 cursor-pointer"
                >
                  📥
                </a>
              </div>

              {/* Red Corner Accent Dot */}
              <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-red-600/40 group-hover:bg-red-600 group-hover:shadow-[0_0_12px_#E50914] transition-all pointer-events-none" />
            </div>
          ))}
        </div>

        {/* MOBILE VIEW: Touch Swipeable Horizontal Carousel */}
        <div 
          onScroll={handleScroll}
          className="md:hidden w-full flex items-center gap-6 px-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-8 z-20"
        >
          {certData.map((cert, idx) => (
            <div
              key={`mob-${idx}`}
              ref={addToCards}
              className="shrink-0 w-[85vw] max-w-[360px] snap-center p-6 bg-[#141414] border border-white/15 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/30">
                    {cert.tag}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">ID: {cert.code}</span>
                </div>
                
                <div className="w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-black">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover object-top" />
                </div>

                <h3 className="text-lg font-black text-white">{cert.title}</h3>
                <p className="text-xs font-mono text-white/50">ISSUER: {cert.issuer} ({cert.date})</p>
                <p className="text-xs text-white/70 font-light leading-relaxed">{cert.desc}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex gap-2">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 py-2 rounded-lg bg-red-600 text-white font-mono font-bold text-xs uppercase tracking-wider text-center"
                >
                  View
                </button>
                <a
                  href={cert.file}
                  download
                  className="py-2 px-3 rounded-lg bg-white/10 text-white font-mono text-xs"
                >
                  📥
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Footer Description Ticker */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 flex items-center justify-between text-xs font-mono text-white/40 tracking-widest uppercase">
        <span>SCROLL TO EXPLORE CREDENTIALS</span>
        <span>// NETFLIX PORTFOLIO EDITION</span>
      </div>

      {/* CERTIFICATE PREVIEW MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#141414] border border-red-600/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-4 shadow-[0_0_80px_rgba(229,9,20,0.3)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest bg-red-600/10 px-2 py-0.5 rounded border border-red-600/20">
                    {selectedCert.tag}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">ID: {selectedCert.code}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mt-1">{selectedCert.title}</h3>
                <p className="text-xs font-mono text-white/60">ORGANIZATION: <strong className="text-white">{selectedCert.issuer}</strong> | DATE OF ISSUE: <strong className="text-white">{selectedCert.date}</strong></p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                aria-label="Close Modal"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 text-white font-mono font-bold flex items-center justify-center transition-colors cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Viewer */}
            <div className="relative w-full flex-1 min-h-[300px] max-h-[55vh] overflow-hidden rounded-2xl border border-white/10 bg-black flex items-center justify-center">
              {selectedCert.file.endsWith('.pdf') ? (
                <iframe
                  src={selectedCert.file}
                  title={selectedCert.title}
                  className="w-full h-full min-h-[400px] border-none rounded-xl"
                />
              ) : (
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-w-full max-h-full object-contain rounded-xl"
                />
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="text-xs font-mono text-white/50">
                {selectedCert.verifyUrl && (
                  <span>VERIFICATION URL: <a href={selectedCert.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">{selectedCert.verifyUrl}</a></span>
                )}
              </div>
              <div className="flex gap-3">
                <a
                  href={selectedCert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all"
                >
                  Open Original ↗
                </a>
                <a
                  href={selectedCert.file}
                  download
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-wider font-bold shadow-lg transition-all"
                >
                  Download Document 📥
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;


