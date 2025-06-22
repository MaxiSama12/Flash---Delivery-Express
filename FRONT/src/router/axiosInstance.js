import axios from "axios";

const puerto = 3030;

export const axiosInstance = axios.create({
    baseURL: `http://localhost:${puerto}/`,
})