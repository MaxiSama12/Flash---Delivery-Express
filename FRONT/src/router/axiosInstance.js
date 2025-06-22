import axios from 'axios';

const puerto = 3000;

export const axiosInstance = axios.create({
    baseURL: `http://localhost:${puerto}`,
    headers: {
    "ngrok-skip-browser-warning": "true", 
  }
})