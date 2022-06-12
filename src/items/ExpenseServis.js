import axios from "../http";

export default class ExpenseServis{
    static async send(userId, expenseType, direction, cost){
        const respons = await axios.post("/", {
            userId: userId,
            expenseType: expenseType,
            direction: direction,
            cost: cost
        })
        return respons.data
    }

    static async get(userId, date, direction){
        const respons = await axios.post("/", {
            userId: userId,
            date: date,
            direction: direction
        })
        return respons.data
    }
}