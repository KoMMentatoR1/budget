import axios from "../http";

export default class UserServise{
    static async login(login, password){
        const response = await axios.post("/authorization", {
            login: login,
            password: password
        })
        return response.data
    }

    static async register(name, lastname, login, password){
        const response = await axios.post("/registration", {
            firstname: name,
            lastname: lastname,
            login: login,
            password: password,   
        })
        return response.data
    }    
}