import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_FIREBASE_API_URL
});

export const identityApi = axios.create({
  baseURL: process.env.VUE_APP_IDENTITY_API_URL,
  params: {
    key: process.env.VUE_APP_FIREBASE_API_KEY
  }
});

export default api;
