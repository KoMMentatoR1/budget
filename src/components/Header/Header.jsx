import s from "./Header.module.css"
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../items/context";

const Header = (props) => {
    const { setIsAuth } = useContext(AuthContext)
    return (
        <div className= {s.container}>
            <header>
                <NavLink className={s.linkMenu} to="/getExpense">
                    <Button variant="outlined" sx={{marginRight:"20px", color: "white", borderColor:"white"}}>Все расходы / доходы</Button>
                </NavLink>
                <NavLink className={s.linkMenu} to="/sendExpense">
                    <Button variant="outlined" sx={{marginRight:"20px", color: "white", borderColor:"white"}}>Добавить расход / доход</Button>
                </NavLink>
                <Button variant="outlined" onClick={(e) => {localStorage.removeItem("auth"); setIsAuth({})}} sx={{marginRight:"20px", color: "white", borderColor:"white"}}>Выход</Button>
            </header>
            <div className={s.deshboard}>
                {props.children}
            </div>
        </div>
    );
}
 
export default Header;