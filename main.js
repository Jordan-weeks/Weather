const APIKey = "e77cb6ae9bcf75b1965cb99ac866be09"

let coordinates = {
    lat: "",
    lon: ""
}
let units = "imperial"
let unitsLetter = "F"
let weatherData
let weatherLocation = "Bend"

const getCoordinates = async(cityName) =>{
    const geoCoding = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=e77cb6ae9bcf75b1965cb99ac866be09`, {mode: "cors"})
    const geoCodingData = await geoCoding.json()
    coordinates.lat = geoCodingData[0].lat
    coordinates.lon = geoCodingData[0].lon
    console.log(coordinates.lon)
    
}
const getWeather = async () =>{
    const requestWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIKey}&units=${units}`, {mode: "cors"})
    weatherData = await requestWeather.json()
    
}
const updateDom = () =>{
    const cityName= document.querySelector(".city-name")
    const tempCurrent = document.querySelector(".temp-current")
    const tempRange = document.querySelector(".temp-range")
    const description = document.querySelector(".description")
    const icon = document.getElementById("icon")
    
    cityName.innerText = weatherData.name
    tempCurrent.innerHTML= weatherData.main.temp.toFixed()+`&deg; ${unitsLetter}`
    tempRange.innerHTML= `High/Low: ${weatherData.main.temp_max.toFixed()}&deg;${unitsLetter}/${weatherData.main.temp_min.toFixed()}&deg;${unitsLetter}`
    description.innerText = weatherData.weather[0].description
    icon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
}

const loadWeather = async(cityName) =>{
    await getCoordinates(cityName)
    await getWeather()
    updateDom()
    console.log(weatherData)
}

let search = document.querySelector(".search")
let searchLocation = document.querySelector("#location")
search.addEventListener("submit", (e) =>{
    e.preventDefault()
    weatherLocation= searchLocation.value
    loadWeather(weatherLocation)
    searchLocation.value= null
})
loadWeather(weatherLocation)

// toggle event listener
let toggleSwitch = document.querySelector(".toggle-input")
toggleSwitch.addEventListener("change", (e) =>{
    if (e.target.checked){
        units = "metric"
        unitsLetter = "C"
        loadWeather(weatherLocation)
        console.log("box checked")
    }
    if (e.target.checked === false) {
        units = "imperial"
        unitsLetter = "F"
        loadWeather(weatherLocation)
        console.log("box unchecked")
    }
    
})