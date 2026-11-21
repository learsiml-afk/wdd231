const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;


const API_KEY = "zpka_675a1f4cdc524933b0b0be7d04f8e6d6_aaa9fb71";
const LAT = 32.5149;
const LON = -117.0382;
const BASE = "https://api.openweathermap.org/data/2.5";

const currentWeather = document.querySelector("#currentWeather");
const forecastList = document.querySelector("#forecast");

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function getWeather() {
  try {
    const query = `lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${BASE}/weather?${query}`),
      fetch(`${BASE}/forecast?${query}`)
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error("Weather request failed");
    }

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    displayCurrent(current);
    displayForecast(forecast);
  } catch (error) {
    console.error(error);
    currentWeather.innerHTML = "<p>Weather is unavailable right now. Please try again later.</p>";
  }
}

function displayCurrent(data) {
  const weather = data.weather[0];
  currentWeather.innerHTML = `
    <div class="current-row">
      <img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="" width="50" height="50">
      <p class="temp">${Math.round(data.main.temp)}&deg;C</p>
    </div>
    <p>${capitalize(weather.description)}</p>
    <p>High ${Math.round(data.main.temp_max)}&deg; &middot; Low ${Math.round(data.main.temp_min)}&deg;</p>
  `;
}

function displayForecast(data) {
  // Group the 3-hour entries by local calendar day in Tijuana.
  const offset = data.city.timezone; // seconds from UTC
  const localKey = (seconds) => new Date((seconds + offset) * 1000).toISOString().slice(0, 10);
  const todayKey = localKey(Math.floor(Date.now() / 1000));

  const days = {};
  data.list.forEach((entry) => {
    const key = localKey(entry.dt);
    if (key === todayKey) return;
    (days[key] = days[key] || []).push(entry);
  });

  forecastList.innerHTML = "";

  Object.keys(days).slice(0, 3).forEach((key) => {
    const entries = days[key];
    const high = Math.max(...entries.map((e) => e.main.temp_max));
    const low = Math.min(...entries.map((e) => e.main.temp_min));
    // Use the entry closest to midday for the description and icon.
    const midday = entries.reduce((best, e) => {
      const hour = new Date((e.dt + offset) * 1000).getUTCHours();
      const bestHour = new Date((best.dt + offset) * 1000).getUTCHours();
      return Math.abs(hour - 12) < Math.abs(bestHour - 12) ? e : best;
    });
    const dayName = new Date(`${key}T12:00:00Z`).toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "UTC"
    });

    const item = document.createElement("li");
    item.innerHTML = `
      <span class="day">${dayName}</span>
      <img src="https://openweathermap.org/img/wn/${midday.weather[0].icon}.png" alt="" width="40" height="40">
      <span>${capitalize(midday.weather[0].description)}</span>
      <span class="range">${Math.round(high)}&deg; / ${Math.round(low)}&deg;</span>
    `;
    forecastList.appendChild(item);
  });
}

/* ---------- Member spotlights ---------- */
const spotlightList = document.querySelector("#spotlightList");
const levelNames = { 1: "Member", 2: "Silver", 3: "Gold" };

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Members request failed");
    const data = await response.json();

    const eligible = data.members.filter((member) => member.level >= 2);
    const count = Math.random() < 0.5 ? 2 : 3;
    displaySpotlights(shuffle(eligible).slice(0, count));
  } catch (error) {
    console.error(error);
    spotlightList.innerHTML = "<p>Member spotlights are unavailable right now.</p>";
  }
}

function displaySpotlights(members) {
  spotlightList.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} storefront" width="400" height="200" loading="lazy">
      <h3>${member.name}</h3>
      <span class="badge">${levelNames[member.level]}</span>
      <p class="tagline">${member.tagline}</p>
      <p>${member.phone}</p>
      <p><a href="${member.url}" target="_blank" rel="noopener" aria-label="Visit ${member.name} website">Website</a></p>
    `;

    spotlightList.appendChild(card);
  });
}

getWeather();
getSpotlights();