const axios = require("axios");

axios.interceptors.request.use(
    config => {
        console.log("Llamada con éxito: ", config.url);
        return config;
    },
    error => {
        if (error.response.status === 401) {
            // Redirigir al inicio de sesión o mostrar un mensaje de error
            console.error("No autorizado, redirigiendo...");
            // Aquí podrías implementar una lógica para redirigir
        }
        return Promise.reject(error);
        }
);

axios.interceptors.response.use(
    response => {
        console.log("Respuesta a la url: ", response.config.url);
        return response;
    },
    error => {
        console.log("Error en la response: ", error);
        return Promise.reject(error);
    }
);

// get con params query

async function MakeGetRequest() {
  let payload = { name: "John", email: "john@gmail.com" };

  const params = url.URLSearchParams(payload);

  let config = {
    methog: "get",
    url: `http://localhost:3000/player?${params}`,
  };

  let response = await axios(config);
  console.log("Datos del server: ", response.data);
}

async function MakePostRequest() {
    let payload = { name: "John", email: "john@gmail.com" };
    
    let config = {
      methog: "get",
      url: `http://localhost:3000/player`,
      data: payload
    };
  
    let response = await axios(config);
    console.log("Datos del server: ", response.data);
  }

MakeGetRequest();
MakePostRequest();
