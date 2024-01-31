import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import "../Styles/myBooking.css"

function MyBooking(){
    const nav=useNavigate()
    const user=useSelector(store=>store.auth.user)
    const handleTicket=()=>{
        nav('/viewticket')
    }
    return(
        <>

        <h2>My Bookings</h2>
        <h3 className="text-white">Username:{user.username}</h3>
        <table className="table " border={1}>
            <thead className="thead-dark">
                <th>Booking Id</th>
                <th>Movie</th>
                <th>Action</th>
            </thead>
            <tbody>
                <tr className="table-info">
                    <td>12345</td>
                    <td>Dune</td>
                    <td>
                        <button className="btn btn-secondary mybooking" onClick={()=>handleTicket()}>View Ticket</button>
                    </td>
                </tr>
            </tbody>
        </table>
        </>
        
    )
        
}

export default MyBooking