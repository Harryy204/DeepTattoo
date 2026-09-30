# AETHER Tattoo Studio Website

Premium, dark, minimal tattoo studio website built with pure HTML5, CSS3 and Vanilla JavaScript.

## Features

- **7 complete pages**: Home, About, Artists, Portfolio, Services, Booking, Contact
- **Bilingual**: Vietnamese (default) + English with full translation system
- **Responsive**: Mobile-first, tested from 360px to 1920px
- **Portfolio gallery** with filters + lightbox
- **No booking form** — directs customers to Instagram / WhatsApp / Email / etc.
- **Dark luxury aesthetic** — Roboto only, black/white/gold accent
- **Performance**: Lazy loading, minimal JS, CSS animations with reduced-motion support
- **SEO**: Semantic HTML, meta tags, Open Graph, LocalBusiness schema, robots.txt, sitemap
- **Accessibility**: Keyboard nav, focus states, aria-labels, alt texts

## Tech Stack

- HTML5
- CSS3 (custom properties, Flexbox, Grid)
- Vanilla JavaScript
- Google Fonts (Roboto 300–900)

No frameworks. Deploy-ready for Vercel / Netlify / any static host.

## Project Structure

```
tattoo-studio/
├── index.html
├── about.html
├── artists.html
├── portfolio.html
├── services.html
├── booking.html
├── contact.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   ├── config.js      ← Studio info, artists, portfolio data
│   ├── language.js    ← Translation system
│   ├── main.js
│   ├── gallery.js
│   └── booking.js
├── assets/images/     ← Place your images here
├── robots.txt
├── sitemap.xml
└── README.md
```

## Customize

1. **Studio info** → edit `js/config.js` (name, address, phone, social links, artists, portfolio)
2. **Translations** → edit `js/language.js`
3. **Colors / fonts** → edit CSS variables in `css/style.css` (`:root`)
4. **Images** → replace Unsplash placeholders with your own in `/assets/images/` and update paths in `config.js` / HTML

## Deploy to Vercel

1. Push the `tattoo-studio` folder to a GitHub repository (or upload the zip).
2. Go to [vercel.com](https://vercel.com) → New Project → Import the repo.
3. Framework Preset: **Other** (static).
4. Root Directory: leave as-is (or set to the folder containing `index.html`).
5. Click **Deploy**.

Alternatively via CLI:

```bash
npm i -g vercel
cd tattoo-studio
vercel
```

## Local Preview

Just open `index.html` in a browser, or use a simple static server:

```bash
npx serve .
# or
python -m http.server 3000
```

## Notes

- Images currently use Unsplash placeholders for demo. Replace with real tattoo photos for production.
- Social links in `config.js` are placeholders — update with real accounts.
- Google Maps embed is a placeholder; replace the iframe `src` with your real location embed.
- Language preference is saved in `localStorage` (`aether_lang`).

---

© 2026 AETHER. Built for premium tattoo studios.
