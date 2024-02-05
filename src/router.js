import { createBrowserRouter } from "react-router-dom";
import Login from "./Auth/Login";
import App from "./App";
import Register from "./Auth/Register";
import AboutUs from "./Components/aboutus";
import ContactUs from "./Components/contactus";
import BookingCard from "./Components/BookingPage";
import Admin from "./admin/admin";
import AddMovie from "./admin/addmovie";
import ListMovies from "./admin/listmovie";
import EditMovie from "./admin/editmovie";
import AdminLogin from "./admin/adminlogin";
import ConfirmPage from "./Components/confirmPage";
import ViewTicket from "./Components/viewTicket";
import MyBooking from "./Components/myBooking";
import SearchResults from "./Components/demo";
import UpcomingPoster from "./admin/upcomingPoster";



const router=createBrowserRouter([
    {path:'',element:<App/>},
    {path:'login',element:<Login/>},
    {path:'register',element:<Register/>},
    {path:'aboutus',element:<AboutUs/>},
    {path:'contactus',element:<ContactUs/>},
    {path:'bookingpage/:movieid',element:<BookingCard/>},
    {path:'admin',element:<Admin/>},
    {path:'addmovie',element:<AddMovie/>},
    {path:'listmovie',element:<ListMovies/>},
    {path:'editmovie/:movieid',element:<EditMovie/>},
    {path:'adminlogin',element:<AdminLogin/>},
    {path:'confirmpage',element:<ConfirmPage/>},
    {path:'viewticket/:bookid',element:<ViewTicket/>},
    {path:'mybooking',element:<MyBooking/>},
    {path:'searchhresult/:searchTerm',element:<SearchResults/>},
    {path:'upcomingposter',element:<UpcomingPoster/>}

])
export default router