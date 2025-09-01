// Common JavaScript functions for Rangzeb Studio

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

// Simple parallax effect for the image
window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  const parallaxImage = document.getElementById("parallaxImage");

  // Move image slightly slower than scroll
  parallaxImage.style.transform = `translateY(${scrollY * 0.1}px)`;
});

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

  console.log("Rangzeb Studio - Common JavaScript loaded successfully");
});
