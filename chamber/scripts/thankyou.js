const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");

navToggle.addEventListener("click", () => {
  primaryNav.classList.toggle("open");
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

const params = new URLSearchParams(window.location.search);

function formatTimestamp(value) {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date)) return value;
  return date.toLocaleString();
}

document.querySelector("#outFirstName").textContent = params.get("firstName") || "";
document.querySelector("#outLastName").textContent = params.get("lastName") || "";
document.querySelector("#outEmail").textContent = params.get("email") || "";
document.querySelector("#outMobile").textContent = params.get("mobile") || "";
document.querySelector("#outBusinessName").textContent = params.get("businessName") || "";
document.querySelector("#outTimestamp").textContent = formatTimestamp(params.get("timestamp"));