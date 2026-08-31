import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allSkills = [
  { name: 'Python', level: 90, category: 'Languages', icon: '🐍', desc: 'Data Structures, ML Models, Scripting' },
  { name: 'Machine Learning', level: 85, category: 'AI & ML', icon: '🤖', desc: 'Scikit-Learn, Predictive Algorithms' },
  { name: 'Artificial Intelligence', level: 85, category: 'AI & ML', icon: '⚡', desc: 'Neural Concepts, Algorithmic Logic' },
  { name: 'Data Science & SQL', level: 85, category: 'Data & SQL', icon: '📊', desc: 'Data Wrangling, Queries, Analytics' },
  { name: 'OpenCV Biometrics', level: 85, category: 'Vision', icon: '👁️', desc: 'Facial Recognition, Image Processing' },
  { name: 'Core Java', level: 80, category: 'Languages', icon: '☕', desc: 'OOP Principles, System Development' },
  { name: 'Core C', level: 75, category: 'Languages', icon: '💻', desc: 'Pointers, Low-Level Logic' },
  { name: 'HTML5 & CSS3', level: 85, category: 'Web Tech', icon: '🌐', desc: 'Semantic Layouts, Responsive UI' },
  { name: 'JavaScript (ES6+)', level: 80, category: 'Web Tech', icon: '✨', desc: 'DOM, Dynamic Web Logic' },
];

const toolTags = [
  'Pandas', 'NumPy', 'Scikit-Learn', 'Git & GitHub', 'VS Code', 
  'Jupyter Notebook', 'Google Colab', 'Arduino IoT', 'SMOTE Analytics'
];

const softSkills = [
  'Problem Solving', 'Team Leadership', 'Communication', 'Adaptability', 'Hackathon Collaboration'
];

