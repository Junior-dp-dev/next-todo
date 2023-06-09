import { getToken, getRefreshToken, setToken, setRefreshToken } from "../utils/auth";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.API_URL}/api`,
  timeout: 5000,
});

async function refreshAccessToken() {
  const refresh_token = getRefreshToken();
  try {
    const response = await axios.post(`${process.env.API_URL}/api/token/refresh/`, {
      refresh: refresh_token,
    });
    const { access } = response.data;
    setToken(access);
    setRefreshToken(response.data.refresh);
  } catch (error) {
    console.error(error);
  }
  "Token atualizado em: " + new Date();
}

// Adiciona um interceptor de solicitação para adicionar o cabeçalho Authorization com o token atualizado
axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adiciona um interceptor de resposta para renovar o token se houver um erro de autenticação (401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se o erro for de autenticação (401 Unauthorized) e a solicitação original não foi uma solicitação de atualização de token, tente renovar o token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessToken();

      // Espere por 1 segundo para garantir que o novo token seja definido
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

// Atualiza o token a cada 4 minutos
setInterval(refreshAccessToken, 4 * 60 * 1000);

export default axiosInstance;
