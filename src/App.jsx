import { useState, useEffect, useCallback } from 'react';
import NetflixPreloader from './components/NetflixPreloader';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    document.title = "Vinuthna Vasanthi";
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen text-white relative selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Cinematic Preloader */}
      {loading && <NetflixPreloader onComplete={handlePreloaderComplete} />}

      {/* Portfolio Sections */}
      <Hero />
      <About />
      <Expertise />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
