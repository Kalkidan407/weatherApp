// const input = document.querySelector("input");
const btnSer = document.querySelector("#btn");
const input = document.querySelector("input");
const loadingElement = document.getElementById("loading");
function getImage() {
  const accessKey = "twBjYe9uU6gQ0IJ0IDwbKC1xO3l8Uj-JBMsP7x8DUYA";
  const query = input.value.trim();
  loadingElement.style.display = "block";
  fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      loadingElement.style.display = "none";
      const totalImages = data.results.length;
      const randomIndex = Math.floor(Math.random() * totalImages);
      const imageUrl = data.results[randomIndex].urls.regular;
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.height = "100vh";
      document.body.style.width = "100vw";
      input.value = "";
    })
    .catch((err) => console.log("Error fetching data from Unsplash:" + err));
}

async function weatherData() {
  const ctyName = document.querySelector(".ctyName");
  const ctyWea = document.querySelector("#wea");
  const tempName = document.querySelector("#temp");
  const humName = document.querySelector("#humi");
  const wind = document.querySelector("#wind");
  const input = document.querySelector("input");
  try {
    const myAssessKey = "27af54d25bccdad5f53eb908ab1cbe3c";
    const cityName = input.value.trim();
    const dataFetch =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myAssessKey}&units=metric
`);
    const data = await dataFetch.json();
    ctyName.textContent = "🌦️  " + data.name;
    ctyWea.textContent =
      "Weather : " + data.weather[0].description + " , " + data.weather[0].main;
    tempName.textContent = "Temperature  🌡: " + data.main.temp + "°🇨";
    wind.textContent = "Wind : " + data.wind.speed + "m/s";
    humName.textContent = "Humidity: " + data.main.humidity + "%";
  } catch (error) {
    console.error("Error fetching data from openWeather");
  }
}

const card = document.querySelector(".card");
btnSer.addEventListener("click", () => {
  card.style.display = "block";

  getImage();
  weatherData();
});
