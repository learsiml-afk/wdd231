const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");

navToggle.addEventListener("click", () => {
  primaryNav.classList.toggle("open");
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

const directory = document.querySelector("#directory");
const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");

const levelNames = { 1: "Member", 2: "Silver", 3: "Gold" };

async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  directory.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}" />
      <h3>${member.name}</h3>
      <span class="badge">${levelNames[member.level]}</span>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.url}" target="_blank">Website</a></p>
    `;

    directory.appendChild(card);
  });
}

gridButton.addEventListener("click", () => {
  directory.classList.add("grid");
  directory.classList.remove("list");
});

listButton.addEventListener("click", () => {
  directory.classList.add("list");
  directory.classList.remove("grid");
});

getMembers();