const Skills = () => {
  const sectionRef = useRef(null);
  const arcContainerRef = useRef(null);
  const skillNodesRef = useRef([]);
  const centerHubRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(allSkills[0]);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredSkills = activeFilter === 'ALL' 
    ? allSkills 
    : allSkills.filter(s => s.category.toUpperCase().includes(activeFilter.toUpperCase()) || activeFilter === 'ALL');

  useEffect(() => {
    const section = sectionRef.current;
    const arcContainer = arcContainerRef.current;
    const nodes = skillNodesRef.current.filter(Boolean);

    if (!section || !arcContainer || !nodes.length) return;

    // --- GSAP CURVED ARC SCROLL ANIMATION ---
    const ctx = gsap.context(() => {
      // Entrance timeline: skills fan out in half-circle arc formation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate Center Hub
      if (centerHubRef.current) {
        tl.fromTo(centerHubRef.current, 
          { scale: 0, opacity: 0, rotation: -45 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'back.out(1.4)' }
        );
      }

      // Animate Arc Skills Nodes sequentially into curved arc formation
      tl.fromTo(nodes,
        { 
          scale: 0, 
          opacity: 0, 
          y: 80,
          rotation: -25 
        },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          rotation: 0,
          duration: 0.9, 
          stagger: 0.08, 
          ease: 'power3.out' 
        },
        '-=0.6'
      );

      // Scroll scrubbing rotation effect along the curved arc formation
      gsap.to(arcContainer, {
        rotation: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }, section);

    return () => ctx.revert();
  }, [filteredSkills]);

  const addToNodes = (el) => {
    if (el && !skillNodesRef.current.includes(el)) {
      skillNodesRef.current.push(el);
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-[#070707] text-white py-24 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[25vw] font-black text-white/[0.025] uppercase tracking-tighter select-none">
          SKILLS
        </h1>
      </div>

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-red-500 font-bold">03</span>
              <span className="text-white/40">|</span>
              <span>CIRCULAR SKILL FORMATION</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              EXPERTISE & SKILLS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
                CURVED ARC ANIMATION.
              </span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-black/60 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            {['ALL', 'LANGUAGES', 'AI & ML', 'VISION', 'WEB TECH'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  skillNodesRef.current = [];
                  setActiveFilter(cat);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-red-600 text-white font-bold shadow-[0_0_15px_rgba(229,9,20,0.6)] scale-105'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- CIRCULAR / ARC-STYLE FORMATION DISPLAY --- */}
        <div className="relative min-h-[520px] md:min-h-[580px] w-full flex items-center justify-center pt-8 pb-12 overflow-hidden">
          
          {/* Half-Circle / Circular Radial Arc Guides */}
          <div className="absolute w-[500px] h-[500px] md:w-[680px] md:h-[680px] rounded-full border border-dashed border-red-600/20 pointer-events-none animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full border border-red-600/10 pointer-events-none"></div>

          {/* Center Hub Card */}
          <div
            ref={centerHubRef}
            className="absolute z-20 w-44 h-44 md:w-56 md:h-56 rounded-full bg-[#121212]/95 border-2 border-red-600/60 shadow-[0_0_50px_rgba(229,9,20,0.35)] backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center transition-all duration-500 group hover:scale-105"
          >
            <span className="text-3xl md:text-4xl mb-1 group-hover:scale-125 transition-transform duration-300">{activeSkill.icon}</span>
            <h4 className="text-sm md:text-base font-black text-white leading-tight uppercase tracking-tight">{activeSkill.name}</h4>
            <div className="mt-2 text-xl md:text-2xl font-mono font-extrabold text-red-500">{activeSkill.level}%</div>
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest mt-1">{activeSkill.category}</span>
          </div>

          {/* Curved Arc Skill Nodes Container */}
          <div ref={arcContainerRef} className="relative w-full h-full max-w-5xl flex items-center justify-center">
            {filteredSkills.map((skill, index) => {
              const total = filteredSkills.length;
              // Compute angle along semi-circle arc (-80deg to +80deg)
              const startAngle = -80;
              const endAngle = 80;
              const angleStep = total > 1 ? (endAngle - startAngle) / (total - 1) : 0;
              const currentAngle = startAngle + index * angleStep;

              // Radial position calculations for half-circle arc formation
              const radius = window.innerWidth < 768 ? 160 : 250;
              const angleRad = (currentAngle * Math.PI) / 180;
              const x = radius * Math.sin(angleRad);
              const y = -radius * Math.cos(angleRad) + (window.innerWidth < 768 ? 20 : 40);

              const isActive = activeSkill.name === skill.name;

              return (
                <div
                  key={skill.name}
                  ref={addToNodes}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onClick={() => setActiveSkill(skill)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    transition: 'transform 0.4s ease-out, box-shadow 0.3s ease, border-color 0.3s ease'
                  }}
                  className={`absolute cursor-pointer z-30 p-3.5 md:p-4 rounded-2xl bg-[#161616]/95 backdrop-blur-xl border transition-all duration-300 flex items-center gap-3 w-[160px] md:w-[200px] shadow-xl group hover:z-40 hover:scale-110 ${
                    isActive
                      ? 'border-red-600 shadow-[0_0_30px_rgba(229,9,20,0.6)] bg-red-950/30'
                      : 'border-white/10 hover:border-red-600/70 hover:shadow-[0_0_20px_rgba(229,9,20,0.3)]'
                  }`}
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center text-lg md:text-xl font-bold group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs md:text-sm font-bold text-white truncate group-hover:text-red-500 transition-colors">
                      {skill.name}
                    </span>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-red-500">{skill.level}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Tools & Soft Skills Bento Card */}
        <div className="p-8 md:p-10 bg-[#121212]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 hover:border-red-600/50 transition-all duration-300">
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold flex items-center gap-2">
              <span>🛠</span> Frameworks, Libraries & Platforms
            </h4>
            <div className="flex flex-wrap gap-2">
              {toolTags.map((tool, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:border-red-600/60 hover:bg-red-600/20 hover:scale-105 transition-all cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold flex items-center gap-2">
              <span>🌟</span> Soft Skills & Professional Strengths
            </h4>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((soft, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:border-red-600/60 hover:bg-red-600/20 hover:scale-105 transition-all cursor-default"
                >
                  {soft}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
