// const input_search = document.getElementById("input__search");
// const input_button = document.getElementById("input__button");
const icon = document.getElementById("weatherIcon");
const form = document.getElementById("input__container");
const inputSearch = document.getElementById("input__search");
const temperatureCheckbox = document.getElementById("degree");
// Get all spans inside the div with id 'day1'
let spans1 = document.querySelectorAll('#day1 > span');
let spans2 = document.querySelectorAll('#day2 > span');
let spans3 = document.querySelectorAll('#day3 > span');
let lang = 'en';  // default language is English
let unit= 'metric';
let data;
let language = {
    en: {
        feelsLike: "Feels like",
        Mph:"Mph",
        Kmh:"Km/h",
        // Add all other phrases in English
    },
    he: {
        feelsLike: "מרגיש כמו",
        Mph:"מייל לשעה",
        Kmh:'קמ"ש',
        // Add all other phrases in Hebrew
    }
};

async function get_weather(city, unit, lang) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=25&units=${unit}&lang=${lang}&appid=79da42dcc29428f019ea898d2ae465e3`
        );
  if (!response.ok) {
    throw new Error('Pick a City / Incorrect City Request');
  }
  data = await response.json();
  console.log(data);
  changeData();
} catch (error) {
    console.error(error);
    alert(error.message);
  }
}

  
function iconChange(imgId,description) {
    if (imgId && description) {
    if (description == 'Clouds') {
        imgId.src = "https://openweathermap.org/img/wn/02d@2x.png";
    }  else if (description == 'Clear') {
        imgId.src = "https://openweathermap.org/img/wn/01d@2x.png";
    }  else if (description == 'Snow') {
        imgId.src = "https://openweathermap.org/img/wn/13d@2x.png";
    } else if (description == 'Rain') {
        imgId.src = "https://openweathermap.org/img/wn/10d@2x.png";
    } else if (description == 'Drizzle') {
        imgId.src = "https://openweathermap.org/img/wn/09d@2x.png";
    } else if (description == 'Thunderstorm') {
        imgId.src = "https://openweathermap.org/img/wn/11d@2x.png";
    } else {
        imgId.src = "./images/weather-icon.png";
    }
}
}
function forcast3Days(){
    let j=1;
    console.log(spans1[1]);
    for(let i=7; i<=data.list.length-1; i+=8){ 
        const tempUnit = unit === 'metric' ? '°C' : '°F';
        document.querySelector(`#day${j} > span:nth-of-type(2)`).innerText = `${Math.round(data.list[i].main.temp)} ${tempUnit}`;  
        iconChange(document.getElementById(`weatherIconForcast${j}`),data.list[i].weather[0].main);
        let timestamp = data.list[i].dt;  
        let date = new Date(timestamp * 1000);
        let day = date.getDate();
        let month = date.getMonth() + 1;  
        let year = date.getFullYear();
        let formattedDate = `${day}/${month}/${year}`;
        document.querySelector(`#day${j} > span:nth-of-type(1)`).textContent = formattedDate;
        document.querySelector(`#day${j} > span:nth-of-type(3)`).textContent =data.list[i].weather[0].description;
        j++;
        
    }
}
function changeData() {
    const tempUnit = unit === 'metric' ? '°C' : '°F';
    iconChange(icon,data.list[0].weather[0].main);
    document.getElementById("city").innerText =  ` ${data.city.name}`;
    document.getElementById("temp").innerText = `${Math.round(data.list[0].main.temp)} ${tempUnit}`;
    document.getElementById("weather").innerText = `${data.list[0].weather[0].description} `;
    document.getElementById("hi-low").innerText = `${Math.round(data.list[0].main.temp_min)}${tempUnit} / ${Math.round(data.list[0].main.temp_max)}${tempUnit}`;
    if(lang==='en'){  
    document.getElementById("feels-like").innerText =  `${language[lang].feelsLike} ${Math.round(data.list[0].main.feels_like)}${tempUnit}`;    
}
    else{
        document.getElementById("feels-like").innerText = `${Math.round(data.list[0].main.feels_like)}${tempUnit} ${language[lang].feelsLike} `;  
}
    if(tempUnit === '°C')
    {
    document.getElementById("windTxt").innerText =  `${Math.round(data.list[0].wind.speed)} ${language[lang].Kmh}`;
    }
    else{
        document.getElementById("windTxt").innerText =  `${Math.round(data.list[0].wind.speed)} ${language[lang].Mph}`;
    }
    document.getElementById("humidTxt").innerText =  ` ${data.list[0].main.humidity} `;
    forcast3Days();
}

function formSubmitted(event){
    event.preventDefault();
    console.log(inputSearch.value);
    get_weather(inputSearch.value,unit);
}
function changeLanguage() {
    get_weather(inputSearch.value, unit, lang);
}
form.addEventListener("submit",formSubmitted);

temperatureCheckbox.addEventListener("change", function() {
    if(this.checked) {
        unit = 'imperial';  // Fahrenheit
    } else {
        unit = 'metric';  // Celsius
    }
    // Refresh the weather data with the updated unit
    get_weather(inputSearch.value, unit, lang);
});
const languageCheckbox = document.getElementById("language");

languageCheckbox.addEventListener("change", function() {
    if(this.checked) {
        lang = 'he';  // 
    } else {
        lang = 'en';  // 
    }
    console.log('Language changed to: ' + lang);  // Add this line
    changeLanguage();
});

// document.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") {
//     console.log(input_search.value);
//     get_weather(input_search.value);
//   }
// });


