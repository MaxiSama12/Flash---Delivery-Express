import axios from "axios";

// const puerto = 8080;

export const axiosInstance = axios.create({
    baseURL: "https://31dd-2803-9800-9444-76e6-8592-d5e8-557d-ad15.ngrok-free.app",
    headers: {
    "ngrok-skip-browser-warning": "true", 
  }
})