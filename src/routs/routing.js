import { Navigate } from "react-router-dom";
import GetExpense from "../pages/GetExpense/GetExpense.jsx";
import  Login  from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx"
import SendExpense from "../pages/SendExpense/SendExpense.jsx";

export const publicRoutes = [
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "*", element: <Navigate to="/login" replace />}
]

export const userRoutes = [
    {path: "/getExpense", element: <GetExpense />},
    {path: "/sendExpense", element: <SendExpense />},
    {path: "*", element: <Navigate to="/sendExpense" replace />}
]