import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import useInput from "../../items/hooks/useInput";
import s from "./Login.module.css"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import useFetching from "../../items/hooks/useFetchng";
import UserServis from "../../items/UserServis";
import Loader from "../../components/Loader";

const Login = () => {
    const login = useInput("", {isEmpty: true})
    const password = useInput("", {isEmpty: true})
    const [passVisible, setPassVisible] = useState("")

    const [loginFetch, isLoading, error] = useFetching(async () => {
        const data = await UserServis.login(login, password)
        console.log(data);
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
                        <Link to="/register">Зарегистрироваться</Link>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default Login;