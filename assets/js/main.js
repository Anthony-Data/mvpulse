// MVPulse — interactions du site

// Adresse qui reçoit les demandes du formulaire (en attendant un vrai service d'envoi).
const CONTACT_EMAIL = "contact@mvpulse.fr";

document.documentElement.classList.remove("no-js");

// ----- Menu mobile -----
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
}

burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

// ----- Header opaque au scroll -----
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ----- Apparition des éléments au scroll -----
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// ----- Compteurs animés -----
const counters = document.querySelectorAll("[data-count]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateCounter(el) {
  const target = Number(el.dataset.count);
  if (reduceMotion) {
    el.textContent = target;
    return;
  }
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  });
  counters.forEach((el) => counterObserver.observe(el));
} else {
  counters.forEach((el) => (el.textContent = el.dataset.count));
}

// ----- Présélection de la formule depuis les cartes -----
const formuleSelect = document.getElementById("formule");
document.querySelectorAll("[data-offer]").forEach((btn) => {
  btn.addEventListener("click", () => {
    formuleSelect.value = btn.dataset.offer;
  });
});

// ----- Formulaire de contact -----
// Premier jet : ouvre le client mail avec la demande pré-remplie.
// À remplacer plus tard par un service (Formspree, Resend, fonction Vercel…).
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const required = form.querySelectorAll("[required]");
  let valid = true;
  required.forEach((field) => {
    const ok = field.value.trim() !== "" && field.checkValidity();
    field.classList.toggle("is-invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    status.textContent = "Merci de remplir les champs obligatoires (prénom, email valide, objectif).";
    status.className = "form__status is-error";
    return;
  }

  const data = new FormData(form);
  const subject = `Séance découverte — ${data.get("prenom")} ${data.get("nom")}`.trim();
  const body = [
    `Prénom : ${data.get("prenom")}`,
    `Nom : ${data.get("nom")}`,
    `Email : ${data.get("email")}`,
    `Téléphone : ${data.get("telephone")}`,
    `Formule : ${data.get("formule")}`,
    "",
    "Objectif :",
    data.get("message"),
  ].join("\n");

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  status.textContent = "Ton application mail va s'ouvrir avec ta demande. Tu peux aussi nous écrire sur Instagram !";
  status.className = "form__status is-success";
});

// ----- Année du footer -----
document.getElementById("year").textContent = new Date().getFullYear();
