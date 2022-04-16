let weather = {
    apikey : "a8e33076cbae658ffa5ff8c21b8e42c4",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apikey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".description").innerText = description.toUpperCase();
        document.querySelector(".humidity").innerText = "HUMIDITY: " + humidity + "%";
        document.querySelector(".wind").innerText = "WIND SPEED: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);

    }
}

document
    .querySelector(".search button")
    .addEventListener("click", function () {
        weather.search();
        document.querySelector(".search-bar").value = "";
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
        document.querySelector(".search-bar").value = "";
    }
});

weather.fetchWeather("Ghaziabad");
