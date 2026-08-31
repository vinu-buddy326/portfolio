import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: 'ai-ml',
    episode: 'EPISODE #01',
    title: 'AI & Machine Learning',
    tag: 'INTELLIGENCE & ALGORITHMS',
    category: 'AI & ML',
    desc: 'Building predictive algorithms, feature engineering pipelines, crop disease classification models, and automated ML workflows.',
    icon: '🧠',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Machine Learning', level: 90 },
      { name: 'Scikit-Learn', level: 88 },
      { name: 'Feature Engineering', level: 85 },
      { name: 'SMOTE Handling', level: 85 }
    ],
    projects: ['Crop Disease Detection System', 'Predictive Modeling Pipelines'],
    highlights: 'Advanced SMOTE class imbalance handling & hyperparameter optimization.',
    gradient: 'from-red-950/60 via-[#121212] to-[#080808]'
  },
  {
    id: 'vision',
    episode: 'EPISODE #02',
    title: 'Computer Vision & Biometrics',
    tag: 'VISION & BIOMETRICS',
    category: 'VISION',
    desc: 'Developing automated webcam facial recognition & biometric smart attendance tracking systems using OpenCV and Python.',
    icon: '👁️',
    skills: [
      { name: 'OpenCV', level: 92 },
      { name: 'Facial Recognition', level: 90 },
      { name: 'Biometric Tracking', level: 88 },
      { name: 'Image Processing', level: 85 },
      { name: 'Haar Cascades', level: 84 }
    ],
    projects: ['Real-Time Webcam Attendance System', 'Facial Feature Classification'],
    highlights: 'Real-time multi-face detection with automated timestamp logging.',
    gradient: 'from-rose-950/60 via-[#121212] to-[#080808]'
  },
  {
    id: 'data-sql',
    episode: 'EPISODE #03',
    title: 'Data Science & SQL Analytics',
    tag: 'ANALYTICS & DATABASES',
    category: 'DATA SCIENCE',
    desc: 'Engineered financial fraud classification pipelines using class imbalance handling, feature selection, and SQL querying.',
    icon: '📊',
    skills: [
      { name: 'SQL & Relational DBs', level: 90 },
      { name: 'Data Analytics', level: 92 },
      { name: 'Pandas & NumPy', level: 94 },
      { name: 'Financial Fraud Analytics', level: 88 },
      { name: 'Data Cleaning', level: 90 }
    ],
    projects: ['Bank Transaction Fraud Detection', 'SQL Financial Query Pipeline'],
    highlights: 'Handled high-volume transaction datasets with precision classification metrics.',
    gradient: 'from-red-900/50 via-[#121212] to-[#080808]'
  },
  {
    id: 'iot',
    episode: 'EPISODE #04',
    title: 'IoT & Assistive Systems',
    tag: 'HARDWARE & IOT',
    category: 'IOT & HARDWARE',
    desc: 'Designing hardware-software obstacle detection systems for visually impaired navigation using Ultrasonic sensors & Arduino.',
    icon: '⚡',
    skills: [
      { name: 'Arduino Microcontrollers', level: 88 },
      { name: 'IoT Sensors & Circuits', level: 86 },
      { name: 'C/C++ Embedded Logic', level: 85 },
      { name: 'Ultrasonic Navigation', level: 90 },
      { name: 'Buzzer & Haptic Feedback', level: 88 }
    ],
    projects: ['Obstacle Detection Wand for Visually Impaired'],
    highlights: 'Real-time distance calculation & acoustic alert feedback systems.',
    gradient: 'from-rose-900/50 via-[#121212] to-[#080808]'
  },
  {
    id: 'core-logic',
    episode: 'EPISODE #05',
    title: 'Core Programming & Logic',
    tag: 'COMPETITIVE & LOGIC',
    category: 'LOGIC & WEB',
    desc: 'Strong algorithmic problem-solving foundation in Python, Core Java, and C with data structures and object-oriented design.',
    icon: '💻',
    skills: [
      { name: 'Python Core', level: 95 },
      { name: 'Core Java (OOP)', level: 88 },
      { name: 'Core C Language', level: 85 },
      { name: 'Data Structures', level: 86 },
      { name: 'Algorithmic Problem Solving', level: 90 }
    ],
    projects: ['Competitive Programming', 'Algorithmic Solutions'],
    highlights: 'Solid understanding of O(N) complexity analysis and OOP principles.',
    gradient: 'from-red-950/50 via-[#121212] to-[#080808]'
  },
  {
    id: 'web-engineering',
    episode: 'EPISODE #06',
    title: 'Web Engineering & Tools',
    tag: 'FRONTEND & TOOLKIT',
    category: 'LOGIC & WEB',
    desc: 'Building interactive modern web interfaces using HTML5, CSS3, JavaScript, React, Tailwind CSS, VS Code, and Git/GitHub.',
    icon: '🌐',
    skills: [
      { name: 'React & JSX', level: 90 },
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'Tailwind CSS & Styling', level: 94 },
      { name: 'HTML5 / CSS3', level: 95 },
      { name: 'Git & GitHub Version Control', level: 90 }
    ],
    projects: ['Netflix-Themed Portfolio', 'Interactive Web Applications'],
    highlights: 'Responsive dark mode UI, GSAP micro-animations & state management.',
    gradient: 'from-rose-950/50 via-[#121212] to-[#080808]'
  }
];

