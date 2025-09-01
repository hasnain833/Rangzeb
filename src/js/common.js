// Common JavaScript functions for Rangzeb Studio

// Enhanced parallax effect for hero section
function initHeroParallax() {
  const parallaxBg = document.querySelector('.parallax');
  const parallaxImage = document.getElementById('parallaxImage');
  
  if (!parallaxBg || !parallaxImage) return;

  let ticking = false;
  let currentScrollY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;
  
  function updateParallax() {
    const scrollY = window.pageYOffset;
    currentScrollY = scrollY;
    
    const windowHeight = window.innerHeight;
    const heroSection = document.querySelector('section');
    
    if (!heroSection) return;
    
    const heroRect = heroSection.getBoundingClientRect();
    const heroTop = heroRect.top;
    const heroHeight = heroRect.height;
    
    // Only apply parallax when hero section is in view
    if (heroTop < windowHeight && heroTop + heroHeight > 0) {
      // Background parallax - slower movement
      const bgY = scrollY * 0.3;
      const bgX = currentMouseX * 8;
      parallaxBg.style.transform = `translate(${bgX}px, ${bgY}px)`;
      
      // Image parallax - medium movement
      const imageY = scrollY * 0.15;
      const imageX = currentMouseX * 15;
      const imageMouseY = currentMouseY * 10;
      const tiltX = currentMouseY * 2;
      const tiltY = -currentMouseX * 2;
      
      parallaxImage.style.transform = `translate(${imageX}px, ${imageY + imageMouseY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      

    }
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  // Throttled scroll event for better performance
  window.addEventListener('scroll', requestTick, { passive: true });
  
  // Make functions globally accessible
  window.requestParallaxUpdate = requestTick;
  window.initHeroParallax = {
    currentMouseX: 0,
    currentMouseY: 0
  };
  
  // Initial call
  updateParallax();
}

// Scroll to Top Button Functionality
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  if (!scrollToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = "block";
      scrollToTopBtn.style.opacity = "1";
    } else {
      scrollToTopBtn.style.opacity = "0";
      setTimeout(() => {
        if (scrollToTopBtn.style.opacity === "0") {
          scrollToTopBtn.style.display = "none";
        }
      }, 300);
    }
  });

  // Smooth scroll to top when button is clicked
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Enhanced mouse movement parallax effect
function handleMouseMove(e) {
  const parallaxBg = document.querySelector('.parallax');
  const parallaxImage = document.getElementById('parallaxImage');
  
  if (!parallaxBg || !parallaxImage) return;
  
  const heroSection = document.querySelector('section');
  if (!heroSection) return;
  
  const heroRect = heroSection.getBoundingClientRect();
  const heroTop = heroRect.top;
  const heroHeight = heroRect.height;
  
  // Only apply mouse parallax when hero section is in view
  if (heroTop < window.innerHeight && heroTop + heroHeight > 0) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate mouse position relative to center (0 to 1)
    const mouseXPercent = (mouseX - windowWidth / 2) / (windowWidth / 2);
    const mouseYPercent = (mouseY - windowHeight / 2) / (windowHeight / 2);
    
    // Update stored mouse values for the parallax function
    if (window.initHeroParallax && window.initHeroParallax.currentMouseX !== undefined) {
      window.initHeroParallax.currentMouseX = mouseXPercent;
      window.initHeroParallax.currentMouseY = mouseYPercent;
    }
    
    // Trigger parallax update
    if (window.requestParallaxUpdate) {
      window.requestParallaxUpdate();
    }
  }
}

// Add mouse movement event listener
window.addEventListener('mousemove', handleMouseMove, { passive: true });

function initMobileSidebar() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const sidebarContent = document.getElementById("sidebarContent");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  const packagesDropdown = document.getElementById("packagesDropdown");
  const packagesMenu = document.getElementById("packagesMenu");
  const packagesArrow = document.getElementById("packagesArrow");

  // Helpers
  const openSidebar = () => {
    mobileSidebar.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() =>
      sidebarContent.classList.remove("-translate-x-full")
    );
  };

  const closeSidebar = () => {
    sidebarContent.classList.add("-translate-x-full");
    document.body.style.overflow = "";
    setTimeout(() => mobileSidebar.classList.add("hidden"), 300);
  };

  // Open button
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openSidebar();
    });
  }

  // Close when clicking backdrop or outside sidebar
  if (mobileSidebar) {
    mobileSidebar.addEventListener("click", (e) => {
      if (!sidebarContent.contains(e.target)) closeSidebar();
    });
  }

  // Dropdown toggle
  if (packagesDropdown && packagesMenu) {
    packagesDropdown.addEventListener("click", (e) => {
      e.stopPropagation(); // keep sidebar open
      const willOpen = packagesMenu.classList.contains("hidden");
      packagesMenu.classList.toggle("hidden");
      if (packagesArrow) {
        packagesArrow.style.transform = willOpen
          ? "rotate(180deg)"
          : "rotate(0deg)";
      }
    });
  }

  // Close sidebar on nav link clicks (not submenu links)
  const links = mobileSidebar.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (!link.closest("#packagesMenu")) closeSidebar();
    });
  });

  // Escape key closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !mobileSidebar.classList.contains("hidden")) {
      closeSidebar();
    }
  });
}

// Init
document.addEventListener("DOMContentLoaded", initMobileSidebar);

// Glide.js Testimonials Slider
function initTestimonialsSlider() {
  const sliderElement = document.querySelector(".testimonials-slider");

  if (!sliderElement || typeof Glide === "undefined") return;

  new Glide(".testimonials-slider", {
    type: "carousel",
    perView: 1,
    gap: 0,
    autoplay: 5000,
    hoverpause: true,
    breakpoints: {
      768: {
        perView: 1,
      },
    },
  }).mount();
}

// Social Media Dropdown Toggle (for desktop)
function initSocialDropdown() {
  const socialToggle = document.getElementById("socialToggle");
  const socialDropdown = document.getElementById("socialDropdown");

  if (!socialToggle || !socialDropdown) return;

  let isDropdownOpen = false;

  socialToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;

    if (isDropdownOpen) {
      socialDropdown.classList.remove("hidden");
      socialDropdown.classList.remove("opacity-0", "translate-y-2");
      socialDropdown.classList.add("opacity-100", "translate-y-0");
    } else {
      socialDropdown.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => {
        socialDropdown.classList.add("hidden");
      }, 300);
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !socialToggle.contains(e.target) &&
      !socialDropdown.contains(e.target)
    ) {
      isDropdownOpen = false;
      socialDropdown.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => {
        socialDropdown.classList.add("hidden");
      }, 300);
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Newsletter Form (placeholder function)
function initNewsletterForm() {
  // Newsletter form functionality can be added here
  console.log("Newsletter form initialized");
}

// Initialize all common functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initScrollToTop();
  initMobileSidebar();
  initTestimonialsSlider();
  initSocialDropdown();
  initSmoothScrolling();
  initNewsletterForm();
  initHeroParallax(); // Initialize the new parallax effect

  console.log("Rangzeb Studio - Common JavaScript loaded successfully");
});
