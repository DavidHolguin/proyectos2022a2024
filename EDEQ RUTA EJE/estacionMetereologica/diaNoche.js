function esDeNoche() {
    const horaActual = new Date().getHours();
    return horaActual >= 18 || horaActual < 6; // Supongamos que de 6 PM a 6 AM es de noche
  }

  // Función para cambiar la clase del contenedor principal
  function actualizarFondo() {
    const contenedorPrincipal = document.querySelector('.backgroundDashboard');
    const claseNoche = 'backgroundDashboardNoche';

    const contenedorMetricas = document.querySelector('.containerDashboard_metricasSecundarias');
    const metricasSecundariasNoche = 'containerDashboard_metricasSecundariasNoche';

    const contenedorMetricasPrincipal = document.querySelector('.metricasPrincipales_containerPrincipal');
    const metricasPrincipalNoche = 'metricasPrincipales_containerPrincipalNoche';

    const contenedorSelectCity = document.querySelector ('..radio-inputs');
    const contenedorSelectCityNoche = document.querySelector ('..radio-inputsNoche');

    if (esDeNoche()) {
      contenedorPrincipal.classList.add(claseNoche);
      contenedorMetricas.classList.add(metricasSecundariasNoche);
      contenedorMetricasPrincipal.classList.add(metricasPrincipalNoche);
      contenedorSelectCity.classList.add(contenedorSelectCityNoche);

    } else {
      contenedorPrincipal.classList.remove(claseNoche);
      contenedorMetricas.classList.remove(metricasSecundariasNoche);
      contenedorMetricasPrincipal.classList.remove(metricasPrincipalNoche);
      contenedorSelectCity.classList.remove(contenedorSelectCityNoche);

    }
  }

  // Llamamos a la función al cargar la página
  window.onload = function () {
    actualizarFondo();

    // Además, puedes configurar un temporizador para actualizar la clase cada cierto tiempo
    setInterval(actualizarFondo, 60000); // Actualiza cada minuto (en milisegundos)
  };