/**
 * Main JavaScript for AETHER Tattoo Studio
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize language first
  if (typeof initLanguage === "function") {
    initLanguage();
  }

  // Mobile menu
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const body = document.body;

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen);
      body.classList.toggle("menu-open", isOpen);
    });

    // Close menu when clicking a link
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
      });
    });
  }

  // Header scroll effect
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("revealed"));
  }

  // Page loader
  const loader = document.querySelector(".page-loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("hidden");
        setTimeout(() => loader.remove(), 600);
      }, 400);
    });
    // Fallback
    setTimeout(() => {
      if (loader && !loader.classList.contains("hidden")) {
        loader.classList.add("hidden");
      }
    }, 2500);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Populate dynamic content that depends on language
  document.addEventListener("languageChanged", updateDynamicContent);
  updateDynamicContent();
});

function updateDynamicContent() {
  const lang = window.AETHER ? window.AETHER.currentLang() : "vi";

  // Update address / hours in contact & footer if elements exist
  document.querySelectorAll("[data-config-address]").forEach((el) => {
    el.textContent = STUDIO_CONFIG.address[lang] || STUDIO_CONFIG.address.en;
  });
  document.querySelectorAll("[data-config-hours]").forEach((el) => {
    el.textContent = STUDIO_CONFIG.hours[lang] || STUDIO_CONFIG.hours.en;
  });

  // Artist bios and specialties
  document.querySelectorAll("[data-artist-bio]").forEach((el) => {
    const id = el.getAttribute("data-artist-bio");
    const artist = ARTISTS.find((a) => a.id === id);
    if (artist) {
      el.textContent = artist.bio[lang] || artist.bio.en;
    }
  });
  document.querySelectorAll("[data-artist-specialty]").forEach((el) => {
    const id = el.getAttribute("data-artist-specialty");
    const artist = ARTISTS.find((a) => a.id === id);
    if (artist) {
      el.textContent = artist.specialty[lang] || artist.specialty.en;
    }
  });
}

// Reduced motion support is handled in CSS
