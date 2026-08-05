/**
 * Generates en/index.html from index.html.
 *
 * The English copy lives in the I18N table inside script.js, so instead of
 * duplicating any wording here we load the real page into a DOM, run the real
 * script.js against it, switch the language, and serialise the result. That
 * keeps the English page in sync with the Spanish one by construction.
 *
 * Run it after changing copy or markup:  node build-en.mjs
 * Requires linkedom (dev only, not shipped):  npm install linkedom
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { parseHTML } = require(process.env.LINKEDOM_PATH || "linkedom");

const ORIGIN = "https://www.tamaracoachclub.com";
const html = readFileSync("index.html", "utf8");
const script = readFileSync("script.js", "utf8");

const { window, document } = parseHTML(html);

// Minimal browser surface script.js touches during initialisation. linkedom
// already defines some of these as accessors, so assign defensively.
const stub = (key, value) => {
  try {
    window[key] = value;
  } catch {
    /* linkedom owns this property; its own implementation is fine */
  }
};

stub("localStorage", { getItem: () => null, setItem: () => {} });
stub("matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
stub("requestAnimationFrame", (cb) => cb(0));
stub("requestIdleCallback", undefined);
// No-op observer: reveal/scroll effects are runtime-only and must not alter
// the static markup we are about to write out.
stub(
  "IntersectionObserver",
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
);
stub("setInterval", () => 0);
stub("setTimeout", () => 0);
stub("scrollTo", () => {});
stub("open", () => {});
stub("scrollY", 0);
stub("innerHeight", 800);

document.documentElement.setAttribute("data-page-lang", "en");

const globals = {
  window,
  document,
  navigator: { userAgent: "node", maxTouchPoints: 0, platform: "node" },
  localStorage: window.localStorage,
  performance: { now: () => 0 },
  location: { href: `${ORIGIN}/en/`, pathname: "/en/" },
  setTimeout: () => 0,
  setInterval: () => 0,
  clearTimeout: () => {},
  requestAnimationFrame: (cb) => cb(0),
  console,
};

// Execute the site script so applyLanguage("en") runs through the real path.
const run = new Function(...Object.keys(globals), `${script}\n;return { applyLanguage, renderPlans };`);
const api = run(...Object.values(globals));
api.applyLanguage("en");

// --- Head rewrites: this page must stand on its own as the English URL ------
const $ = (sel) => document.querySelector(sel);
const setAttr = (sel, attr, value) => {
  const el = $(sel);
  if (el) el.setAttribute(attr, value);
};

document.documentElement.setAttribute("lang", "en");
document.documentElement.setAttribute("data-page-lang", "en");

const EN_TITLE = "Gym & Personal Trainer in Tulum | Tamara's Coaching & Fitness Club";
const EN_DESC =
  "Gym, fitness and personal training in Tulum, Mexico. Train with Tamara, a personal trainer and high-performance coach: strength, method and real follow-up, in person and online.";

if ($("title")) $("title").textContent = EN_TITLE;
setAttr('meta[name="description"]', "content", EN_DESC);
setAttr(
  'meta[name="keywords"]',
  "content",
  "gym in Tulum, personal trainer Tulum, fitness Tulum, personal training Tulum, gym Tulum Mexico, strength coach Tulum, fitness coaching Tulum, high performance gym Tulum"
);
setAttr('link[rel="canonical"]', "href", `${ORIGIN}/en/`);
setAttr('meta[property="og:url"]', "content", `${ORIGIN}/en/`);
setAttr('meta[property="og:title"]', "content", EN_TITLE);
setAttr('meta[property="og:description"]', "content", EN_DESC);
setAttr('meta[property="og:locale"]', "content", "en_US");
setAttr('meta[property="og:locale:alternate"]', "content", "es_MX");
setAttr('meta[name="twitter:title"]', "content", EN_TITLE);
setAttr('meta[name="twitter:description"]', "content", EN_DESC);
setAttr('meta[property="og:image:alt"]', "content", "Tamara's Coaching & Fitness Club in Tulum");

// Both languages must point at each other, and at the same x-default.
const alts = [...document.querySelectorAll('link[rel="alternate"][hreflang]')];
alts.forEach((el) => {
  const lang = el.getAttribute("hreflang");
  if (lang === "en") el.setAttribute("href", `${ORIGIN}/en/`);
  else el.setAttribute("href", `${ORIGIN}/`);
});

// Structured data: describe the English page, keep one shared business entity.
document.querySelectorAll('script[type="application/ld+json"]').forEach((node) => {
  let data;
  try {
    data = JSON.parse(node.textContent);
  } catch {
    return;
  }
  if (data["@type"] === "WebSite") {
    data.url = `${ORIGIN}/en/`;
    data["@id"] = `${ORIGIN}/en/#website`;
  }
  if (data["@type"] === "HealthClub") {
    data.url = `${ORIGIN}/en/`;
    data.description =
      "Gym, fitness and personal training in Tulum, Mexico. Train with Tamara, a personal trainer and high-performance coach: strength, method and real follow-up, in person and online.";
  }
  if (data["@type"] === "OfferCatalog" || data.hasOfferCatalog) {
    const cat = data.hasOfferCatalog;
    if (cat && Array.isArray(cat.itemListElement)) {
      cat.itemListElement.forEach((o) => {
        if (o.url) o.url = `${ORIGIN}/en/#planes`;
      });
    }
  }
  node.textContent = "\n  " + JSON.stringify(data, null, 2).replace(/\n/g, "\n  ") + "\n  ";
});

// Text that lives in attributes (or outside the i18n table) is not touched by
// applyLanguage, so translate it here.
const ATTR_TEXT = {
  "Abrir WhatsApp de Tamara Club": "Open Tamara Club on WhatsApp",
  "Selector de idioma": "Language selector",
  "Ubicación del gimnasio en Google Maps": "Gym location on Google Maps",
  "Tamara en competencia": "Tamara competing",
  "Mapa de ubicación de Tamara's Coach & Fitness Club en Tulum":
    "Map showing Tamara's Coach & Fitness Club in Tulum",
};

["aria-label", "title", "alt"].forEach((attr) => {
  document.querySelectorAll(`[${attr}]`).forEach((el) => {
    const value = el.getAttribute(attr);
    if (ATTR_TEXT[value]) el.setAttribute(attr, ATTR_TEXT[value]);
  });
});

const langLink = document.querySelector(".footer-lang-link");
if (langLink) {
  langLink.setAttribute("href", "/");
  langLink.setAttribute("hreflang", "es");
  langLink.setAttribute("lang", "es");
  langLink.textContent = "Versión en español";
}

const legalLink = document.querySelector(".footer-legal-link:not(.footer-lang-link)");
if (legalLink) legalLink.textContent = "Privacy Policy";

const skip = document.querySelector(".skip-link");
if (skip) skip.textContent = "Skip to content";

// Spanish alt text describes photos of the same gym; translate for the EN page.
const ALT_TEXT = {
  "Entrenamiento de fuerza en el gimnasio de Tamara en Tulum":
    "Strength training at Tamara's gym in Tulum",
  "Coaching técnico personalizado con entrenadora personal en Tulum":
    "Personalized technique coaching with a personal trainer in Tulum",
  "Trabajo integral de fuerza en el gimnasio de Tulum":
    "Full-body strength work at the gym in Tulum",
  "Tamara, coach de fitness en Tulum, con sus trofeos y medallas de competencia":
    "Tamara, fitness coach in Tulum, with her competition trophies and medals",
  "Clase de entrenamiento grupal en el gimnasio de Tulum":
    "Group training class at the gym in Tulum",
  "Alumna entrenando con pesas en el gimnasio de Tulum":
    "Member training with weights at the gym in Tulum",
  "Sesión de fuerza en el gimnasio de alto rendimiento en Tulum":
    "Strength session at the high-performance gym in Tulum",
  "Trabajo de fuerza con mancuernas en Tamara's Coaching & Fitness Club":
    "Dumbbell strength work at Tamara's Coaching & Fitness Club",
  "Acompañamiento técnico durante el entrenamiento personal en Tulum":
    "Technique support during personal training in Tulum",
  "Entrenamiento online guiado por Tamara, coach en Tulum":
    "Guided online training with Tamara, coach in Tulum",
  "Pantalla de la app: gestión de clases y horarios":
    "App screen: class and schedule management",
  "Pantalla de la app: reservas y cancelaciones al día":
    "App screen: up-to-date bookings and cancellations",
  "Pantalla de la app: inicio de sesión de alumnos": "App screen: member sign-in",
  "Vista de la aplicación Tamara's Coaching & Fitness Club":
    "Tamara's Coaching & Fitness Club app preview",
};

document.querySelectorAll("img[alt]").forEach((img) => {
  const value = img.getAttribute("alt");
  if (ALT_TEXT[value]) img.setAttribute("alt", ALT_TEXT[value]);
});

// script.js adds js-enabled at runtime; baking it in would leave the reveal
// animations at opacity:0 for anything that does not execute JavaScript.
document.documentElement.classList.remove("js-enabled");
document.querySelectorAll(".reveal.is-visible").forEach((el) => el.classList.remove("is-visible"));
document.querySelectorAll("[aria-current]").forEach((el) => el.removeAttribute("aria-current"));

// --- Path rewrites: /en/ is one level down, so relative assets would break ---
let out = "<!doctype html>\n" + document.documentElement.outerHTML;
out = out.replace(/(src|href)="(?!https?:|\/\/|\/|#|mailto:|tel:|data:)([^"]+)"/g, '$1="/$2"');

mkdirSync("en", { recursive: true });
writeFileSync("en/index.html", out);
console.log(`en/index.html written (${out.length} bytes)`);
