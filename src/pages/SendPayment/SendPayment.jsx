import { Alert, Button, TextField } from "@mui/material";
import Header from "../../components/Header/Header";
import s from "./SendPayment.module.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext, useState } from "react";
import FormControl from '@mui/material/FormControl';
import useInput from "../../items/hooks/useInput";
import useFetching from "../../items/hooks/useFetching";
import PaymentServise from "../../items/PaymentServise";
import { AuthContext } from "../../items/context";
import Loader from "../../components/Loader";

const SendPayment = () => {
    const {isAuth} = useContext(AuthContext)
    const [type, setType] = useState("")
    const [status, setStatus] = useState("")
    const sum = useInput("", {isNumber: true, isEmpty: true})

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const [sendFetch, isLoading, error] = useFetching(async () => {
        await PaymentServise.send(isAuth.id, type, status, sum.value)
    })
    
    const expenditure = [
        {value: "Супермаркет", text: "Супермаркет"},
        {value: "Рестораны и кафе", text: "Ресторан"},
        {value: "Здоровье и красота", text: "Здоровье и красота"},
        {value: "Онлайн-маркеты", text: "Онлайн-маркеты"},
        {value: "Траспорт", text: "Траспорт"},
        {value: "Развлечение и хобби", text: "Развлечение и хобби"},
        {value: "ЖКХ, связь, интернет", text: "ЖКХ, связь, интернет"},
        {value: "Налоги, штрафы, взыскания", text: "Налоги, штрафы, взыскания"},
        {value: "Подписки", text: "Подписки"},
        {value: "Переводы", text: "Переводы"},
        {value: "Другое", text: "Другое"},
    ]

    const income= [
        {value: "Зарплата", text: "Зарплата"},
        {value: "Прочие поступления", text: "Прочие поступления"},
        {value: "Переводы от других людей", text: "Переводы от других людей"},
        {value: "Внесение наличных", text: "Внесение наличных"},
    ]

    const submitForm = (e) =>{
        e.preventDefault();
        sendFetch()
    }
    return (
        <div>
            {isLoading ? <Loader /> : ""}    
            <Header>
                <div className={s.container}>
                    <div className={s.formContainer}>
                        <FormControl fullWidth>
                            <InputLabel id="direction">Доход / Расход</InputLabel>
                                <Select
                                    labelId="direction"
                                    id="direction-select"
                                    value={status}
                                    label="Доход / Расход"
                                    onChange={handleChangeStatus}
                                >
                                    <MenuItem value={'income'}>Доход</MenuItem>
                                    <MenuItem value={'expenditure'}>Расход</MenuItem>
                            </Select>
                        </FormControl>  
                        <div className={s.sendDashboard} style={{display: `${status ? "flex" : "none"}`}}>
                                <div className={s.formTitle}>Добавить {status === "income" ? "доход" : "расход"}</div>
                                <form className={s.sendForm} onSubmit={(e) => submitForm(e)}>
                                    <div className={s.formInput}><TextField value={sum.value}  onChange={sum.onChange} onBlur={sum.onBlur} error={!sum.isValid && sum.isDirty} helperText={ !sum.isValid && sum.isDirty ? "Сумма введена не верно" : '' } sx={{width: "100%"}} label={`Введите сумму ${status === "income" ? "дохода" : "покупки"}`} variant="outlined" /></div>
                                    <div className={s.formInput}>
                                        <FormControl fullWidth>
                                            <InputLabel id="buy-label">Тип {` ${status === "income" ? "дохода" : "покупки"}`}</InputLabel>
                                            <Select
                                            labelId="buy-label"
                                            id="buy-select"
                                            value={type}
                                            label={` ${status === "income" ? "Категория дохода" : "Категория покупки"}`}
                                            onChange={handleChange}
                                            >
                                                {status === "income" ? (
                                                    income.map((el, index) => (
                                                        <MenuItem value={el.value} key={index}>{el.text}</MenuItem>
                                                    ))
                                                ):
                                                (
                                                    expenditure.map((el, index) => (
                                                        <MenuItem value={el.value} key={index}>{el.text}</MenuItem>
                                                    ))
                                                )}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <Button sx={{width: "80%", margin: "auto", marginBottom: "10px" }} variant="contained" type="submit"> Отправить</Button>
                                </form>
                        </div>
                    </div>
                </div>
                {error ? <Alert severity="error">{error}</Alert> : ""}  
            </Header>
        </div> 
    );
}
 
export default SendPayment;