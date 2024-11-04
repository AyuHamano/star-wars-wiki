import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://swapi.dev/api/",
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          alert("Solicitação inválida.");
          break;
        case 401:
          alert("Não autorizado. Por favor, faça login novamente.");
          break;
        case 404:
          alert("Recurso não encontrado.");
          break;
        case 500:
          alert("Erro no servidor. Tente novamente mais tarde.");
          break;
        default:
          alert("Ocorreu um erro inesperado. Tente novamente.");
          break;
      }
    } else if (error.request) {
      alert("Não foi possível conectar ao servidor. Verifique sua conexão.");
    } else {
      alert("Erro ao configurar a requisição. Tente novamente.");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
