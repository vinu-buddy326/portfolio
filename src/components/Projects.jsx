import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Authentic Project Data for Addalamitta Vinuthna Vasanthi
const projectsData = [
  {
    title: "Smart Attendance System",
    category: "AI & Computer Vision",
    description: "Automated webcam facial recognition & biometric attendance tracking system using OpenCV, Machine Learning, and Python.",
    tags: ["Python", "OpenCV", "Machine Learning", "Biometrics"],
    match: "99%",
    episode: "PROJECT #01",
    link: "https://github.com/vinu-buddy326"
  },
  {
    title: "Crop Disease Prediction",
    category: "Machine Learning & AgriTech",
    description: "AI image classification model for early crop disease detection using machine learning algorithms to assist farmers.",
    tags: ["Python", "Machine Learning", "Image AI", "Scikit-Learn"],
    match: "98%",
    episode: "PROJECT #02",
    link: "https://github.com/vinu-buddy326"
  },
  {
    title: "Bank Fraud Detection",
    category: "Data Analytics & Financial ML",
    description: "End-to-end machine learning pipeline for financial fraud classification using feature selection, SMOTE imbalance handling, and model tuning.",
    tags: ["Python", "Scikit-Learn", "SQL", "SMOTE"],
    match: "97%",
    episode: "PROJECT #03",
    link: "https://github.com/vinu-buddy326"
  },
  {
    title: "Smart Walking Detector",
    category: "IoT & Assistive Tech",
    description: "Assistive hardware-software obstacle detection system for visually impaired navigation using Ultrasonic sensors & Arduino.",
    tags: ["Arduino", "IoT", "Sensors", "C/C++"],
    match: "96%",
    episode: "PROJECT #04",
    link: "https://github.com/vinu-buddy326"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (folderBackRef.current && folderFrontRef.current) {
        gsap.set([folderBackRef.current, folderFrontRef.current], { 
          xPercent: -50, 
          yPercent: -50,
          opacity: 1,
          scale: 1
        });
        gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });
      }

      const getGridPos = (index) => {
        let row = Math.floor(index / 2);
        let col = index % 2;
        return { row, col };
      };

      const validCards = cardsRef.current.filter(Boolean);

      validCards.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
          opacity: 1
        });
      });

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        let floatTween;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 50%", 
            end: "bottom 50%",
            toggleActions: "play reverse play reverse",
            onEnter: () => { if (floatTween) floatTween.kill(); },
            onEnterBack: () => { if (floatTween) floatTween.kill(); },
            onLeave: () => { if (floatTween) floatTween.kill(); },
            onLeaveBack: () => { if (floatTween) floatTween.kill(); }
          },
          onComplete: () => {
            floatTween = gsap.to(validCards, {
              y: "+=10",
              rotation: "+=1",
              duration: 3,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              stagger: { amount: 1, from: "random" }
            });
          }
        });

        // 1. Folder flap opens
        if (folderFrontRef.current) {
          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 1,
            ease: "power3.inOut"
          });
        }

        // 2. Cards rise up collectively
        tl.to(validCards, {
          y: -120,
          scale: 0.9,
          zIndex: 70,
          duration: 0.5,
          stagger: 0.04,
          ease: "back.out(1.2)"
        }, "-=0.5");

        // 3. Cards spread out into 2x2 grid layout
        tl.to(validCards, {
          x: (i) => {
            const w = 400;
            const gap = 50;
            const { col } = getGridPos(i);
            return (col - 0.5) * (w + gap);
          },
          y: (i) => {
            const h = 260;
            const gap = 40;
            const { row } = getGridPos(i);
            return (row - 0.5) * (h + gap);
          },
          rotation: () => gsap.utils.random(-2, 2),
          scale: 1,
          duration: 1.2,
          stagger: { amount: 0.3, from: "center" },
          ease: "expo.out"
        }, "-=0.2");

        // 4. Disappear / fade out the empty folder container so it does NOT stay behind!
        if (folderBackRef.current && folderFrontRef.current) {
          tl.to([folderBackRef.current, folderFrontRef.current], {
            opacity: 0,
            scale: 0.6,
            duration: 0.6,
            ease: "power2.out"
          }, "-=0.8");
        }
      });

      // 3D Tilt Hover physics for project cards
      validCards.forEach((card) => {
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        };
        card.addEventListener('mousemove', handleMouseMove);
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="bg-[#050505] min-h-screen relative font-sans overflow-hidden text-white w-full flex flex-col items-center justify-center py-24 md:py-36 select-none"
    >
      {/* Background Watermark Text: PROJECTS */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[22vw] font-black text-white/[0.025] tracking-tighter leading-none whitespace-nowrap uppercase">
          PROJECTS
        </h1>
      </div>

      {/* Crimson Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-red-600/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Section Header */}
      <div className="relative z-20 max-w-7xl w-full px-6 md:px-12 mb-12 flex flex-col items-start space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
          <span className="text-red-500 font-bold">04</span>
          <span className="text-white/40">|</span>
          <span>FEATURED PRODUCTIONS</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          PROJECT RELEASES <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
            AI & MACHINE LEARNING INVENTIONS.
          </span>
        </h2>
      </div>

      {/* DESKTOP VIEW: Animated Unfolding Grid */}
      <div className="hidden md:flex relative w-full max-w-7xl h-[650px] items-center justify-center perspective-[2000px] z-10">
        <div className="relative w-0 h-0 transform-style-3d">
          
          {/* Folder Back (Fades out cleanly after opening) */}
          <div 
            ref={folderBackRef}
            className="absolute w-[340px] aspect-video bg-[#141414] rounded-[24px] border border-red-600/40 shadow-[0_20px_50px_rgba(229,9,20,0.25)] flex items-center justify-center pointer-events-none"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-5 left-6 w-28 h-6 bg-[#1f1f1f] rounded-t-xl border-t border-red-600/30" />
            <div className="relative z-10 text-red-600 font-mono font-black text-xl tracking-widest uppercase opacity-60">
              PROJECT_SLOTS
            </div>
          </div>

          {/* Desktop Project Cards */}
          {projectsData.map((project, i) => (
            <div 
              key={i}
              ref={addToCards}
              className="absolute w-[380px] aspect-[16/10.5] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.95)] transition-all duration-500 group hover:scale-[1.04] hover:border-red-600 hover:shadow-[0_35px_80px_rgba(229,9,20,0.4)] cursor-pointer relative z-10 p-7 flex flex-col justify-between"
              >
                {/* Specular Glow */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  style={{
                    background: 'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229,9,20,0.2), transparent 70%)'
                  }}
                ></div>

                {/* Top Card Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/20">
                    {project.episode}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
                    <span className="text-[10px] font-mono border border-white/30 px-1.5 py-0.5 text-white/70 rounded">AI / ML</span>
                  </div>
                </div>

                {/* Middle Title & Description */}
                <div className="relative z-10 space-y-2 my-auto">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech Tags & Link */}
                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded group-hover:border-red-600/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Code <span>&rarr;</span>
                  </span>
                </div>
              </a>
            </div>
          ))}

          {/* Folder Front Flap (Fades out cleanly after opening) */}
          <div 
            ref={folderFrontRef}
            className="absolute w-[340px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-red-600/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE VIEW: Ultra User-Friendly Professional Grid */}
      <div className="md:hidden relative z-20 max-w-7xl w-full px-6 grid grid-cols-1 gap-6">
        {projectsData.map((project, i) => (
          <a
            key={`mob-${i}`}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-6 bg-[#141414] border border-white/15 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.9)] active:scale-[0.98] transition-transform space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/30">
                {project.episode}
              </span>
              <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
            </div>

            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                {project.category}
              </div>
              <h3 className="text-xl font-black text-white">{project.title}</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">{project.description}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-[11px] font-mono text-red-500 font-bold uppercase tracking-wider flex items-center gap-1">
                View Code &rarr;
              </span>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
};

export default Projects;
