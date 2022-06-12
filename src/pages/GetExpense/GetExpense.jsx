import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../items/context";
import ExpenseServis from "../../items/ExpenseServis";
import useFetching from "../../items/hooks/useFetching";
import s from "./GetExpense.module.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chart from 'chart.js/auto';
import BarChart from "../../components/BarChart/BarChart.jsx";
import { Divider } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const GetExpense = () => {
    const {isAuth} = useContext(AuthContext)
    const [expensesOne, setExpensesOne] = useState({})
    const [direction, setDirection] = useState("expense")
    
    const [year, setYear] = useState(new Date().getFullYear())

    const [value, setValue] = useState(0);

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        direction === "expense" ? setDirection("income") : setDirection("expense")
    };

    const variableYear = [2022]

    for (let i = 2023; i <= new Date().getFullYear(); i++){
        variableYear.push(i)
    }

    const data={
        labels: ['Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь' , 'Октябрь' , 'Ноябрь'],
        datasets: [
        {
            id: 1,
            label: direction === "expense" ? "Расходы" : "Доходы",
            data: [5, 6, 7],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgb(54, 162, 235)'],
            borderWidth: 1
        }
        ],
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{width:"100%"}}
            {...other}
          >
            {value === index && (
                <div className={s.tabsContainer}>
                    {children}
                </div>
            )}
          </div>
        );
    }

    const [expenseFetchOne, isLoadingExpenseOne, errorExpenseOne] = useFetching(async () => {
        const expenses = await ExpenseServis.get(isAuth.id, year, direction)
        setExpensesOne(expenses)   
    })

    useEffect(() => {
        expenseFetchOne()
        console.log(1);
    }, [direction, year])

    return (
        <div>
            <Header>
                <Tabs value={value} variant="fullWidth"  onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Расходы" />
                    <Tab label="Доходы" />
                </Tabs>
                <Divider />
                <FormControl sx={{width: "80%", display:"flex", margin: "auto", marginTop: "20px",}}>
                    <InputLabel id="buy-label">Год</InputLabel>
                    <Select
                        labelId="buy-label"
                        id="buy-select"
                        value={year}
                        label="Год"
                        onChange={handleChangeYear}
                    >
                        {variableYear.map((el, index) => (
                            <MenuItem value={el} key={index}>{el}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className={s.container} > 
                <TabPanel value={value} index={0}>
                    <div className={s.titleMainGraf}>Все расходы</div>
                    <BarChart data={data}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className={s.titleMainGraf}>Все доходы</div>
                    <BarChart data={data}/>
                </TabPanel>
                </div>
            </Header>
        </div>
    );
}
 
export default GetExpense;