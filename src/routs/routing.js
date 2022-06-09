import { Navigate } from "react-router-dom";
import  Login  from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx"

export const publicRoutes = [
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "*", element: <Navigate to="/login" replace />}
]