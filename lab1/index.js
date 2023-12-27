let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");

searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value;
  let finalURLCountry = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;  //access

  fetch(finalURLCountry) //GET
    .then((response) => response.json())  //декодирует объект в формате json
    .then((data) => {
      console.log(data[0])
      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">

        <h2>${data[0].name.common}</h2>

        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>

        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>

         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${data[0].population.toLocaleString('ru')}</span>
            </div>
        </div>

        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>${
                  data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
        
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages)
                  .toString()
                  .split(",")
                  .join(", ")}</span>
            </div>
        </div>
      `;

      const weatherData = fetch(`http://api.weatherapi.com/v1/current.json?key=3abe3e8d3ed147b0ac081033231809&q=${data[0].capital[0]}`) 

      return Promise.all([data, weatherData.then((response) => response.json())])
    })
    .then(([data, weatherData]) => {
      console.log(weatherData);
      resultWeather.innerHTML = `
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Weather in ${data[0].capital[0]}:</h4>
            <span>${weatherData.current.temp_c}°C, ${weatherData.current.condition.text}</span>
          </div>
        </div>
      ` 
    })
    .catch(() => {  //err
      if (countryName.length == 0) {
        result.innerHTML = `<h3>The input field can't be empty</h3>`;
        resultWeather.innerHTML = '';
      } else {
        result.innerHTML = `<h3>Please, enter a valid country name</h3>`;
        resultWeather.innerHTML = '';
      }
    }); 
});
