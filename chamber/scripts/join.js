const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");

navToggle.addEventListener("click", () => {
  primaryNav.classList.toggle("open");
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

document.querySelector("#timestamp").value = new Date().toISOString();

const modalLinks = document.querySelectorAll("[data-modal]");

modalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const modal = document.querySelector(`#${link.dataset.modal}`);
    modal.showModal();
  });
});

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});