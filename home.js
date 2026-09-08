/* BAĞLANTILARI BURADAN DÜZENLEYİN.
 * instagram: "https://www.instagram.com/HESAP_ADINIZ/"
 * youtube: "https://www.youtube.com/@KANAL_ADINIZ"
 * WhatsApp numarası ülke koduyla, + ve boşluk olmadan yazılır.
 * E-posta bağlantısı cihazın e-posta uygulamasını açar.
 */
const HOME_CONTACT = {
  email: "baskentgelisimligi@gmail.com",
  whatsapp: "https://wa.me/905323351001",
  instagram: "",
  youtube: ""
};

document.querySelectorAll("[data-contact]").forEach(link => {
  const key = link.dataset.contact;
  const value = HOME_CONTACT[key]?.trim();
  if (!value) return;
  const href = key === "email" ? "mailto:" + value : value;
  if (key !== "email" && !href.startsWith("https://")) return;
  link.href = href;
  link.removeAttribute("aria-disabled");
  if (key !== "email") {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});
document.querySelectorAll('[data-contact-label="email"]').forEach(label => {
  label.textContent = HOME_CONTACT.email;
});

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("mainNav");
function setMenu(open) {
  menu.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
}
menuButton.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
document.addEventListener("click", event => {
  if (event.target.closest(".nav-link") || (!menu.contains(event.target) && !menuButton.contains(event.target))) setMenu(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menu.classList.contains("open")) {
    setMenu(false);
    menuButton.focus();
  }
});
window.matchMedia("(min-width: 861px)").addEventListener("change", () => setMenu(false));

/* Bir ikon henüz yüklenmediyse kırık görsel yerine metin görünür. */
document.querySelectorAll(".footer-icon").forEach(icon => {
  const hideMissing = () => { icon.hidden = true; };
  icon.addEventListener("error", hideMissing);
  if (icon.complete && icon.naturalWidth === 0) hideMissing();
});
