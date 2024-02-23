const inputCity = document.querySelector(".input-city")
const btn = document.querySelector(".submit")
const cityValue = document.querySelector(".city")
const weatherValue = document.querySelector(".weather")
const temperatureValue = document.querySelector(".temperature")
const body = document.querySelector("body")

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q="
const API_KEY = "&appid=49bb800191bf22a61ffb181121769f3d"
const API_UNITS = "&units=metric"
const API_LANG = "&lang=pl"

const getWeather = () => {
	const city = inputCity.value || "Katowice"
	const URL = API_LINK + city + API_KEY + API_UNITS + API_LANG
	inputCity.value = ""

	fetch(URL)
		.then(res => res.json())
		.then(data => {
			if (data.cod == 200) {
				const temp = Math.floor(data.main.temp)
				handleColor(temp)
				cityValue.innerHTML = "Miasto: " + city
				temperatureValue.innerHTML =
					"Temperatura: " + Math.floor(data.main.temp) + "°C"
				weatherValue.innerHTML = "Pogoda: " + data.weather[0].description
			} else if (data.cod == 404) {
				alert("Wprowadź poprawną nazwę miasta!")
			}
		})
		.catch(err => console.log(err))
}

const handleColor = temp => {
	if (temp <= -10) {
		body.className = ""
		body.classList.add("cold")
	} else if (temp > -10 && temp <= 5) {
		body.className = ""
		body.classList.add("cool")
	} else if (temp > 5 && temp <= 15) {
		body.className = ""
		body.classList.add("comfort")
	} else if (temp > 15 && temp <= 25) {
		body.className = ""
		body.classList.add("warm")
	} else if (temp > 25) {
		body.className = ""
		body.classList.add("hot")
	}
}

const enterCheck = e => {
	if (e.key === "Enter") {
		getWeather()
	}
}

inputCity.addEventListener("keyup", enterCheck)
btn.addEventListener("click", getWeather)
getWeather()
