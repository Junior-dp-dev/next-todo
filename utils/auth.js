import Cookies from "js-cookie";

const TOKEN_KEY = "myapp_token";
const REFRESH_TOKEN_KEY = "myapp_refreshtoken";

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const setRefreshToken = (token) => {
  Cookies.set(REFRESH_TOKEN_KEY, token, { expires: 7 });
};

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeRefreshToken = () => {
  Cookies.remove(REFRESH_TOKEN_KEY);
};
