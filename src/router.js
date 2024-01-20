import { createBrowserRouter } from "react-router-dom";
import Login from "./Auth/Login";
import App from "./App";
import Register from "./Auth/Register";



const router=createBrowserRouter([
    {path:'',element:<App/>},
    {path:'login',element:<Login/>},
    {path:'register',element:<Register/>}
])
export default router