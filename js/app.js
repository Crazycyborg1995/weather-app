document.addEventListener("DOMContentLoaded",fetchData)

function fetchData(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    console.log("err");
  }
}

function showPosition(position) {
  console.log("here")
  fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude.toFixed(1)}&lon=${position.coords.longitude.toFixed(2)}`).then(response => response.json()).then(data => {
    document.querySelector(".place").textContent = data.name;
    document.querySelector(".temperature").textContent = data.main.temp;
    document.querySelector(".rain").textContent = data.clouds.all;
    document.querySelector(".wind").textContent = data.wind.speed;
    document.querySelector(".humidity").textContent = data.main.humidity;
    document.querySelector(".description").textContent = data.weather[0].description;

  })
}
function showError(error) {
  document.querySelector(".place").textContent = "Not Available";
  switch(error.code) {
    case error.PERMISSION_DENIED:
      document.querySelector(".weather-card").textContent = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      document.querySelector(".weather-card").textContent = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      document.querySelector(".weather-card").textContent = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      document.querySelector(".weather-card").textContent = "An unknown error occurred."
      break;
  }
}


document.querySelector(".date").textContent = getDates();


function getDates(){
  let date = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  return `${monthNames[date.getMonth()]} ${date.getDate()}`
}

document.querySelector(".converter").addEventListener("click",convertTemperature)

function convertTemperature(){
 let temp = document.querySelector(".temperature").textContent;
 let unit = document.querySelector(".unit").textContent;
 if(unit === 'C'){
  document.querySelector(".temperature").textContent= ((temp*(9/5)) + 32);
   document.querySelector(".unit").textContent = 'F';
 }
 else{
  document.querySelector(".temperature").textContent = ((temp-32) * (5/9)).toFixed(1);
  document.querySelector(".unit").textContent = 'C';
 }
}

