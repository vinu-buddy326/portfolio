import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Tailored Skill Categories for Addalamitta Vinuthna Vasanthi
const skillCategories = [
  {
    episode: 'EPISODE #01',
    title: 'AI & Machine Learning',
    tag: 'INTELLIGENCE & ALGORITHMS',
    desc: 'Building predictive algorithms, feature engineering pipelines, crop disease classification models, and automated ML workflows.',
    skills: ['Python', 'Machine Learning', 'Scikit-Learn', 'Feature Engineering', 'SMOTE Handling']
  },
  {
    episode: 'EPISODE #02',
    title: 'Computer Vision & Biometrics',
    tag: 'VISION & BIOMETRICS',
    desc: 'Developing automated webcam facial recognition & biometric smart attendance tracking systems using OpenCV and Python.',
    skills: ['OpenCV', 'Facial Recognition', 'Biometric Tracking', 'Image Processing', 'Python']
  },
  {
    episode: 'EPISODE #03',
    title: 'Data Science & SQL Analytics',
    tag: 'ANALYTICS & DATABASES',
    desc: 'Engineered financial fraud classification pipelines using class imbalance handling, feature selection, and SQL querying.',
    skills: ['SQL', 'Data Analytics', 'Pandas', 'NumPy', 'Financial Fraud Analytics']
  },
  {
    episode: 'EPISODE #04',
    title: 'IoT & Assistive Systems',
    tag: 'HARDWARE & IOT',
    desc: 'Designing hardware-software obstacle detection systems for visually impaired navigation using Ultrasonic sensors & Arduino.',
    skills: ['Arduino', 'IoT Sensors', 'C/C++', 'Ultrasonic Navigation', 'Hardware Logic']
  },
  {
    episode: 'EPISODE #05',
    title: 'Core Programming & Logic',
    tag: 'COMPETITIVE & LOGIC',
    desc: 'Strong algorithmic problem-solving foundation in Python, Core Java, and C with data structures and object-oriented design.',
    skills: ['Python', 'Core Java', 'Core C', 'Data Structures', 'Algorithmic Logic']
  },
  {
    episode: 'EPISODE #06',
    title: 'Web Engineering & Tools',
    tag: 'FRONTEND & TOOLKIT',
    desc: 'Building interactive modern web interfaces using HTML5, CSS3, JavaScript, React, Tailwind CSS, VS Code, and Git/GitHub.',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Tailwind CSS', 'Git & GitHub']
  }
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Mobile Swipe Handler
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
        const totalCards = skillCategories.length;

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
      id="skills"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#050505] text-white overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Watermark Section Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[25vw] font-black text-white/[0.02] uppercase tracking-tighter select-none">
          SKILLS
        </h1>
      </div>

      {/* Dynamic Background Red Ambient Glow for Active Skill */}
      {skillCategories.map((_, idx) => (
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
            <span className="text-red-500 font-bold">03</span>
            <span className="text-white/40">|</span>
            <span>EPISODE THREE // COVERFLOW CAROUSEL</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            TECHNICAL SKILLS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
              EPISODE 3 COVERFLOW ANIMATION.
            </span>
          </h2>
        </div>

        {/* Dynamic Episode Tracker Indicator */}
        <div className="text-xs font-mono text-white/50 tracking-widest uppercase flex items-center gap-3">
          <span className="text-red-500 font-bold text-base">{activeCardIndex + 1}</span>
          <span>/</span>
          <span>{skillCategories.length} EPISODES</span>
        </div>
      </div>

      {/* Center 3D Coverflow Stage (Desktop & Mobile) */}
      <div className="relative z-20 w-full my-auto flex items-center justify-center">
        
        {/* DESKTOP VIEW: 3D Stack Stage */}
        <div 
          ref={cardsContainerRef}
          className="hidden md:flex relative w-full max-w-7xl h-[420px] items-center justify-center perspective-[1200px]"
        >
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              ref={addToCards}
              className="absolute w-[360px] md:w-[420px] p-8 bg-[#141414]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col justify-between transform-gpu transition-all duration-300 group hover:border-red-600/80"
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
                {/* Header Tag & Episode Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-3 py-1 rounded border border-red-600/30 shadow-md">
                    {cat.episode}
                  </span>
                  <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase border border-white/10 px-2.5 py-0.5 rounded bg-black/40">
                    {cat.tag}
                  </span>
                </div>

                {/* Category Title */}
                <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                  {cat.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              {/* Skills Tags Grid */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 space-y-3">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  STACK INSTRUMENTS:
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/90 group-hover:border-red-600/40 group-hover:bg-red-600/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Red Corner Accent Dot */}
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600/40 group-hover:bg-red-600 group-hover:shadow-[0_0_12px_#E50914] transition-all" />
            </div>
          ))}
        </div>

        {/* MOBILE VIEW: Touch Swipeable Horizontal Carousel */}
        <div 
          onScroll={handleScroll}
          className="md:hidden w-full flex items-center gap-6 px-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-8 z-20"
        >
          {skillCategories.map((cat, idx) => (
            <div
              key={`mob-${idx}`}
              ref={addToCards}
              className="shrink-0 w-[85vw] max-w-[360px] snap-center p-7 bg-[#141414] border border-white/15 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/30">
                    {cat.episode}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">{cat.tag}</span>
                </div>
                <h3 className="text-xl font-black text-white">{cat.title}</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed">{cat.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  INSTRUMENTS:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-1 rounded bg-white/5 text-[11px] font-mono text-white/80">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Footer Description Ticker */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 flex items-center justify-between text-xs font-mono text-white/40 tracking-widest uppercase">
        <span>SCROLL TO EXPLORE EPISODES</span>
        <span>// NETFLIX PORTFOLIO EDITION</span>
      </div>
    </section>
  );
};

export default Skills;
