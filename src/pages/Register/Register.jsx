import { Alert, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState, useContext } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useInput from "../../items/hooks/useInput";
import s from "./Register.module.css"
import useFetching from "../../items/hooks/useFetching";
import UserServise from "../../items/UserServise";
import Loader from "../../components/Loader";
import { AuthContext } from "../../items/context";
import { NavLink } from "react-router-dom";

const Register = () => {
    const { setIsAuth } = useContext(AuthContext)
    const name = useInput("", {isEmpty: true})
    const lastname = useInput("", {isEmpty: true})
    const email = useInput("", {isEmpty: true, isEmail: true})
    const password = useInput("", {isEmpty: true, minLength: 8})
    const repeatPassword = useInput("", {isEmpty: true, minLength: 8})

    const [registerFetch, isLoading, error] = useFetching(async () => {
        const data = await UserServise.register(name.value, lastname.value, email.value, password.value)
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

    const [passVisible, setPassVisible] = useState("")

    const handleClickShowPassword = () => {
        setPassVisible(!passVisible);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const submitForm = (e) => {
        e.preventDefault();
        registerFetch()
    }

    const comparePassword = () => {
        if (!password.isDirty) return true
        if (!repeatPassword.isDirty) return true
        if (password.value === repeatPassword.value) return true
        else return false
    }
    
    const setText = (pass) => {
        if (pass) {
            if (password.isEmpty && password.isDirty) return 'Поле не может быть пустым'
            else if (password.minLength && password.isDirty) return "Пароль должен содержать не менее 8 символов"
            else if (password.isDirty && repeatPassword.isDirty && !comparePassword()) {
                console.log(1);
                return "Пароли не совпадают" 
            } 
            else return ''
        }
        else {
            if (repeatPassword.isEmpty && repeatPassword.isDirty) return 'Поле не может быть пустым'
            else if (repeatPassword.minLength && repeatPassword.isDirty) return "Пароль должен содержать не менее 8 символов"
            else if (password.isDirty && repeatPassword.isDirty && !comparePassword()) {
                console.log(1);
                return "Пароли не совпадают" 
            } 
            else return ''
        }
    }

    const setTextEmail = () => {
        if (email.isEmpty && email.isDirty) return 'Поле не может быть пустым'
        else if (email.isEmail && email.isDirty) return "Неверный адрес почты"
        else return ''
    }

    return (
    <div className={s.container}>
        {isLoading ? <Loader /> : ""}     
        <div className={s.loginWindow}>
            <div className={s.formTitle}>Регистрация</div>
            <form className={s.formContainer} onSubmit={e => submitForm(e)}>
                <div className={s.input}>
                    <div className={s.form}>
                        <TextField error={name.isDirty && !name.isValid} helperText={name.isEmpty && name.isDirty ? 'Поле не может быть пустым' : ""} label="Имя" value={name.value} onChange={name.onChange} onBlur={name.onBlur} variant="outlined" sx={{width: "100%"}} required/>
                    </div>
                    <div className={s.form}>
                        <TextField error={lastname.isDirty && !lastname.isValid} helperText={lastname.isEmpty && lastname.isDirty ? 'Поле не может быть пустым' : ""} label="Фамилия" value={lastname.value} onChange={lastname.onChange} onBlur={lastname.onBlur} variant="outlined" sx={{width: "100%"}} required/>
                    </div>
                    <div className={s.form}>
                        <TextField error={email.isDirty && !email.isValid} helperText={setTextEmail()} label="Почта" value={email.value} onChange={email.onChange} onBlur={email.onBlur} variant="outlined" sx={{width: "100%"}} required/>
                    </div>
                    <div className={s.form}>
                        <TextField
                            error={password.isDirty && !password.isValid || !comparePassword()}
                            type={passVisible ? 'text' : 'password'} 
                            helperText={setText(1)} 
                            label="Пароль" value={password.value} onChange={password.onChange} onBlur={password.onBlur} 
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
                            required/>
                    </div>
                    <div className={s.form}>
                        <TextField 
                            error={repeatPassword.isDirty && !repeatPassword.isValid || !comparePassword()}
                            type={passVisible ? 'text' : 'password'} 
                            helperText={setText(0)} 
                            label="Повторите пароль" 
                            value={repeatPassword.value} 
                            onChange={repeatPassword.onChange} 
                            onBlur={repeatPassword.onBlur} 
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
                            required/>
                    </div>
                </div>
                <div className={s.formBotton}>
                    <Button disabled={!name.isValid || !lastname.isValid|| !email.isValid || !password.isValid || !repeatPassword.isValid || password.value != repeatPassword.value }  type="submit" variant="contained" sx={{width: "100%"}}>Зарегистрироваться</Button>
                </div>
                <div className={s.toRegister}>
                    <NavLink to="/login">Назад</NavLink>
                </div>
            </form>
        </div>
        {error ? <Alert severity="error">{error}</Alert> : ""}
    </div>
     );
}
 
export default Register;