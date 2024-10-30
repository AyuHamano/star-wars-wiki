import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://swapi.dev/api/',
    timeout: 5000
})

export default axiosInstance