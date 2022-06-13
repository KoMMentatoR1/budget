import axios from "../http";

export default class PaymentServise{
    static async send(userId, direction, status, sum){
        const response = await axios.post("/addingPayment", {
            sum: sum,
            status: status,
            direction: direction,
            client_id: userId
        })
        return response.data
    }

    static async get(userId, date, status){
        const response = await axios.post("/", {
            userId: userId,
            date: date,
            status: status
        })
        return response.data
    }
}