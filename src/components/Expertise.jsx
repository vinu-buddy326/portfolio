import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    number: "01",
    title: "Machine Learning & AI",
    text: "Building predictive algorithms, feature engineering pipelines, crop disease classification models, and automated analytics using Scikit-Learn and Python.",
    tag: "INTELLIGENCE & ML",
    gradient: "from-[#1f0a0c] via-[#121212] to-[#0a0a0a]"
  },
  {
    number: "02",
    title: "Computer Vision & Biometrics",
    text: "Developing automated smart attendance tracking systems using OpenCV, real-time webcam facial recognition, and image classification models.",
    tag: "COMPUTER VISION",
    gradient: "from-[#1a0809] via-[#111111] to-[#090909]"
  },
  {
    number: "03",
    title: "Data Analytics & SQL",
    text: "Engineered financial fraud classification pipelines using class imbalance handling (SMOTE), feature selection, and relational database querying.",
    tag: "DATA SCIENCE & SQL",
    gradient: "from-[#220a0d] via-[#131313] to-[#0a0a0a]"
  },
  {
    number: "04",
    title: "IoT & Assistive Tech",
    text: "Designing hardware-software obstacle detection systems for visually impaired navigation using Ultrasonic sensors, Arduino microcontrollers, and real-time alerts.",
    tag: "HARDWARE & IOT",
    gradient: "from-[#1d090b] via-[#101010] to-[#080808]"
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        gsap.to(card, {
          scale: 0.92 - index * 0.025,
          y: -15 - index * 8,
          filter: "blur(6px)",
          opacity: 0.4,
          scrollTrigger: {
            trigger: card,
            start: `top ${90 + index * 20}px`,
            end: "bottom top",
            scrub: true,
          }
        });
      });

      cards.forEach((card) => {
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        };
        card.addEventListener('mousemove', handleMouseMove);
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white py-32 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Background Watermark Section Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[22vw] font-black text-white/[0.03] uppercase tracking-tighter select-none whitespace-nowrap">
          EXPERTISE
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold">02</span>
            <span className="text-white/40">|</span>
            <span>CORE COMPETENCIES</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            DOMAINS & CAPABILITIES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              PRACTICAL AI SOLUTIONS.
            </span>
          </h2>
        </div>

        {/* Stacked Cards */}
        <div className="space-y-8">
          {expertiseData.map((item, idx) => (
            <div
              key={idx}
              ref={addToRefs}
              className={`sticky top-24 p-8 md:p-14 bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group hover:border-red-600/60 transition-all duration-500 overflow-hidden`}
            >
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.12), transparent 70%)'
                }}
              ></div>

              <div className="space-y-4 max-w-2xl relative z-10">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-red-500 font-bold tracking-widest px-3 py-1 rounded bg-red-600/10 border border-red-600/20">
                    {item.tag}
                  </span>
                  <span className="text-white/30 text-xs font-mono">// MODULE {item.number}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                  {item.text}
                </p>
              </div>

              <div className="text-6xl md:text-8xl font-black font-mono text-white/10 group-hover:text-red-600/30 transition-colors relative z-10">
                {item.number}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;
