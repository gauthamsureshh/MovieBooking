import { createBrowserRouter } from "react-router-dom";
import Login from "./Auth/Login";
import App from "./App";
import Register from "./Auth/Register";
import AboutUs from "./Components/aboutus";
import ContactUs from "./Components/contactus";
import Ticket from "./Components/Ticket";
import BookingCard from "./Components/BookingPage";
import Admin from "./admin/admin";
import AddMovie from "./admin/addmovie";
import ListMovies from "./admin/listmovie";
import EditMovie from "./admin/editmovie";
import AdminLogin from "./admin/adminlogin";



const router=createBrowserRouter([
    {path:'',element:<App/>},
    {path:'login',element:<Login/>},
    {path:'register',element:<Register/>},
    {path:'aboutus',element:<AboutUs/>},
    {path:'contactus',element:<ContactUs/>},
    {path:'bookingpage/:movieid',element:<BookingCard/>},
    {path:'confirmticket',element:<Ticket/>},
    {path:'admin',element:<Admin/>},
    {path:'addmovie',element:<AddMovie/>},
    {path:'listmovie',element:<ListMovies/>},
    {path:'editmovie/:movieid',element:<EditMovie/>},
    {path:'adminlogin',element:<AdminLogin/>}
])
export default router