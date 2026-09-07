// Ortak site davranışları: menü, modallar, formlar ve animasyonlar.
let activeModal = null;
let lastTrigger = null;
let toastTimer = null;

function openModal(id, trigger) {
  closeModal();
  const modal = document.getElementById(id);
  if (!modal) return;
  activeModal = modal;
  lastTrigger = trigger || document.activeElement;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  modal.querySelector("input, textarea, button")?.focus();
}

function closeModal() {
  if (!activeModal) return;
  activeModal.classList.remove("open");
  document.body.style.overflow = "";
  lastTrigger?.focus?.();
  activeModal = null;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
}

function closeMenu() {
  const menu = document.getElementById("mainNav");
  const button = document.getElementById("menuButton");
  menu?.classList.remove("open");
  button?.setAttribute("aria-expanded", "false");
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach(item => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16 });
  items.forEach(item => observer.observe(item));
}

function setupForm(formId, statusId, successMessage) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form || !status) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    form.reset();
    status.textContent = successMessage;
    showToast(successMessage);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-template-id$="logo"]').forEach(img => {
    img.addEventListener("error", () => { img.style.display = "none"; });
  });

  document.querySelectorAll("[data-open-modal]").forEach(button => {
    button.addEventListener("click", () => openModal(button.dataset.openModal, button));
  });
  document.querySelectorAll("[data-close-modal]").forEach(button => {
    button.addEventListener("click", closeModal);
  });
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", event => {
      if (event.target === backdrop) closeModal();
    });
  });
  document.querySelectorAll(".club-detail").forEach(button => {
    button.addEventListener("click", () => showToast("Kulüp detayları yakında aktif olacak."));
  });

  const menuButton = document.getElementById("menuButton");
  menuButton?.addEventListener("click", () => {
    const menu = document.getElementById("mainNav");
    const expanded = menu?.classList.toggle("open") || false;
    menuButton.setAttribute("aria-expanded", String(expanded));
  });

  document.addEventListener("click", event => {
    const nav = document.getElementById("mainNav");
    if (nav?.classList.contains("open") && !nav.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") activeModal ? closeModal() : closeMenu();
    if (event.key !== "Tab" || !activeModal) return;
    const focusable = [...activeModal.querySelectorAll("button, input, textarea, [href]")]
      .filter(node => !node.disabled);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  setupForm("contactForm", "contactMessageStatus", "İletişim formu yakında aktif olacak.");
  setupForm("notifyForm", "notifyMessageStatus", "Kayıt özelliği yakında aktif olacak.");

  const hero = document.getElementById("hero");
  if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    hero.addEventListener("pointermove", event => {
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
      hero.style.setProperty("--px", x + "px");
      hero.style.setProperty("--py", y + "px");
    });
    hero.addEventListener("pointerleave", () => {
      hero.style.setProperty("--px", "0px");
      hero.style.setProperty("--py", "0px");
    });
  }

  setupReveal();
});
