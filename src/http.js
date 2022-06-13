import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/client"
const $api = axios.create({
    baseURL: API_URL,
    withCredentials: false,
    headers: { 
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
})
export default $api;