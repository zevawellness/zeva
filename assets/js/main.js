/* ==========================================================================
   ZEVA — site interactions
   Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Header shadow on scroll ------------------------------------------- */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* 2. Mobile navigation ------------------------------------------------- */
  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (e.target.closest(".site-header")) return;
      closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeNav();
    });
  }

  /* 3. Reveal on scroll -------------------------------------------------- */
  var revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach(function (el) { observer.observe(el); });
  }

  /* 4. FAQ — keep one answer open at a time ------------------------------ */
  var faqs = document.querySelectorAll(".faq details");
  faqs.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqs.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* 5. Contact form → WhatsApp ------------------------------------------- */
  var form = document.getElementById("enquiry-form");
  var STUDIO_WHATSAPP = "919981845253";

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var phone = String(data.get("phone") || "").trim();
      var interest = String(data.get("interest") || "").trim();
      var message = String(data.get("message") || "").trim();

      if (!name || !phone) {
        form.reportValidity();
        return;
      }

      var lines = [
        "Hi ZEVA! I'd like to book a free trial.",
        "",
        "Name: " + name,
        "Phone: " + phone
      ];

      if (interest) lines.push("Interested in: " + interest);
      if (message) lines.push("Message: " + message);

      var url = "https://wa.me/" + STUDIO_WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }

  /* 6. Footer year ------------------------------------------------------- */
  var yearEls = document.querySelectorAll("[data-year]");
  var year = new Date().getFullYear();
  yearEls.forEach(function (el) { el.textContent = year; });

  /* 7. Sticky mobile call / WhatsApp / directions bar -------------------- */
  /* Google Ads traffic is overwhelmingly mobile. Keep one-tap calling,
     messaging and directions in reach at every scroll depth. */
  if (!document.querySelector(".call-bar")) {
    var bar = document.createElement("div");
    bar.className = "call-bar";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Quick contact");
    bar.innerHTML =
      '<a class="call-bar__call" href="tel:+919981845253" onclick="return gtag_report_conversion(\'tel:+919981845253\')" data-track="call">' +
        '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.6 3.5h2.2c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.4 1l-1.5 1a12 12 0 0 0 5 5l1-1.5c.2-.3.6-.5 1-.4l3 .8c.5.1.8.5.8 1v2.2c0 1.1-.9 2-2 2A16.5 16.5 0 0 1 4.6 5.5c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>' +
        "Call</a>" +
      '<a class="call-bar__wa" href="https://wa.me/919981845253?text=Hi%20ZEVA!%20I%27d%20like%20to%20know%20about%20the%202%2B1%20months%20offer." target="_blank" rel="noopener" data-track="whatsapp">' +
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5l-.8-1.8c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 3.9 3.4 2.3.9 2.3.6 2.7.6.4 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.1-.4-.2z"/></svg>' +
        "WhatsApp</a>" +
      '<a class="call-bar__dir" href="https://www.google.com/maps/dir/?api=1&destination=22.6953898,75.8598368" target="_blank" rel="noopener" data-track="directions">' +
        '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-5.1 7-11a7 7 0 10-14 0c0 5.9 7 11 7 11z" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="1.9"/></svg>' +
        "Directions</a>";
    document.body.appendChild(bar);
  }

  /* 8. Conversion event hooks -------------------------------------------- */
  /* Every Call / WhatsApp / Directions CTA carries data-track="...".
     The Google Ads tag (gtag.js) is loaded in <head>; this fires the right
     conversion label per action. Labels are set in ZEVA_TRACK below. */
  var ZEVA_TRACK = window.ZEVA_TRACK || {};
  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-track]") : null;
    if (!el) return;
    var action = el.getAttribute("data-track");
    var sendTo = ZEVA_TRACK[action];
    if (typeof window.gtag === "function" && sendTo) {
      window.gtag("event", "conversion", { send_to: sendTo, event_category: "contact", event_label: action });
    }
    if (typeof window.dataLayer === "object" && window.dataLayer.push) {
      window.dataLayer.push({ event: "zeva_" + action });
    }
  });
})();
