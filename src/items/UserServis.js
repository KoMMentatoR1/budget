import axios from "../http";

export default class UserServis{
    static async login(login, password){
        const respons = await axios.post("/authorization", {
            login: login,
            password: password
        })
        return respons.data
    }

    static async register(name, lastname, login, password){
        const respons = await axios.post("/registration", {
            firstname: name,
            lastname: lastname,
            login: login,
            password: password,   
        })
        return respons.data
    }    
}