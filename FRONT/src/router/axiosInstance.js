import axios from "axios";

// const puerto = 8080;

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
    "ngrok-skip-browser-warning": "true", 
  }
})