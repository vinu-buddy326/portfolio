import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: 'Programming Languages',
    tag: 'LANGUAGES',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 85 },
      { name: 'Core Java', level: 80 },
      { name: 'Core C', level: 75 }
    ]
  },
  {
    category: 'AI & Machine Learning',
    tag: 'AI / ML',
    skills: [
      { name: 'Machine Learning', level: 85 },
      { name: 'Artificial Intelligence', level: 85 },
      { name: 'Data Science & Analytics', level: 85 },
      { name: 'Object-Oriented Programming', level: 80 }
    ]
  },
  {
    category: 'Vision & Web Tech',
    tag: 'VISION & WEB',
    skills: [
      { name: 'OpenCV Biometrics', level: 85 },
      { name: 'HTML5 & CSS3', level: 85 },
      { name: 'JavaScript (ES6+)', level: 80 },
      { name: 'Responsive UI Design', level: 85 }
    ]
  }
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
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      cardRefs.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-[#0b0b0b] text-white py-24 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Background Watermark Section Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[25vw] font-black text-white/[0.03] uppercase tracking-tighter select-none">
          SKILLS
        </h1>
      </div>

      {/* Ambient Crimson Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-black/80 backdrop-blur-xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold">03</span>
            <span className="text-white/40">|</span>
            <span>TECHNICAL EXPERTISE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            TECHNICAL & CORE SKILLS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
              PROFICIENCY & TOOLSET.
            </span>
          </h2>
        </div>

        {/* Skills Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group, gIdx) => (
            <div
              key={gIdx}
              ref={addToRefs}
              className="p-8 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col justify-between group hover:border-red-600/60 transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/20">
                    {group.tag}
                  </span>
                  <span className="text-xs font-mono text-white/30">[ 0{gIdx + 1} ]</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors">
                  {group.category}
                </h3>
                <div className="space-y-4 pt-2">
                  {group.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono font-semibold">
                        <span className="text-white/90">{skill.name}</span>
                        <span className="text-red-500 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tools & Soft Skills Card */}
        <div
          ref={addToRefs}
          className="p-8 md:p-10 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 hover:border-red-600/60 transition-all duration-300"
        >
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              🛠 Frameworks, Libraries & Platforms
            </h4>
            <div className="flex flex-wrap gap-2">
              {toolTags.map((tool, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:border-red-600/50 hover:bg-red-600/20 hover:scale-105 transition-all"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              🌟 Soft Skills & Professional Strengths
            </h4>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((soft, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:border-red-600/50 hover:bg-red-600/20 hover:scale-105 transition-all"
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
