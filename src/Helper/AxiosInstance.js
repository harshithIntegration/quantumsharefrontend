import axios from "axios";

let axiosInstance = axios.create({
    // baseURL: "https://hosting.quantumparadigm.in:8006/", // own server
    // baseURL: "https://facebook.quantumparadigm.in:8006", // appreview
    // baseURL: "https://facebook.quantumparadigm.in:7532", // quantumshare
    baseURL: "http://localhost:7532",
})

export default axiosInstance;