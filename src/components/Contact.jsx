import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  
  // Form State tracking
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.permission) {
      alert("Please accept the contact permission checkbox.");
      return;
    }
    alert(`Thank you, ${formData.firstName}! Your message has been sent successfully.`);
    setFormData({ firstName: '', lastName: '', email: '', message: '', permission: false });
  };

  return (
    <section ref={ref} id="contact" className="bg-[#0b0b0b] w-full min-h-screen relative overflow-hidden flex items-center justify-center py-28 px-4 md:px-8 border-t border-white/10 select-none">
      
      {/* Background Red Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Background Watermark Text: CONTACT */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12 opacity-10"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-red-600 uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          CONTACT
        </h1>
      </motion.div>

      {/* Centered Form Card Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex items-center justify-center my-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#141414]/95 backdrop-blur-2xl border border-white/15 w-full p-8 md:p-12 text-white flex flex-col justify-between rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative overflow-hidden"
        >
          {/* Subtle top crimson accent stripe */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-90"></div>

          {/* Card Header */}
          <div className="flex items-center justify-between mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-red-600/10 border border-red-600/30 text-xs font-mono uppercase tracking-widest text-red-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              <span>05 // GET IN TOUCH</span>
            </div>
            <span className="text-xs font-mono text-white/40 tracking-wider hidden md:block">
              // LET'S BUILD INTELLIGENT AI SYSTEMS
            </span>
          </div>

          <form action="https://formsubmit.co/vinuthnavasanthi@gmail.com" method="POST" onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
            <input type="hidden" name="_subject" value="New Portfolio Inquiry for Vinuthna Vasanthi" />
            <input type="hidden" name="_captcha" value="false" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* First Name */}
              <div className="flex flex-col gap-2 text-left">
                <label htmlFor="firstName" className="text-xs font-mono uppercase tracking-widest text-white/60">
                  FIRST NAME <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Vinuthna"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-white/20 font-mono"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-2 text-left">
                <label htmlFor="lastName" className="text-xs font-mono uppercase tracking-widest text-white/60">
                  LAST NAME <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Vasanthi"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-white/20 font-mono"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2 text-left w-full">
              <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-white/60">
                EMAIL ADDRESS <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="vinuthnavasanthi@gmail.com"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-white/20 font-mono"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2 text-left w-full">
              <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-white/60">
                MESSAGE / INQUIRY <span className="text-red-500">*</span>
              </label>
              <textarea 
                id="message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, research, or collaboration ideas..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-white/20 font-mono resize-none"
              />
            </div>

            {/* Permission & Submit Button */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-white/10">
              <label className="flex items-center gap-3 cursor-pointer text-xs font-mono text-white/70">
                <input 
                  type="checkbox"
                  id="permission"
                  name="permission"
                  checked={formData.permission}
                  onChange={handleChange}
                  className="w-4 h-4 accent-red-600 rounded bg-black/40 border-white/20 cursor-pointer"
                />
                <span>I agree to be contacted regarding my message.</span>
              </label>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(229,9,20,0.6)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Message</span>
                <span>&rarr;</span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>

    </section>
  );
};

export default Contact;
