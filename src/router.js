import { createBrowserRouter } from "react-router-dom";
import Login from "./Auth/Login";
import App from "./App";
import Register from "./Auth/Register";
import AboutUs from "./Components/aboutus";
import ContactUs from "./Components/contactus";
import Ticket from "./Components/Ticket";



const router=createBrowserRouter([
    {path:'',element:<App/>},
    {path:'login',element:<Login/>},
    {path:'register',element:<Register/>},
    {path:'aboutus',element:<AboutUs/>},
    {path:'contactus',element:<ContactUs/>},
    {path:'confirmticket',element:<Ticket/>}
])
export default router