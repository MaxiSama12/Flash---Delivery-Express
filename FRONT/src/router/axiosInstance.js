import axios from 'axios';

// const puerto = 8080;

export const axiosInstance = axios.create({
    baseURL: `https://0e80-2803-9800-9444-76e6-21b5-5385-5916-b447.ngrok-free.app/`,
    headers: {
    "ngrok-skip-browser-warning": "true", 
  }
})