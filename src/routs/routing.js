import { Navigate } from "react-router-dom";
import GetPayment from "../pages/GetPayment/GetPayment.jsx";
import  Login  from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx"
import SendPayment from "../pages/SendPayment/SendPayment.jsx";

export const publicRoutes = [
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "*", element: <Navigate to="/login" replace />}
]

export const userRoutes = [
    {path: "/getPayment", element: <GetPayment />},
    {path: "/sendPayment", element: <SendPayment />},
    {path: "*", element: <Navigate to="/sendPayment" replace />}
]