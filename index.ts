const apiKey = "ab286ebd0c34c25827c199893efa0c69";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const weatherIcon = document.querySelector(".weather-image i");

const searchInput =
  document.querySelector<HTMLInputElement>(".search-box input");
const searchButton =
  document.querySelector<HTMLButtonElement>(".search-box button");

const weather = document.querySelector<HTMLDivElement>(".weather");
const error = document.querySelector<HTMLDivElement>(".error");

async function checkWeather(city: string) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    error!.style.display = "block";
    weather!.style.display = "none";
  }

  const data = await response.json();

  document.querySelector(".city")!.innerHTML = data.name;
  document.querySelector(".temp")!.innerHTML =
    Math.round(data.main.temp) + "&#8451";
  document.querySelector(".humidity")!.innerHTML = data.main.humidity + "%";
  document.querySelector(".wind")!.innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main == "Clear") {
    weatherIcon!.className = "fa-solid fa-sun";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon!.className = "fa-solid fa-cloud-rain";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon!.className = "fa-solid fa-cloud-mist";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon!.className = "fa-solid fa-cloud-drizzle";
  }

  weather!.style.display = "block";
  error!.style.display = "none";
}

searchButton!.addEventListener("click", () => {
  checkWeather(searchInput!.value);
  searchInput!.value = "";
});

searchInput!.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.keyCode == 13) {
    checkWeather(searchInput!.value);
    searchInput!.value = "";
  }
});
