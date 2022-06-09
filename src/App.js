import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './routs/AppRouter';
import {AuthContext} from './items/context.js';
import { useEffect, useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState({
    auth: false,
    name: "",
    lastname: "",
    login:""
  })

  useEffect(() => {
    if (localStorage.getItem("auth")){
      setIsAuth(JSON.parse(localStorage.getItem("auth")))
    }
    else{
      setIsAuth({
        auth: false,
        name: "",
        lastname: "",
        login:""
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth}}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
