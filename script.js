const apiKey = "6132fec94da4ace11d48ce084d866dd6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.querySelector(".search button");
const cityInput = document.querySelector(".search input");
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal-text");
const closeModal = document.querySelector(".close-modal");
const tempToggle = document.querySelector("#temp-toggle");
let tempCelsius = true;

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found!");
        }
        const data = await response.json();

        // Update UI
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Weather Icon
        const weatherIcon = document.querySelector(".weather-icon");
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // Background Change
        changeBackground(data.weather[0].main.toLowerCase());

        // Rain Alert
        if (data.weather[0].main.toLowerCase().includes("rain")) {
            showModal(`🌧️ Rain Alert: It's going to rain in ${data.name}!`);
        }

        tempToggle.dataset.celsius = data.main.temp;

    } catch (error) {
        alert(error.message);
    }
}

function changeBackground(weather) {
    const body = document.body;
    if (weather === "clear") body.style.background = "#87CEEB";
    else if (weather.includes("cloud")) body.style.background = "#B0C4DE";
    else if (weather.includes("rain")) body.style.background = "#4A4A4A";
    else body.style.background = "#5b548a";
}

function showModal(message) {
    modalText.innerText = message;
    modal.style.display = "block";
}

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

tempToggle.addEventListener("click", () => {
    let tempValue = parseFloat(document.querySelector(".temp").innerText);
    tempCelsius = !tempCelsius;
    document.querySelector(".temp").innerHTML = tempCelsius ? `${Math.round(tempValue)}°C` : `${Math.round(tempValue * 9/5 + 32)}°F`;
    tempToggle.innerText = tempCelsius ? "Switch to °F" : "Switch to °C";
});

searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value.trim());
});

checkWeather("Chennai");
