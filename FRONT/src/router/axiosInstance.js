import axios from 'axios';

// const puerto = 8080;

export const axiosInstance = axios.create({
    baseURL: `https://a704-2803-9800-9444-76e6-a49d-efc-8555-1412.ngrok-free.app`,
    headers: {
    "ngrok-skip-browser-warning": "true", 
  }
})