
const apiKey = "710fddee8908cac13fed3d0c72f3d519";

document.getElementById("searchBtn").addEventListener("click", getWeatherInfo);

async function getWeatherInfo() {
    try {
        let city = document.getElementById("cityInput").value;
        if (city === "") {
            alert("Please enter a city name");
            return;
        }

        let cityName = document.getElementById("cityName");
        let temperature = document.getElementById("temp");
        let statValues = document.querySelectorAll(".stat-value");
        let weatherCard = document.getElementById("infoCard");

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("City not found");
        }

        const data = await res.json();

        weatherCard.style.display = "block";

        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;

        statValues[0].textContent = `${data.wind.speed} km/h`;          
        statValues[1].textContent = `${data.main.humidity}%`;           
        statValues[2].textContent = `${(data.visibility / 1000).toFixed(1)} km`; 
        statValues[3].textContent = `${data.main.pressure} hPa`;       

    } catch (err) {
        alert(err.message);
        document.getElementById("infoCard").style.display = "none";
    }
}

document.getElementById("cityInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeatherInfo();
    }
});
