// Sadece fikstür bildirim penceresi. Ortak menü ve bağlantılar home.js içindedir.
const fixtureDialog = document.getElementById("notifyDialog");
const fixtureTrigger = document.getElementById("openNotify");
fixtureTrigger.addEventListener("click", () => {
  document.getElementById("notifyStatus").textContent = "";
  fixtureDialog.showModal();
  document.body.classList.add("fixture-dialog-open");
});
document.getElementById("closeNotify").addEventListener("click", () => fixtureDialog.close());
fixtureDialog.addEventListener("close", () => {
  document.body.classList.remove("fixture-dialog-open");
  fixtureTrigger.focus();
});
fixtureDialog.addEventListener("click", event => {
  const r = fixtureDialog.getBoundingClientRect();
  if (event.target === fixtureDialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) fixtureDialog.close();
});
document.getElementById("fixtureNotifyForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("notifyStatus").textContent = "Bildirim kaydı henüz aktif değil. E-posta adresiniz kaydedilmedi. Duyuruları Instagram hesabımızdan takip edebilirsiniz.";
});
