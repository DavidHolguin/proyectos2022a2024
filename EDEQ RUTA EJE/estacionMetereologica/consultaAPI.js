document.addEventListener("DOMContentLoaded", function() {
  const apiKey = '5959c3fb533ea0804f267554f465237b';
  let city = 'Salento'; // Inicialmente, Salento está seleccionado
  
  const radioInputs = document.querySelectorAll('input[name="radio"]');
  
  // Iterar sobre los elementos de radio para detectar cambios
  radioInputs.forEach(input => {
      input.addEventListener('change', function() {
          if (this.checked) {
              city = this.value; // Actualizar la ciudad seleccionada
              fetchData(city); // Volver a obtener datos según la nueva ciudad seleccionada
          }
      });
  });

  // Llamar a la función fetchData para obtener los datos iniciales
  fetchData(city);

  function fetchData(city) {
      let apiUrl = '';
      // Verificar la ciudad seleccionada y asignar las coordenadas correspondientes
      if (city === 'Salento') {
          apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=4.633&lon=-75.567&appid=' + apiKey + '&units=metric';
      } else if (city === 'Cocora') {
          apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=4.6483&lon=-75.3636&appid=' + apiKey + '&units=metric';
      } else {
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      }

      // Hacer una solicitud GET a la API
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          // Obtener la descripción y el icono de la respuesta de la API
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;

          // Actualizar la imagen en la página
          updateImage(icon);

          const seaLevel = data.main.sea_level;
          const tempMax = data.main.temp_max;
          const tempMin = data.main.temp_min;
          const presion = data.main.pressure;
          const cityAPI = data.name;
          const country = data.sys.country;

          // Insertar variables en el HTML
          const weatherInfoTemperatura = document.getElementById('varMeterTemperatura');
          weatherInfoTemperatura.innerHTML = `<h2>${data.main.temp} °C</h2>`;

          const weatherInfoVelViento = document.getElementById('varMeterVelViento');
          weatherInfoVelViento.innerHTML = `<h3>${data.wind.speed} m/s</h3>`;

          const weatherInfoHumedad = document.getElementById('varMeterHumedad');
          weatherInfoHumedad.innerHTML = `<h3>${data.main.humidity} %</h3>`;

          const weatherInfoLevelSea = document.getElementById('varMeterLevelSea');
          weatherInfoLevelSea.innerHTML = `<p>${seaLevel} hPa</p>`; // hPa es la unidad de medida del nivel del mar   

          const weatherInfoTempMax = document.getElementById('varMetereologicaTempMax');
          weatherInfoTempMax.innerHTML = `<p>${tempMax} °C</p>`;

          const weatherInfoTempMin = document.getElementById('varMetereologicaTempMin');
          weatherInfoTempMin.innerHTML = `<p>${tempMin} °C</p>`;

          const weatherInfoPresion = document.getElementById('varMeterPresion');
          weatherInfoPresion.innerHTML = `<h3>${presion} PA</h3>`;

          const weatherInfoCity = document.getElementById('varMeterCity');
          if (city=='Salento') {
            weatherInfoCity.innerHTML = `<h3>${cityAPI} Quindío</h3>`;
          }
          else {
            weatherInfoCity.innerHTML = `<h3>Valle del Cocora </h3>`;
          }
           


          // Obtener el día de la semana y la fecha actual
          const currentDate = new Date();
          const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
          const dayOfWeek = days[currentDate.getDay()];
          const date = currentDate.getDate();
          const month = currentDate.getMonth() + 1;
          const year = currentDate.getFullYear();

          // Insertar el día de la semana y la fecha en el HTML
          const weatherInfoFecha = document.getElementById('varMeterFecha');
          weatherInfoFecha.innerHTML = `<p>${dayOfWeek}, ${date}/${month}/${year}</p>`;
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }

  function updateImage(icon) {
      
// Obtener el elemento <article> por su clase
var article = document.querySelector('.metricasPrincipales_containerIcon');

// Definir la URL base de las imágenes
var baseUrl = 'https://rutaeje.com/wp-content/uploads/2024/02/';

// Definir el nombre del archivo de imagen basado en el icono proporcionado
var imageName = '';

// Mapear los iconos a los nombres de las imágenes correspondientes
var iconImageMap = {
  '01d': 'clear_sky.png',
  '01n': 'clear_sky_n.png',
  '02d': 'few_clouds.png',
  '02n': 'few_clouds_n.png',
  '03d': 'scattered_clouds.png',
  '03n': 'scattered_clouds.png',
  '04d': 'broken-clouds.png',
  '04n': 'broken-clouds.png',
  '09d': 'shower_rain.png',
  '09n': 'shower_rain_n.png',
  '10d': 'rain.png',
  '10n': 'rain_n.png',
  '11d': 'thunderstorm.png',
  '11n': 'thunderstorm_n.png',
  // Agrega más iconos según sea necesario
};

// Verificar si el icono está mapeado y obtener el nombre de la imagen correspondiente
if (icon in iconImageMap) {
  imageName = iconImageMap[icon];
} else {
  // Si el icono no está mapeado, usar una imagen predeterminada o manejar el caso según sea necesario
  imageName = 'few_clouds.png';
}

// Actualizar el estilo de fondo del elemento <article> con la nueva imagen
article.style.backgroundImage = "url('" + baseUrl + imageName + "')";

  }
});
