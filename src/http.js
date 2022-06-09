import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/client"
const $api = axios.create({
    withCredentials:false,
    baseURL: API_URL,
})
export default $api;