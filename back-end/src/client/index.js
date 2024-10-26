const axios = require("axios");

axios.interceptors.request.use(
  (config) => {
    console.log("Llamada con éxito: ", config.url);
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      // Redirigir al inicio de sesión o mostrar un mensaje de error
      console.error("No autorizado, redirigiendo...");
      // Aquí podrías implementar una lógica para redirigir
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("Respuesta a la url: ", response.config.url);
    return response;
  },
  (error) => {
    console.log("Error en la response: ", error);
    return Promise.reject(error);
  }
);

// función general de requests que acepta cualquier método, data y parámetros (espectacular xD)

async function makeRequest(method, url, data = null, params = null) {
  try {
    const config = {
      method,
      url,
      ...(data && { data }), // Agrega 'data' solo si existe
      ...(params && { params }), // Agrega 'params' solo si existe
    };

    const response = await axios(config);
    console.log("Datos del server: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud: ", error);
    throw error;
  }
}


MakeGetRequest();
MakePostRequest();
