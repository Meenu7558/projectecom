import axios from "axios";
console.log("Base URL:", import.meta.env.VITE_BASE_URL); // Debugging line

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
    withCredentials: true,
});