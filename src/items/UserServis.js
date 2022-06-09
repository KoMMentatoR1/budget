import axios from "../http";

export default class UserServis{
    static async login(login, password){
        const respons = await axios.post("", {
            login: login,
            password: password
        })
        return respons.data
    }

    static async register(name, lastname, login, password){
        const respons = await axios.post("/register", {
            name: name,
            lastname: lastname,
            login: login,
            password: password,
            
        })
        return respons.data
    }
}