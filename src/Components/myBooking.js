import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import "../Styles/myBooking.css"
import axios from "axios";
import React,{ useEffect, useState } from "react";

function MyBooking(){
    const [booking,setBooking]=useState([])
    const nav=useNavigate()
    const user=useSelector(store=>store.auth.user)
    function getBooking(){
        axios.get(`http://127.0.0.1:8000/userbooking/${user.id}`).then(response=>{
            setBooking(response.data)
            console.log(`ticket data is ${response.data}`)
        }).catch((error)=>console.log(error))
    }
        useEffect(()=>{
            getBooking()
        },[])
    const handleTicket=(bookid)=>{
        nav(`/viewticket/${bookid}`)
    }
    return(
        <>

        <h2>My Bookings</h2>
        <h3 className="text-white">Username:{user.username}</h3>
        <table className="table " border={1}>
            <thead className="thead-dark">
                <th>Booking Id</th>
                <th>Movie</th>
                <th>Amount</th>
                <th>Action</th>
            </thead>
            <tbody>
                {booking.map(book=>(
                    <tr className="table-info" key={book.booking_id}>
                    <td>{book.booking_id}</td>
                    <td>{book.movie.movie_title}</td>
                    <td>&#8377;{book.amount}</td>
                    <td>
                        <button className="btn btn-secondary mybooking" onClick={()=>handleTicket(book.booking_id)}>View Ticket</button>
                    </td>
                </tr>
                ))}
                
            </tbody>
        </table>
        </>
        
    )
        
}

export default MyBooking