import axios from "axios";

const api = axios.create({
  baseURL: "https://coach-finder-gabrielkim13.firebaseio.com"
});

export default api;
