import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes, userRoutes } from "./routing";
import { AuthContext } from "../items/context";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext) 
    if (!isAuth.auth){
        return (
            <Routes>
                {publicRoutes.map((route, index) => (
                    <Route path={route.path} element={route.element} key={index} />
                ))}
            </Routes>
        )
    }
    else{
        return (
            <Routes>
                {userRoutes.map((route, index) => (
                    <Route path={route.path} element={route.element} key={index} />
                ))}
            </Routes>
        )
    }
}
 
export default AppRouter;