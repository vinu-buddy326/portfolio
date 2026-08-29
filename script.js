/* ==========================================================================
   NETFLIX PORTFOLIO - INTERACTIVE JAVASCRIPT
   Owner: Addalamitta Vinuthna Vasanthi
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Project Details Registry for Modal Popups
  const projectData = {
    'attendance': {
      title: 'Smart Attendance System',
      category: 'AI & Computer Vision',
      matchScore: '99% Match',
      year: '2026',
      ageRating: '18+ AI',
      tags: ['Python', 'OpenCV', 'Machine Learning', 'Facial Recognition'],
      image: 'face-recognition-attendence-system.jpeg',
      description: 'Developed an automated smart attendance tracking system leveraging Python, Machine Learning algorithms, and OpenCV for real-time webcam facial recognition and biometric identity verification.',
      github: 'https://github.com/vinu-buddy326',
      demo: 'https://github.com/vinu-buddy326'
    },
    'crop-disease': {
      title: 'Crop Disease Prediction System',
      category: 'Machine Learning & AgriTech',
      matchScore: '98% Match',
      year: '2025',
      ageRating: 'AgriTech',
      tags: ['Python', 'Machine Learning', 'Image AI', 'Scikit-Learn'],
      image: 'crop-disease-detection-system.jpeg',
      description: 'Built an AI image classification model for early crop disease detection using machine learning algorithms. The system analyzes leaf imagery to provide actionable treatment suggestions for farmers.',
      github: 'https://github.com/vinu-buddy326',
      demo: 'https://github.com/vinu-buddy326'
    },
    'fraud-detection': {
      title: 'Bank Transaction Fraud Detection System',
      category: 'Data Analytics & Financial ML',
      matchScore: '97% Match',
      year: '2025',
      ageRating: 'FinTech',
      tags: ['Python', 'Scikit-Learn', 'SQL', 'Imbalance Handling'],
      image: 'bank-transaction-fraud-detection-system.jpeg',
      description: 'Engineered an end-to-end machine learning pipeline for financial fraud classification using feature selection, class imbalance techniques (SMOTE), and rigorous hyperparameter tuning.',
      github: 'https://github.com/vinu-buddy326',
      demo: 'https://github.com/vinu-buddy326'
    },
    'walking-obstacle': {
      title: 'Smart Walking Obstacle Detection System',
      category: 'IoT & Assistive Tech',
      matchScore: '96% Match',
      year: '2025',
      ageRating: 'IoT Hardware',
      tags: ['Arduino', 'IoT', 'Ultrasonic Sensors', 'Real-Time Alerts'],
      image: 'WhatsApp Image 2026-07-27 at 9.40.12 PM.jpeg',
      description: 'Designed a smart hardware-software obstacle detection system for visually impaired navigation using Ultrasonic sensors, Arduino microcontrollers, and real-time haptic/audio warnings.',
      github: 'https://github.com/vinu-buddy326',
      demo: 'https://github.com/vinu-buddy326'
    }
  };

  // Web Audio Synthesizer for Netflix "Ta-Dum" Sound
  function playNetflixSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Sound 1: Sub Bass Boom ("TA-")
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(80, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.4);
      gain1.gain.setValueAtTime(0.5, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.5);

      // Sound 2: Dramatic Chord Hits ("-DUM")
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(110, ctx.currentTime);
        gain2.gain.setValueAtTime(0.8, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 1.2);
      }, 250);
    } catch (e) {
      console.log('Audio Context error:', e);
    }
  }

  // Intro Screen Handler
  const netflixIntro = document.getElementById('netflix-intro');
  const startIntroBtn = document.getElementById('start-intro-btn');
  const profileSelector = document.getElementById('profile-selector');

  if (startIntroBtn) {
    startIntroBtn.addEventListener('click', () => {
      playNetflixSound();
      if (netflixIntro) {
        netflixIntro.classList.add('hidden');
      }
    });
  }

  // Profile Selector Handler ("Who's Watching?")
  const profileItems = document.querySelectorAll('.profile-item');
  profileItems.forEach(item => {
    item.addEventListener('click', (e) => {
      playNetflixSound();
      const role = item.getAttribute('data-role');
      if (profileSelector) {
        profileSelector.classList.add('hidden');
      }
      
      // Update active profile indicator in top header
      const avatarSm = document.getElementById('user-avatar-initials');
      if (avatarSm) {
        avatarSm.textContent = role ? role.substring(0, 2).toUpperCase() : 'VV';
      }
    });
  });

  // Manage profiles button resets to profile selector
  const switchProfileBtn = document.getElementById('switch-profile-btn');
  if (switchProfileBtn) {
    switchProfileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (profileSelector) {
        profileSelector.classList.remove('hidden');
      }
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.nf-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Real-time Search Filter
  const searchInput = document.getElementById('nf-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.nf-card, .rank-card, .cert-card');
      
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Netflix Detail Modal Logic
  const modalBackdrop = document.getElementById('nf-modal-backdrop');
  const modalCloseBtn = document.getElementById('nf-modal-close');
  const modalBanner = document.getElementById('modal-banner');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalMatch = document.getElementById('modal-match');
  const modalYear = document.getElementById('modal-year');
  const modalAge = document.getElementById('modal-age');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalGithubBtn = document.getElementById('modal-github-btn');
  const modalDemoBtn = document.getElementById('modal-demo-btn');

  function openModal(projectId) {
    const data = projectData[projectId] || projectData['attendance'];
    
    if (modalBanner) modalBanner.style.backgroundImage = `url('${data.image}')`;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalMatch) modalMatch.textContent = data.matchScore;
    if (modalYear) modalYear.textContent = data.year;
    if (modalAge) modalAge.textContent = data.ageRating;
    if (modalDesc) modalDesc.textContent = data.description;
    if (modalGithubBtn) modalGithubBtn.href = data.github;
    if (modalDemoBtn) modalDemoBtn.href = data.demo;

    if (modalTags) {
      modalTags.innerHTML = data.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join(' ');
    }

    if (modalBackdrop) {
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Attach modal trigger to cards
  document.querySelectorAll('[data-project]').forEach(el => {
    el.addEventListener('click', () => {
      const pid = el.getAttribute('data-project');
      openModal(pid);
    });
  });

  // Sound Toggle Button (ambient synth music)
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  let isMuted = true;
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      soundToggleBtn.innerHTML = isMuted ? '🔇' : '🔊';
      if (!isMuted) {
        playNetflixSound();
      }
    });
  }

  // FormSubmit Toast Notification check
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('sent') === '1') {
    const toast = document.getElementById('toast-notification');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    }
  }
});
