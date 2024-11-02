import axios from "axios";
import config from "@/config";

const api = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
