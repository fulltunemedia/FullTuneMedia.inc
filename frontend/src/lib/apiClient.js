import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const setAdminToken = (token) => {
  if (token) {
    api.defaults.headers["X-Admin-Token"] = token;
    localStorage.setItem("ftm_admin_token", token);
  } else {
    delete api.defaults.headers["X-Admin-Token"];
    localStorage.removeItem("ftm_admin_token");
  }
};

const stored = localStorage.getItem("ftm_admin_token");
if (stored) api.defaults.headers["X-Admin-Token"] = stored;
