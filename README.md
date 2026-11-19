# ZEVA — Women's Fitness & Wellness Studio (website)

A five-page, responsive marketing site for **ZEVA Women's Fitness & Wellness Studio**, Khatiwala Tank, Indore.

Built as plain HTML, CSS and JavaScript — no build step, no dependencies, no framework. Open it, edit it, upload it.

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, programmes, why ZEVA, batches, CTA, FAQ |
| `about.html` | Story, values and the space |
| `services.html` | All eight programmes in detail (anchor links per programme) |
| `pricing.html` | Membership options, inclusions, pricing FAQ |
| `contact.html` | Contact cards, studio hours, Google Map, WhatsApp enquiry form |

Shared assets:

- `assets/css/style.css` — design tokens, components, responsive rules
- `assets/js/main.js` — mobile nav, scroll reveals, FAQ accordion, WhatsApp form
- `assets/img/favicon.svg` — favicon / logo mark

## View it

Double-click `index.html`, or run a local server (recommended so the map and fonts behave):

```powershell
# from this folder
npx serve .
# or
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Business details used

Taken from the public Google Maps listing and Instagram profile:

- **Name:** ZEVA Women's Fitness & Wellness Studio
- **Address:** Plot No. 796, Khatiwala Tank, Scheme No. 44, Indore, Madhya Pradesh 452014 (above the Zepto store)
- **Phone / WhatsApp:** +91 99818 45253
- **Instagram:** [@zeva.in._](https://www.instagram.com/zeva.in._/)
- **Programmes:** strength training, yoga & mobility, Zumba & dance fitness, physiotherapy, personal training, weight loss, functional training, cardio
- **Positioning:** women-only, safe space, form-first coaching, physio-led recovery, community

## What to update before going live

1. **Membership prices** — the pricing page intentionally says "On request" instead of inventing rates. Replace with real numbers once confirmed.
2. **Batch timings** — the site says "morning & evening batches" and asks visitors to call. Add exact times if you want them published.
3. **Photos** — the design currently uses abstract arch/gradient artwork instead of stock photos. Swap in real studio and team photos when available (keep them compressed, ~1600px wide, WebP/JPG).
4. **WhatsApp number** — it appears in links across all pages and in `assets/js/main.js` (`STUDIO_WHATSAPP`). Search for `919981845253` and replace if it changes.
5. **Domain / SEO** — add the real domain to canonical/Open Graph tags once hosted, and add an `og-image.jpg` (1200×630).
6. **Google Business Profile** — link the site from the GBP listing and keep the name, address and phone exactly consistent.

## Customising the design

All colours, fonts and spacing live in `:root` at the top of `assets/css/style.css`:

```css
--cream: #fbf7f2;   /* page background */
--ink:   #241722;   /* headings, footer */
--rose:  #c07a8c;   /* accents */
--rose-ink: #8a3f54; /* buttons, links */
--sage:  #5f6e58;   /* secondary accent */
```

Fonts are **Fraunces** (display) and **Manrope** (body), loaded from Google Fonts with system fallbacks.

## Notes

- The enquiry form does not need a backend: it composes a pre-filled WhatsApp message and opens `wa.me`. If you later want email enquiries, swap the submit handler in `main.js` for a form service (Formspree, Netlify Forms, etc.).
- The Google Map is an `output=embed` iframe (no API key). If it ever fails, a "Open in Google Maps" fallback link is shown beneath it.
- Accessibility: skip link, visible focus states, semantic landmarks, labelled form fields, reduced-motion support, and content stays visible when JavaScript is disabled.
- The site is fully static and can be hosted on Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any shared hosting. Drag-and-drop the folder onto Netlify Drop for an instant preview.

---

Content and layout created for ZEVA. Replace placeholder copy where it doesn't match the studio's actual policies (freeze policy, joining fee, trial inclusions).
