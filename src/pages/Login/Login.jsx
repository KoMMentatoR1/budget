import { Alert, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import useInput from "../../items/hooks/useInput";
import s from "./Login.module.css"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useContext, useState } from "react";
import useFetching from "../../items/hooks/useFetching";
import UserServise from "../../items/UserServise";
import Loader from "../../components/Loader";
import { AuthContext } from "../../items/context";
import { NavLink } from "react-router-dom";

const Login = () => {
    const { setIsAuth } = useContext(AuthContext)
    const login = useInput("", {isEmpty: true})
    const password = useInput("", {isEmpty: true})
    const [passVisible, setPassVisible] = useState("")

    const [loginFetch, isLoading, error] = useFetching(async () => {
        const data = await UserServise.login(login.value, password.value)
            setIsAuth({
                auth: true,
                id: data.id,
                name: data.firstname,
                lastname: data.lastname,
                login: data.login
            })
            localStorage.setItem("auth", JSON.stringify({
                auth: true,
                id: data.id,
                name: data.firstname,
                lastname: data.lastname,
                login: data.login
            }))
    })

    const handleClickShowPassword = () => {
        setPassVisible(!passVisible);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const submitForm = (e) => {
        e.preventDefault();
        loginFetch()
        
        
    }  

    return ( 
        <div className={s.container}>
            {isLoading ? <Loader /> : ""} 
            <div className={s.loginWindow}>
                <div className={s.formTitle}>Вход</div>
                <form onSubmit={(e) => submitForm(e)} className={s.formContainer}>
                    <div className={s.input}>
                        <div className={s.form}>
                            <TextField error={login.isDirty && !login.isValid} helperText={login.isEmpty && login.isDirty ? 'Поле не может быть пустым' : ""} label="Логин" value={login.value} onChange={login.onChange} onBlur={login.onBlur} variant="outlined" sx={{width: "100%"}} required/>
                        </div>
                        <div className={s.form}>
                            <TextField
                                error={password.isDirty && !password.isValid}
                                helperText={password.isEmpty && password.isDirty ? 'Поле не может быть пустым' : ""}
                                type={passVisible ? 'text' : 'password'}
                                value={password.value}
                                onChange={password.onChange} 
                                onBlur={password.onBlur} 
                                variant="outlined" 
                                sx={{width: "100%"}}
                                InputProps = {{
                                    endAdornment:
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                          >
                                            {passVisible ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>
                                }}
                                required
                                label="Пароль" />
                        </div>
                    </div>
                    <div className={s.formBotton}>
                        <Button disabled={!login.isValid || !password.isValid} type="submit" variant="contained" sx={{width: "100%"}}>Войти</Button>
                    </div>
                    <div className={s.toRegister}>
                        <NavLink to="/register">Зарегистрироваться</NavLink>
                    </div>
                </form>
            </div>
            {error ? <Alert severity="error">{error}</Alert> : ""}
        </div>
     );
}
 
export default Login;