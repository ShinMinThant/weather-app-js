const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const weatherInfo = document.getElementById("weatherInfo");
const errorMessage = document.getElementById("errorMessage");
const loadingMessage = document.getElementById("loadingMessage");

const apiKey = "1b4e617a2e99edd6016d062f50fdfd09";

cityInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", function () {
  const city = cityInput.value;
  loadingMessage.textContent = "Loading....";
  errorMessage.textContent = "";
  weatherInfo.style.display = "none";

  if (city.trim() === "") {
    weatherInfo.style.display = "none";
    loadingMessage.textContent = "";
    weatherIcon.textContent = "";
    errorMessage.textContent = "Please enter a city name!";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        loadingMessage.textContent = "";
        if (data.cod !== 200) {
          weatherInfo.style.display = "none";
          loadingMessage.textContent = "";
          weatherIcon.textContent = "";
          errorMessage.textContent = `City not found!`;
          return;
        }
        errorMessage.textContent = "";
        loadingMessage.textContent = "";
        weatherInfo.style.display = "block";

        cityName.textContent = data.name;
        temp.textContent = `Temperature: ${data.main.temp} °C`;
        condition.textContent = `Condition: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind: ${data.wind.speed} m/s`;

        const mainWeather = data.weather[0].main;

        if (mainWeather === "Clear") {
          weatherIcon.textContent = "☀️";
        } else if (mainWeather === "Clouds") {
          weatherIcon.textContent = "☁️";
        } else if (mainWeather === "Rain") {
          weatherIcon.textContent = "🌧️";
        } else if (mainWeather === "Snow") {
          weatherIcon.textContent = "❄️";
        } else if (mainWeather === "Thunderstorm") {
          weatherIcon.textContent = "⛈️";
        } else {
          weatherIcon.textContent = "🌤️";
        }
      }, 500);
    })
    .catch((error) => {
      weatherInfo.style.display = "none";
      errorMessage.textContent = "Something went wrong. Try again!";
      console.log(error);
    });
});
