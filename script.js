// Smooth GSAP animations & scroll effects
gsap.registerPlugin(ScrollTrigger);

const easeDefault = "power2.inOut";

// Page load hero animations
window.addEventListener("load", () => {
  const tlHero = gsap.timeline({ defaults: { ease: easeDefault } });

  tlHero
    .from(".hero__eyebrow", {
      x: -40,
      opacity: 0,
      duration: 0.5,
    })
    .from(
      ".hero__title",
      {
        x: -60,
        opacity: 0,
        duration: 0.7,
      },
      "-=0.25"
    )
    .from(
      ".hero__subtitle",
      {
        opacity: 0,
        y: 15,
        duration: 0.5,
      },
      "-=0.2"
    )
    .from(
      ".hero__description",
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
      },
      "-=0.3"
    )
    .from(
      ".hero__actions .btn",
      {
        scale: 0.8,
        opacity: 0,
        stagger: 0.12,
        duration: 0.4,
      },
      "-=0.3"
    )
    .from(
      ".hero__social .social-icon",
      {
        y: 15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
      },
      "-=0.5"
    )
    .from(
      ".profile-card",
      {
        x: 80,
        opacity: 0,
        duration: 0.7,
      },
      "-=0.8"
    )
    .from(
      ".profile-card__badge",
      {
        y: -20,
        opacity: 0,
        duration: 0.5,
      },
      "-=0.4"
    )
    .from(
      [".star--large", ".star--small"],
      {
        rotation: -40,
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
      },
      "-=0.5"
    );

  // Check if form was submitted (sent=1 in URL)
  if (window.location.search.includes("sent=1")) {
    const toast = document.getElementById("toast-notification");
    if (toast) {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 5000);
    }
  }
});

// Rotating & floating stars
gsap.to(".star--large", {
  y: -10,
  rotation: 25,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  duration: 4.5,
});

gsap.to(".star--small", {
  y: -6,
  rotation: -25,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  duration: 4,
});

// Floating shapes subtle motion
gsap.utils.toArray(".floating-shape").forEach((shape, i) => {
  gsap.to(shape, {
    y: "+=18",
    x: i % 2 === 0 ? "+=10" : "-=10",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 6 + i,
  });
});

// Simple sparkle generator in hero area
function createSparkles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  for (let i = 0; i < 6; i++) {
    const spark = document.createElement("div");
    spark.classList.add("sparkle");
    const top = Math.random() * 40 + 10;
    const left = Math.random() * 60 + 10;

    spark.style.top = `${top}%`;
    spark.style.left = `${left}%`;
    hero.appendChild(spark);

    gsap.to(spark, {
      opacity: 0,
      scale: 0,
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: Math.random() * 2,
    });
  }
}
createSparkles();

// Scroll reveal helpers
function setupRevealAnimation(selector, options = {}) {
  const elements = gsap.utils.toArray(selector);
  elements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
      y: options.y ?? 20,
      x: options.x ?? 0,
      opacity: 0,
      duration: options.duration ?? 0.7,
      ease: easeDefault,
      stagger: options.stagger,
    });
  });
}

// About section image + text
gsap.from(".about-photo", {
  scrollTrigger: {
    trigger: ".about-photo",
    start: "top 85%",
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: easeDefault,
});

gsap.from(".about__content", {
  scrollTrigger: {
    trigger: ".about__content",
    start: "top 85%",
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: easeDefault,
});

gsap.from(".highlight-card", {
  scrollTrigger: {
    trigger: ".about__highlights",
    start: "top 90%",
  },
  y: 24,
  opacity: 0,
  stagger: 0.15,
  duration: 0.6,
  ease: easeDefault,
});

// Skills progress bars
const skillSection = document.querySelector(".skills");
if (skillSection) {
  ScrollTrigger.create({
    trigger: skillSection,
    start: "top 85%",
    once: true,
    onEnter: () => {
      const bars = document.querySelectorAll(".skill-bar__fill");
      bars.forEach((bar) => {
        const value = bar.getAttribute("data-skill-value") || "0";
        gsap.to(bar, {
          width: `${value}%`,
          duration: 1,
          ease: "power2.out",
        });
      });
    },
  });
}

// Skills section text reveal
setupRevealAnimation(".skills__group", { y: 30, duration: 0.8 });

// Projects reveal with clearProps
gsap.from(".project-card", {
  scrollTrigger: {
    trigger: ".projects__grid",
    start: "top 90%",
  },
  y: 30,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: easeDefault,
  clearProps: "transform,opacity",
});

// Certifications reveal
gsap.from(".cert-card", {
  scrollTrigger: {
    trigger: ".certifications__grid",
    start: "top 90%",
  },
  y: 30,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: easeDefault,
  clearProps: "transform,opacity",
});

// Resume cards slide in from sides
gsap.from(".resume-card--left", {
  scrollTrigger: {
    trigger: ".resume-card--left",
    start: "top 85%",
  },
  x: -60,
  opacity: 0,
  duration: 0.7,
  ease: easeDefault,
});

gsap.from(".resume-card--right", {
  scrollTrigger: {
    trigger: ".resume-card--right",
    start: "top 85%",
  },
  x: 60,
  opacity: 0,
  duration: 0.7,
  ease: easeDefault,
});

gsap.from(".resume-item", {
  scrollTrigger: {
    trigger: ".resume__grid",
    start: "top 85%",
  },
  y: 16,
  opacity: 0,
  duration: 0.5,
  stagger: 0.12,
  ease: easeDefault,
});

// Contact section animations
gsap.from(".contact__details", {
  scrollTrigger: {
    trigger: ".contact__grid",
    start: "top 85%",
  },
  y: 40,
  opacity: 0,
  duration: 0.7,
  ease: easeDefault,
});

gsap.from(".contact-form", {
  scrollTrigger: {
    trigger: ".contact-form",
    start: "top 85%",
  },
  y: 40,
  opacity: 0,
  duration: 0.7,
  ease: easeDefault,
});

gsap.to(".contact-star", {
  rotation: 360,
  repeat: -1,
  ease: "none",
  duration: 22,
});

// Parallax on floating shapes
function setupParallax() {
  const shapes = gsap.utils.toArray(".floating-shape");
  shapes.forEach((shape) => {
    const speed = parseFloat(shape.getAttribute("data-speed")) || 0.3;
    gsap.to(shape, {
      yPercent: speed * -40,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });
  });
}
setupParallax();

// Tilt effect on project cards
const tiltCards = document.querySelectorAll(".tilt-card");
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * -6;
    const rotateY = ((x - midX) / midX) * 6;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 800,
      transformOrigin: "center",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  });
});
