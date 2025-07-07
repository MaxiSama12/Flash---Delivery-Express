import axios from 'axios';


export const axiosInstance = axios.create({

    baseURL: `https://flash-delivery-express-back.onrender.com`,

    headers: {
    "ngrok-skip-browser-warning": "true", 
  }
})