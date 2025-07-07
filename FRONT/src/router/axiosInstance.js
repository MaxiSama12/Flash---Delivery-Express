import axios from 'axios';

// const puerto = 8080;

export const axiosInstance = axios.create({
    baseURL: `https://flash-delivery-express-back.onrender.com`,
    headers: {
    "ngrok-skip-browser-warning": "true", 
  }
})