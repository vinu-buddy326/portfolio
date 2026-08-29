const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white py-16 px-6 md:px-12 border-t border-white/10 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        
        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/10">
          <div className="space-y-2">
            <div className="text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(220,38,38,0.9)]">
              VINUTHNA<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
            </div>
            <p className="text-xs font-mono text-white/50 tracking-widest uppercase">
              // ARTIFICIAL INTELLIGENCE & DATA SCIENCE PORTFOLIO &bull; 2023 - 2027
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-6 md:gap-8 text-xs font-mono uppercase tracking-widest text-white/70">
            <a href="#home" className="hover:text-red-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-red-500 transition-colors">About</a>
            <a href="#expertise" className="hover:text-red-500 transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-red-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-red-500 transition-colors">Projects</a>
            <a href="#certifications" className="hover:text-red-500 transition-colors">Certifications</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & External Profiles */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono text-white/60">
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/vinu-buddy326" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors uppercase tracking-wider"
            >
              GitHub //
            </a>
            <a 
              href="https://www.linkedin.com/in/vinuthna-vasanthi-addalamitta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors uppercase tracking-wider"
            >
              LinkedIn //
            </a>
            <a 
              href="mailto:vinuthnavasanthi@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors uppercase tracking-wider"
            >
              Email //
            </a>
          </div>

          <div className="text-white/40 tracking-widest uppercase">
            LOCATION: NELLORE, ANDHRA PRADESH, IN
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 text-[11px] font-mono text-white/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Addalamitta Vinuthna Vasanthi. All Rights Reserved.</p>
          <p className="text-red-500/80">BUILT WITH REACT, TAILWIND CSS & GSAP</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
