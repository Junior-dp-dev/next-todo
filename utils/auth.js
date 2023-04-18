import Cookies from "js-cookie";

const TOKEN_KEY = "myapp_token";

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

//Admin5277
