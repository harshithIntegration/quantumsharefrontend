import axios from "axios";

let axiosInstance = axios.create({
    // baseURL: "https://facebook.quantumparadigm.in:7532",
    baseURL: "http://localhost:7532",
})

export default axiosInstance;