const categoriesFilter = ['ALL DOMAINS', 'AI & ML', 'VISION', 'DATA SCIENCE', 'IOT & HARDWARE', 'LOGIC & WEB'];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedFilter, setSelectedFilter] = useState('ALL DOMAINS');
  const [activeModalSkill, setActiveModalSkill] = useState(null);

  const filteredCategories = selectedFilter === 'ALL DOMAINS' 
    ? skillCategories 
    : skillCategories.filter(item => item.category === selectedFilter);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      // Staggered Entrance Animation
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // 3D Parallax Tilt Effect on Mouse Move
      cards.forEach((card) => {
        if (!card) return;

        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -8;
          const rotateY = ((x - centerX) / centerX) * 8;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          
          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "power3.out"
          });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    }, section);

    return () => ctx.revert();
  }, [selectedFilter]);

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-28 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Watermark Section Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[25vw] font-black text-white/[0.02] uppercase tracking-tighter select-none whitespace-nowrap">
          SKILLS
        </h1>
      </div>

      {/* Dynamic Crimson Radial Background Glows */}
      <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-red-500 font-bold">03</span>
              <span className="text-white/40">|</span>
              <span>TECHNICAL ECOSYSTEM // 3D PARALLAX & LEVEL METERS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              TECHNICAL SKILLS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
                PRACTICAL AI INSTRUMENTS & PROFICIENCY.
              </span>
            </h2>
          </div>

          <div className="text-xs font-mono text-white/50 tracking-widest uppercase flex items-center gap-3">
            <span className="text-red-500 font-bold text-base">{skillCategories.length}</span>
            <span>DOMAINS</span>
            <span>//</span>
            <span>HIGH IMPACT TECH STACK</span>
          </div>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoriesFilter.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(229,9,20,0.5)] border border-red-500 scale-105'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Holographic Parallax Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredCategories.map((cat, idx) => (
            <div
              key={cat.id || idx}
              ref={addToCards}
              className={`bg-gradient-to-br ${cat.gradient} backdrop-blur-2xl border border-white/15 rounded-3xl p-7 shadow-2xl flex flex-col justify-between group hover:border-red-600/80 hover:shadow-[0_25px_60px_rgba(229,9,20,0.2)] transition-all duration-500 relative overflow-hidden transform-gpu cursor-pointer`}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setActiveModalSkill(cat)}
            >
              {/* Specular Spotlight Layer */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229,9,20,0.22), transparent 70%)'
                }}
              />

              <div className="space-y-5 relative z-10">
                {/* Episode Badge & Category Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-3 py-1 rounded border border-red-600/30">
                    {cat.episode}
                  </span>
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
                </div>

                {/* Title */}
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">
                    {cat.tag}
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                    {cat.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                  {cat.desc}
                </p>
              </div>

              {/* Animated Proficiency Meters Section */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 space-y-3.5">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center justify-between">
                  <span>STACK PROFICIENCY</span>
                  <span className="text-red-500 font-bold text-[11px]">CLICK FOR DETAILS ↗</span>
                </div>

                <div className="space-y-2.5">
                  {cat.skills.slice(0, 3).map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white/90 font-medium">{skill.name}</span>
                        <span className="text-red-500 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/5">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-red-400 group-hover:shadow-[0_0_10px_#E50914] transition-all duration-700"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {cat.skills.length > 3 && (
                  <div className="pt-1 text-[10px] font-mono text-white/40 group-hover:text-white/80 transition-colors">
                    +{cat.skills.length - 3} MORE INSTRUMENTS...
                  </div>
                )}
              </div>

              {/* Accent Corner Dot */}
              <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-red-600/40 group-hover:bg-red-600 group-hover:shadow-[0_0_12px_#E50914] transition-all" />
            </div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 tracking-widest uppercase gap-4">
          <span>ADDALAMITTA VINUTHNA VASANTHI // TECH ECOSYSTEM</span>
          <span>ARTIFICIAL INTELLIGENCE & DATA SCIENCE</span>
        </div>

      </div>

      {/* SKILL SPOTLIGHT MODAL */}
      {activeModalSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#141414] border border-red-600/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-[0_0_80px_rgba(229,9,20,0.35)]">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-red-500 bg-red-600/10 px-3 py-1 rounded border border-red-600/30 uppercase tracking-widest">
                  {activeModalSkill.episode} // {activeModalSkill.tag}
                </span>
                <h3 className="text-2xl font-black text-white flex items-center gap-2 mt-2">
                  <span>{activeModalSkill.icon}</span>
                  <span>{activeModalSkill.title}</span>
                </h3>
              </div>
              <button
                onClick={() => setActiveModalSkill(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 text-white font-mono font-bold flex items-center justify-center transition-colors cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <p className="text-sm text-white/80 leading-relaxed font-light">
                {activeModalSkill.desc}
              </p>

              {/* Full Skill Meter List */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-red-500 font-bold uppercase tracking-wider">
                  INSTRUMENT PROFICIENCY METRICS:
                </h4>
                <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-white/10">
                  {activeModalSkill.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white font-semibold">{skill.name}</span>
                        <span className="text-red-500 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/5">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-red-400 shadow-[0_0_12px_#E50914]"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight Projects */}
              {activeModalSkill.projects && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider">
                    REAL-WORLD APPLICATIONS IMPLEMENTED:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalSkill.projects.map((proj, pIdx) => (
                      <span key={pIdx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/90">
                        🚀 {proj}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 pt-4 flex justify-end">
              <button
                onClick={() => setActiveModalSkill(null)}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-wider font-bold shadow-lg transition-all cursor-pointer"
              >
                Close Technical Deep Dive
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;


