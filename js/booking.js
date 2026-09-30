/**
 * Booking page – populates social cards from config
 */

document.addEventListener("DOMContentLoaded", () => {
  populateSocialCards();
  document.addEventListener("languageChanged", populateSocialCards);
});

function populateSocialCards() {
  const container = document.getElementById("social-cards");
  if (!container) return;

  const lang = window.AETHER ? window.AETHER.currentLang() : "vi";
  const t = window.AETHER ? window.AETHER.t : (k) => k;

  const cards = [
    {
      platform: "Instagram",
      icon: "instagram",
      handle: STUDIO_CONFIG.social.instagram.handle,
      url: STUDIO_CONFIG.social.instagram.url,
      descKey: "booking_instagram_desc"
    },
    {
      platform: "Facebook",
      icon: "facebook",
      handle: STUDIO_CONFIG.social.facebook.handle,
      url: STUDIO_CONFIG.social.facebook.url,
      descKey: "booking_facebook_desc"
    },
    {
      platform: "TikTok",
      icon: "tiktok",
      handle: STUDIO_CONFIG.social.tiktok.handle,
      url: STUDIO_CONFIG.social.tiktok.url,
      descKey: "booking_tiktok_desc"
    },
    {
      platform: "WhatsApp",
      icon: "whatsapp",
      handle: STUDIO_CONFIG.social.whatsapp.handle,
      url: STUDIO_CONFIG.social.whatsapp.url,
      descKey: "booking_whatsapp_desc"
    },
    {
      platform: "Email",
      icon: "email",
      handle: STUDIO_CONFIG.email,
      url: `mailto:${STUDIO_CONFIG.email}`,
      descKey: "booking_email_desc"
    }
  ];

  container.innerHTML = cards
    .map(
      (c) => `
    <a href="${c.url}" class="social-card" target="_blank" rel="noopener noreferrer" aria-label="${c.platform}">
      <div class="social-card-icon">${getIcon(c.icon)}</div>
      <div class="social-card-body">
        <h3 class="social-card-platform">${c.platform}</h3>
        <p class="social-card-handle">${c.handle}</p>
        <p class="social-card-desc">${t(c.descKey)}</p>
      </div>
      <span class="social-card-arrow" aria-hidden="true">↗</span>
    </a>
  `
    )
    .join("");
}

function getIcon(name) {
  const icons = {
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
  };
  return icons[name] || "";
}
