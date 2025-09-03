// Rangzeb Studio - Optimized Common JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initParallax();
  initScrollToTop();
  initMobileSidebar();
  initTestimonialsSlider();
  initSocialDropdown();
  initSmoothScrolling();
  initNewsletterForm();

  console.log("Rangzeb Studio - Scripts initialized successfully");
});

/* =========================
    HERO PARALLAX EFFECT
   ========================= */
function initParallax() {
  const parallaxBg = document.querySelector(".parallax");
  const parallaxImage = document.getElementById("parallaxImage");
  const bottomParallax = document.getElementById("bottomParallax");
  if (!parallaxBg || !parallaxImage) return;

  let mouseX = 0,
    mouseY = 0,
    ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const heroSection = document.querySelector("section");
    if (!heroSection) return;

    const { top, height } = heroSection.getBoundingClientRect();
    const inView = top < window.innerHeight && top + height > 0;

    if (inView) {
      // Background
      parallaxBg.style.transform = `translate(${mouseX * 8}px, ${
        scrollY * 0.3
      }px)`;
      // Image
      parallaxImage.style.transform = `
        translate(${mouseX * 15}px, ${scrollY * 0.15 + mouseY * 10}px)
        rotateX(${mouseY * 2}deg) 
        rotateY(${-mouseX * 2}deg)
      `;
    }

    if (bottomParallax) {
      bottomParallax.style.transform = `translateY(${scrollY * -0.2}px)`;
    }

    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener(
    "mousemove",
    (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      requestUpdate();
    },
    { passive: true }
  );

  updateParallax(); // initial
}

/* =========================
    SCROLL TO TOP BUTTON
   ========================= */
function initScrollToTop() {
  const btn = document.getElementById("scrollToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    const show = window.scrollY > 300;
    btn.style.display = show ? "block" : "none";
    btn.style.opacity = show ? "1" : "0";
  });

  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

/* =========================
    MOBILE SIDEBAR
   ========================= */
function initMobileSidebar() {
  const btn = document.getElementById("mobileMenuBtn");
  const sidebar = document.getElementById("mobileSidebar");
  const content = document.getElementById("sidebarContent");
  const packagesDropdown = document.getElementById("packagesDropdown");
  const packagesMenu = document.getElementById("packagesMenu");
  const packagesArrow = document.getElementById("packagesArrow");
  if (!sidebar || !content) return;

  const open = () => {
    sidebar.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => content.classList.remove("-translate-x-full"));
  };

  const close = () => {
    content.classList.add("-translate-x-full");
    document.body.style.overflow = "";
    setTimeout(() => sidebar.classList.add("hidden"), 300);
  };

  btn?.addEventListener("click", (e) => {
    e.stopPropagation();
    open();
  });
  sidebar.addEventListener("click", (e) => {
    if (!content.contains(e.target)) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Packages dropdown
  packagesDropdown?.addEventListener("click", (e) => {
    e.stopPropagation();
    packagesMenu.classList.toggle("hidden");
    packagesArrow.style.transform = packagesMenu.classList.contains("hidden")
      ? "rotate(0deg)"
      : "rotate(180deg)";
  });

  // Close sidebar on nav link clicks (except submenu)
  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!link.closest("#packagesMenu")) close();
    });
  });
}

/* =========================
    TESTIMONIALS SLIDER
   ========================= */
function initTestimonialsSlider() {
  if (typeof Glide === "undefined") return;
  const slider = document.querySelector(".testimonials-slider");
  if (!slider) return;

  new Glide(slider, {
    type: "carousel",
    perView: 1,
    autoplay: 5000,
    hoverpause: true,
  }).mount();
}

/* =========================
    SMOOTH SCROLLING
   ========================= */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
