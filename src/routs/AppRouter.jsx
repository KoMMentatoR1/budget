import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routing";

const AppRouter = () => {

    return ( 
        <Routes>
            {publicRoutes.map((route, index) => (
                <Route path={route.path} element={route.element} key={index} />
            ))}
        </Routes>
    );
}
 
export default AppRouter;