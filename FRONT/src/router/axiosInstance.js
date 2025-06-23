import axios from 'axios';

// const puerto = 8080;

export const axiosInstance = axios.create({
    baseURL: `  https://e7d0-2803-9800-9444-76e6-65fb-3f43-e9d6-bd29.ngrok-free.app`,
    headers: {
    "ngrok-skip-browser-warning": "true", 
  }
})