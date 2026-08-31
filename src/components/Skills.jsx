import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allSkills = [
  { episode: 'EPISODE #01', name: 'Python', level: 90, category: 'Languages', icon: '🐍', tag: 'CORE LANGUAGE', desc: 'Data Structures, ML Models, Scripting, Automation' },
  { episode: 'EPISODE #02', name: 'Machine Learning', level: 85, category: 'AI & ML', icon: '🤖', tag: 'ALGORITHMS', desc: 'Scikit-Learn, Predictive Modeling, SMOTE, Tuning' },
  { episode: 'EPISODE #03', name: 'Artificial Intelligence', level: 85, category: 'AI & ML', icon: '⚡', tag: 'INTELLIGENCE', desc: 'Neural Concepts, Algorithmic Logic, Heuristics' },
  { episode: 'EPISODE #04', name: 'Computer Vision', level: 85, category: 'Vision', icon: '👁️', tag: 'BIOMETRICS', desc: 'OpenCV, Real-Time Facial Recognition, Processing' },
  { episode: 'EPISODE #05', name: 'Data Science & SQL', level: 85, category: 'Data & SQL', icon: '📊', tag: 'ANALYTICS', desc: 'Feature Engineering, Relational Queries, Wrangling' },
  { episode: 'EPISODE #06', name: 'Core Java', level: 80, category: 'Languages', icon: '☕', tag: 'OOP ARCHITECTURE', desc: 'OOP Principles, Exception Handling, System Logic' },
  { episode: 'EPISODE #07', name: 'Core C', level: 75, category: 'Languages', icon: '💻', tag: 'LOW LEVEL', desc: 'Pointers, Memory Allocation, Data Logic' },
  { episode: 'EPISODE #08', name: 'HTML5 & CSS3', level: 85, category: 'Web Tech', icon: '🌐', tag: 'FRONTEND', desc: 'Semantic Layouts, Glassmorphism, Responsive UI' },
  { episode: 'EPISODE #09', name: 'JavaScript (ES6+)', level: 80, category: 'Web Tech', icon: '✨', tag: 'DYNAMIC SCRIPT', desc: 'DOM Manipulation, Async Logic, Modern Frameworks' }
];

const toolTags = [
  'Pandas', 'NumPy', 'Scikit-Learn', 'Git & GitHub', 'VS Code', 
  'Jupyter Notebook', 'Google Colab', 'Arduino IoT', 'SMOTE Analytics'
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const categories = ['ALL', 'AI & ML', 'LANGUAGES', 'VISION', 'DATA & SQL', 'WEB TECH'];

  const filteredSkills = activeFilter === 'ALL'
    ? allSkills
    : allSkills.filter(s => s.category.toUpperCase().includes(activeFilter.toUpperCase()));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.92, rotationX: 15 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 3D Card Hover Physics per card
      cards.forEach((card) => {
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = -((y - centerY) / centerY) * 10;
          const rotateY = ((x - centerX) / centerX) * 10;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        };

        const handleMouseLeave = () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    }, section);

    return () => ctx.revert();
  }, [filteredSkills]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white py-28 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Background Watermark Section Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[25vw] font-black text-white/[0.025] uppercase tracking-tighter select-none">
          SKILLS
        </h1>
      </div>

      {/* Ambient Red Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-red-500 font-bold">03</span>
              <span className="text-white/40">|</span>
              <span>TECHNICAL EPISODES & MASTERY</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              TECHNICAL SKILLS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
                EPISODE SERIES & INSTRUMENTS.
              </span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-black/60 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-lg transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-red-600 text-white font-bold shadow-[0_0_15px_rgba(229,9,20,0.6)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Netflix Episode Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.name}
              ref={addToRefs}
              className="relative p-7 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-300 group hover:border-red-600/60 overflow-hidden flex flex-col justify-between"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Specular Radial Glow on Hover */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229,9,20,0.18), transparent 70%)'
                }}
              ></div>

              <div className="relative z-10 space-y-4">
                {/* Top Badge Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/30">
                    {skill.episode}
                  </span>
                  <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase border border-white/10 px-2 py-0.5 rounded bg-black/40">
                    {skill.tag}
                  </span>
                </div>

                {/* Title & Icon Header */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl filter drop-shadow">{skill.icon}</span>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-[11px] font-mono text-white/40 uppercase tracking-wider">
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* Skill Description */}
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  {skill.desc}
                </p>
              </div>

              {/* Progress Bar & Level Indicator */}
              <div className="relative z-10 pt-5 mt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/50 uppercase tracking-widest text-[10px]">PROFICIENCY</span>
                  <span className="text-red-500 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-400 rounded-full transition-all duration-1000 group-hover:shadow-[0_0_12px_rgba(229,9,20,0.8)]"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>

              {/* Bottom Red Corner Indicator Dot */}
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-red-600/40 group-hover:bg-red-600 group-hover:shadow-[0_0_10px_#E50914] transition-all" />
            </div>
          ))}
        </div>

        {/* Tools & Ecosystem Pills */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs font-mono uppercase tracking-widest text-white/50">
            // DEVELOPER TOOLBOX & ECOSYSTEM
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {toolTags.map((tool, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1 rounded bg-white/[0.03] border border-white/10 text-xs font-mono text-white/80 hover:border-red-600/50 hover:bg-red-600/10 hover:text-white transition-all duration-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
