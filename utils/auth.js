import Cookies from "js-cookie";

const TOKEN_KEY = "myapp_token";
const REFRESH_TOKEN_KEY = "myapp_refreshtoken";
const USERNAME = "myapp_username";

//Token
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

//Refresh Token
export const setRefreshToken = (token) => {
  Cookies.set(REFRESH_TOKEN_KEY, token, { expires: 7 });
};

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeRefreshToken = () => {
  Cookies.remove(REFRESH_TOKEN_KEY);
};

//Username
export const setUsernameCookies = (username) => {
  Cookies.set(USERNAME, username, { expires: 7 });
};

export const getUsernameCookies = () => {
  return Cookies.get(USERNAME);
};

export const removeUsernameCookies = () => {
  Cookies.remove(USERNAME);
};
