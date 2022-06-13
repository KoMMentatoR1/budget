import axios from "../http";

export default class PaymentServis{
    static async send(userId, direction, status, cost){
        const respons = await axios.post("/addingPayment", {
            sum: cost,
            status: status,
            direction: direction,
            client_id: userId
        })
        return respons.data
    }

    static async get(userId, date, status){
        const respons = await axios.post("/", {
            userId: userId,
            date: date,
            status: status
        })
        return respons.data
    }
}