// declaring API for weather forcast 
const api = {
    key:"d933420a282b4a618571018f5688014a",
    base: "https://api.openweathermap.org/data/2.5/"
}

// get search-box 
const search = document.getElementById("search");
search.addEventListener("keypress", setQuery)
function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResult(search.value);
    }
}
// getting final result
function getResult(query){
    // fetching api 
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResult)
}

// Displaying all our result 
function displayResult(weather) {
    let place = document.querySelector(".place .country")
    place.innerText = `${weather.name}, ${weather.sys.country}`
    if (weather.sys.country == null ) {
        place.innerText = `${weather.name}`
    }
    realTime = new Date()
    document.querySelector(".place .date").innerText = dateBuilder(realTime);

    let status = document.querySelector(".weather-status")
    let condition = status.innerText = weather.weather[0].main;

    document.querySelector(".weather-temp").innerText = `${Math.floor(weather.main.temp)}°C`;

    if (condition == "Sunny") {
        document.querySelector(".image").innerHTML = `<img src="./clear.png" alt="" width="200px" height="200px"></img>`
    } else if (condition == "Clouds"){
        document.querySelector(".image").innerHTML = `<img src="./clouds.png" alt="" width="200px" height="200px"></img>`
    } else if (condition == "Haze") {
        document.querySelector(".image").innerHTML = `<img src="./haze.png" alt="" width="200px" height="200px"></img>`
    } else if (condition == "Mist") {
        document.querySelector(".image").innerHTML = `<img src="./Mist.png" alt="" width="200px" height="200px"></img>`
    } else if (condition == "Clear"){
        document.querySelector(".image").innerHTML = `<img src="./clear.png" alt="" width="200px" height="200px"></img>`
    } else if (condition == "Rain"){
        document.querySelector(".image").innerHTML = `<img src="./rain.png" alt="" width="200px" height="200px"></img>`
    } else if (condition == "Thunderstorm"){
        document.querySelector(".image").innerHTML = `<img src="./storm.png" alt="" width="200px" height="200px"></img>`
    } else{
        document.innerText = "404 Page Not found"
    }

}


// Getting date in proper format
function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let date = d.getDate()
    let day = days[d.getDay()]
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
}
