/**
 * Portfolio Gallery + Lightbox + Pagination
 */

(function () {
  const ITEMS_PER_PAGE = 10; // Số ảnh mỗi trang — có thể đổi

  let currentFilter = "all";
  let filteredItems = [];
  let currentPage = 1;
  let currentIndex = 0;
  // Mảng đang dùng cho lightbox (có thể là portfolio, studio, artist works...)
  let lightboxItems = [];

  function initGallery() {
    const grid = document.getElementById("portfolio-grid");
    if (!grid) return;

    if (typeof PORTFOLIO === "undefined" || !PORTFOLIO.length) {
      grid.innerHTML = '<p class="portfolio-empty">No portfolio data.</p>';
      return;
    }

    applyFilter("all");
    setupFilters();
    setupLightbox();
  }

  function applyFilter(filter) {
    currentFilter = filter;
    currentPage = 1;

    filteredItems =
      filter === "all"
        ? [...PORTFOLIO]
        : PORTFOLIO.filter((item) => item.style === filter);

    renderPage();
    renderPagination();
  }

  function renderPage() {
    const grid = document.getElementById("portfolio-grid");
    if (!grid) return;

    grid.innerHTML = "";

    if (filteredItems.length === 0) {
      const empty = document.createElement("p");
      empty.className = "portfolio-empty";
      empty.setAttribute("data-i18n", "no_results");
      empty.textContent = window.AETHER ? window.AETHER.t("no_results") : "No results";
      grid.appendChild(empty);
      return;
    }

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = filteredItems.slice(start, start + ITEMS_PER_PAGE);

    pageItems.forEach((item, i) => {
      const globalIndex = start + i;
      const card = document.createElement("article");
      card.className = "portfolio-item reveal";
      card.dataset.style = item.style;

      card.innerHTML = `
        <div class="portfolio-item-inner">
          <img
            src="${item.src}"
            alt="${item.alt || ""}"
            loading="lazy"
            width="400"
            height="500"
          />
          <div class="portfolio-overlay">
            <span class="portfolio-style">${formatStyle(item.style)}</span>
            <span class="portfolio-artist">${item.artist}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => openLightbox(globalIndex));
      grid.appendChild(card);
    });

    // Scroll reveal
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      grid.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    } else {
      grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
    }

    // Scroll to top of gallery on page change (skip first load)
    if (currentPage > 1 || currentFilter !== "all") {
      const section = grid.closest(".section") || grid;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function totalPages() {
    return Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  }

  function renderPagination() {
    let container = document.getElementById("portfolio-pagination");
    if (!container) {
      // Create if missing
      const grid = document.getElementById("portfolio-grid");
      if (!grid) return;
      container = document.createElement("div");
      container.id = "portfolio-pagination";
      container.className = "pagination";
      grid.parentNode.insertBefore(container, grid.nextSibling);
    }

    const pages = totalPages();

    // Hide pagination if only 1 page
    if (pages <= 1) {
      container.innerHTML = "";
      container.style.display = "none";
      return;
    }
    container.style.display = "flex";

    const t = window.AETHER ? window.AETHER.t : (k) => k;
    const prevLabel = t("pagination_prev") || "Trước";
    const nextLabel = t("pagination_next") || "Sau";

    let html = `
      <button type="button" class="pagination-btn pagination-prev" ${
        currentPage === 1 ? "disabled" : ""
      } aria-label="${prevLabel}">
        ← ${prevLabel}
      </button>
      <div class="pagination-pages">
    `;

    // Smart page numbers: show first, last, current ±1
    const pageNumbers = getPageNumbers(pages, currentPage);
    pageNumbers.forEach((p) => {
      if (p === "...") {
        html += `<span class="pagination-ellipsis">…</span>`;
      } else {
        html += `
          <button type="button" class="pagination-btn pagination-num ${
            p === currentPage ? "active" : ""
          }" data-page="${p}" aria-label="Page ${p}" ${
          p === currentPage ? 'aria-current="page"' : ""
        }>
            ${p}
          </button>
        `;
      }
    });

    html += `
      </div>
      <button type="button" class="pagination-btn pagination-next" ${
        currentPage === pages ? "disabled" : ""
      } aria-label="${nextLabel}">
        ${nextLabel} →
      </button>
    `;

    container.innerHTML = html;

    container.querySelector(".pagination-prev")?.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage();
        renderPagination();
      }
    });

    container.querySelector(".pagination-next")?.addEventListener("click", () => {
      if (currentPage < pages) {
        currentPage++;
        renderPage();
        renderPagination();
      }
    });

    container.querySelectorAll(".pagination-num").forEach((btn) => {
      btn.addEventListener("click", () => {
        const page = parseInt(btn.dataset.page, 10);
        if (page !== currentPage) {
          currentPage = page;
          renderPage();
          renderPagination();
        }
      });
    });
  }

  function getPageNumbers(total, current) {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages = [];
    pages.push(1);
    if (current > 3) pages.push("...");
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    if (current < total - 2) pages.push("...");
    pages.push(total);
    return pages;
  }

  function formatStyle(style) {
    return style
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  function setupFilters() {
    const filters = document.querySelectorAll(".filter-btn");
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        applyFilter(btn.dataset.filter);
      });
    });
  }

  function setupLightbox() {
    if (document.getElementById("lightbox")) return;

    const lb = document.createElement("div");
    lb.id = "lightbox";
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-prev" aria-label="Previous">&#10094;</button>
      <button class="lightbox-next" aria-label="Next">&#10095;</button>
      <div class="lightbox-content">
        <img src="" alt="" class="lightbox-img" />
        <div class="lightbox-info">
          <span class="lightbox-style"></span>
          <span class="lightbox-artist"></span>
        </div>
      </div>
    `;
    document.body.appendChild(lb);

    lb.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lb.querySelector(".lightbox-prev").addEventListener("click", () => navigate(-1));
    lb.querySelector(".lightbox-next").addEventListener("click", () => navigate(1));
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    });
  }

  /**
   * Mở lightbox với 1 mảng ảnh bất kỳ
   * items: [{ src, title?, style?, artist?, alt? }]
   */
  function openLightboxWith(items, index) {
    if (!items || !items.length) return;
    setupLightbox();
    lightboxItems = items;
    currentIndex = index;
    showLightboxItem();
  }

  function openLightbox(index) {
    // Dùng cho portfolio page (filteredItems)
    openLightboxWith(filteredItems, index);
  }

  function showLightboxItem() {
    const item = lightboxItems[currentIndex];
    if (!item) return;

    const lb = document.getElementById("lightbox");
    if (!lb) return;

    const img = lb.querySelector(".lightbox-img");
    const styleEl = lb.querySelector(".lightbox-style");
    const artistEl = lb.querySelector(".lightbox-artist");

    img.src = item.src;
    img.alt = item.alt || item.title || "";
    styleEl.textContent = item.title || (item.style ? formatStyle(item.style) : "");
    artistEl.textContent = item.artist || "";

    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const lb = document.getElementById("lightbox");
    if (lb) {
      lb.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  function navigate(dir) {
    if (!lightboxItems.length) return;
    currentIndex = (currentIndex + dir + lightboxItems.length) % lightboxItems.length;
    showLightboxItem();
  }

  /** Observe newly injected .reveal elements so they become visible */
  function observeReveals(root) {
    if (!root) return;
    const els = root.querySelectorAll(".reveal:not(.revealed)");
    if (!els.length) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
      );
      els.forEach((el) => observer.observe(el));
      // Fallback: if already in viewport, show after a tick
      requestAnimationFrame(() => {
        els.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("revealed");
          }
        });
      });
    } else {
      els.forEach((el) => el.classList.add("revealed"));
    }
  }

  // Home: Studio Pictures → lightbox
  function initStudioLightbox() {
    const cards = document.querySelectorAll(".studio-pic-card");
    if (!cards.length) return;

    const items = Array.from(cards).map((card) => {
      const img = card.querySelector("img");
      const title = card.querySelector("h3");
      return {
        src: img ? img.src : "",
        alt: img ? img.alt : "",
        title: title ? title.textContent.trim() : "",
        artist: ""
      };
    });

    cards.forEach((card, index) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => openLightboxWith(items, index));
    });
  }

  // Home: Tattoo Gallery boxes (image + title + artist) — 10 ảnh, mở lightbox
  function initHomeGallery() {
    const grid = document.getElementById("home-gallery-grid");
    if (!grid) return;
    if (typeof PORTFOLIO === "undefined" || !Array.isArray(PORTFOLIO) || !PORTFOLIO.length) {
      grid.innerHTML = '<p class="portfolio-empty" style="opacity:1">No portfolio data.</p>';
      return;
    }

    const items = PORTFOLIO.slice(0, 10);
    grid.innerHTML = "";

    items.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "home-gallery-card reveal revealed";
      card.style.cursor = "pointer";
      card.innerHTML = `
        <div class="home-gallery-link">
          <div class="home-gallery-img">
            <img src="${item.src}" alt="${item.alt || item.title || ""}" loading="lazy" width="400" height="500" />
          </div>
          <div class="home-gallery-meta">
            <h3 class="home-gallery-title">${item.title || formatStyle(item.style)}</h3>
            <p class="home-gallery-artist">${item.artist}</p>
          </div>
        </div>
      `;
      card.addEventListener("click", () => {
        const lbItems = items.map((it) => ({
          src: it.src,
          title: it.title || formatStyle(it.style),
          artist: it.artist,
          alt: it.alt,
          style: it.style
        }));
        openLightboxWith(lbItems, index);
      });
      grid.appendChild(card);
    });

    observeReveals(grid);
  }

  const igIconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>`;
  const fbIconSvg = `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>`;

  function currentLang() {
    return window.AETHER ? window.AETHER.currentLang() : "vi";
  }

  function tr(key) {
    return window.AETHER ? window.AETHER.t(key) : key;
  }

  // CEO / Founder featured (không nằm trong box)
  function initCeoFeatured() {
    const container = document.getElementById("ceo-featured");
    if (!container || typeof ARTISTS === "undefined") return;

    const ceo = ARTISTS.find((a) => a.role === "ceo") || ARTISTS[0];
    if (!ceo) {
      container.innerHTML = "";
      return;
    }

    const L = currentLang();
    const works = (ceo.workImages || []).slice(0, 5);
    const lbItems = [
      { src: ceo.portrait, title: ceo.name, artist: ceo.name, alt: ceo.name },
      ...works.map((src, i) => ({
        src,
        title: ceo.name,
        artist: ceo.name,
        alt: ceo.name + " work " + (i + 1)
      }))
    ];

    container.innerHTML =
      '<div class="ceo-layout reveal revealed">' +
        '<div class="ceo-portrait" style="cursor:pointer">' +
          '<img src="' + ceo.portrait + '" alt="' + ceo.name + '" loading="lazy" />' +
        '</div>' +
        '<div class="ceo-info">' +
          '<p class="ceo-role">' + ((ceo.title && (ceo.title[L] || ceo.title.en)) || "Founder & Lead Artist") + '</p>' +
          '<h3 class="ceo-name">' + ceo.name + '</h3>' +
          '<p class="ceo-specialty">' + ((ceo.specialty && (ceo.specialty[L] || ceo.specialty.en)) || "") + '</p>' +
          '<p class="ceo-experience">' + ((ceo.experience && (ceo.experience[L] || ceo.experience.en)) || "") + '</p>' +
          '<p class="ceo-mission">' + ((ceo.mission && (ceo.mission[L] || ceo.mission.en)) || "") + '</p>' +
          '<p class="ceo-bio">' + ((ceo.bio && (ceo.bio[L] || ceo.bio.en)) || "") + '</p>' +
          '<div class="meet-artist-social ceo-social">' +
            (ceo.instagram ? '<a href="' + ceo.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + igIconSvg + '</a>' : '') +
            (ceo.facebook ? '<a href="' + ceo.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + fbIconSvg + '</a>' : '') +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="ceo-works reveal revealed">' +
        '<p class="ceo-works-label">' + (tr("ceo_works_label") || "Tác phẩm nổi bật") + '</p>' +
        '<div class="ceo-works-grid">' +
          works.map(function (src, i) {
            return '<button type="button" class="ceo-work-item" data-lb-index="' + (i + 1) + '">' +
              '<img src="' + src + '" alt="' + ceo.name + ' work ' + (i + 1) + '" loading="lazy" />' +
            '</button>';
          }).join("") +
        '</div>' +
      '</div>';

    container.querySelector(".ceo-portrait")?.addEventListener("click", function () {
      openLightboxWith(lbItems, 0);
    });
    container.querySelectorAll(".ceo-work-item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openLightboxWith(lbItems, parseInt(btn.getAttribute("data-lb-index"), 10));
      });
    });
  }

  // Artist cards (không bao gồm CEO)
  function initMeetArtists() {
    const grid = document.getElementById("meet-artists-grid");
    if (!grid) return;
    if (typeof ARTISTS === "undefined" || !Array.isArray(ARTISTS) || !ARTISTS.length) {
      grid.innerHTML = '<p class="portfolio-empty" style="opacity:1">No artists data.</p>';
      return;
    }

    const team = ARTISTS.filter(function (a) { return a.role !== "ceo"; });
    grid.innerHTML = "";

    team.forEach(function (artist) {
      const workSrcs = (artist.workImages || []).slice(0, 3);
      const artistLbItems = [
        { src: artist.portrait, title: artist.name, artist: artist.name, alt: artist.name }
      ].concat(workSrcs.map(function (src, i) {
        return { src: src, title: artist.name, artist: artist.name, alt: artist.name + " work " + (i + 1) };
      }));

      const worksHtml = workSrcs.map(function (src, i) {
        return '<img src="' + src + '" alt="" loading="lazy" data-lb-index="' + (i + 1) + '" class="meet-work-thumb" />';
      }).join("");

      const card = document.createElement("article");
      card.className = "meet-artist-card reveal revealed";
      card.innerHTML =
        '<div class="meet-artist-portrait" style="cursor:pointer">' +
          '<img src="' + artist.portrait + '" alt="' + artist.name + '" loading="lazy" />' +
        '</div>' +
        '<div class="meet-artist-body">' +
          '<h3 class="meet-artist-name">' + artist.name + '</h3>' +
          '<p class="meet-artist-specialty" data-artist-specialty="' + artist.id + '"></p>' +
          '<div class="meet-artist-social">' +
            (artist.instagram ? '<a href="' + artist.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + igIconSvg + '</a>' : '') +
            (artist.facebook ? '<a href="' + artist.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + fbIconSvg + '</a>' : '') +
          '</div>' +
          '<div class="meet-artist-works">' + worksHtml + '</div>' +
        '</div>';

      card.querySelector(".meet-artist-portrait")?.addEventListener("click", function () {
        openLightboxWith(artistLbItems, 0);
      });
      card.querySelectorAll(".meet-work-thumb").forEach(function (thumb) {
        thumb.style.cursor = "pointer";
        thumb.addEventListener("click", function () {
          openLightboxWith(artistLbItems, parseInt(thumb.getAttribute("data-lb-index"), 10));
        });
      });

      grid.appendChild(card);
    });

    document.querySelectorAll("[data-artist-specialty]").forEach(function (el) {
      const id = el.getAttribute("data-artist-specialty");
      const a = ARTISTS.find(function (x) { return x.id === id; });
      if (a) el.textContent = a.specialty[currentLang()] || a.specialty.en;
    });

    if (typeof updateDynamicContent === "function") updateDynamicContent();
    observeReveals(grid);
  }

  // 5 video Facebook — mobile 1 cột
  function initWorkVideos() {
    const grid = document.getElementById("work-videos-grid");
    if (!grid) return;
    if (typeof WORK_VIDEOS === "undefined" || !WORK_VIDEOS.length) {
      grid.innerHTML = "";
      return;
    }

    grid.innerHTML = WORK_VIDEOS.slice(0, 5).map(function (v) {
      const embed = "https://www.facebook.com/plugins/video.php?href=" + encodeURIComponent(v.href) + "&show_text=false&width=560";
      return (
        '<div class="work-video-card reveal revealed">' +
          '<div class="work-video-frame">' +
            '<iframe src="' + embed + '" title="' + (v.title || "Work video") + '" ' +
              'style="border:none;overflow:hidden" scrolling="no" frameborder="0" ' +
              'allow="autoplay; clipboard-write; ; loading="lazy"></iframe>' +
          '</div>' +
          (v.title ? '<p class="work-video-title">' + v.title + '</p>' : '') +
        '</div>'
      );
    }).join("");
  }

  // Re-render pagination labels when language changes
  document.addEventListener("languageChanged", () => {
    if (document.getElementById("portfolio-grid")) {
      renderPagination();
    }
    if (document.getElementById("ceo-featured")) {
      initCeoFeatured();
    }
    if (document.getElementById("meet-artists-grid")) {
      initMeetArtists();
    }
  });

  function boot() {
    setupLightbox();
    initGallery();
    initStudioLightbox();
    initHomeGallery();
    initCeoFeatured();
    initMeetArtists();
    initWorkVideos();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
