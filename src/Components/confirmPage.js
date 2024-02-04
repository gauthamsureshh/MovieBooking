import poster from "../Images/logo3.png";
import React,{useState} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import "../Styles/confirmPage.css";
import axios from "axios";
import emailjs from '@emailjs/browser'

function ConfirmPage({ selectedSeats, selectedDate, selectedTime, selectedmovieName, selectedUrl,selectedmovieId }) {
    const total_amount=selectedSeats.length * 140.0
    const showdate= new Date(selectedDate)
    const options = {day: '2-digit', month: 'short'};
    const formatted_date=showdate.toLocaleDateString('en-US',options)
    const user=useSelector(store=>store.auth.user)
    console.log(`userid:${user.email}`)
    const nav=useNavigate()

    const handlePayment=()=>{

        const serviceId='service_09kch9a'
        const templateId='template_m7cltab'
        const publicKey='O6G0F7zdY5gc3Ol3v'

        const templateParams={
            from_name:'Enma Pictures',
            to_name:user.username,
            movie_name:selectedmovieName,
            time:selectedTime,
            date:formatted_date,
            seats:selectedSeats,
            amount:total_amount,
            image_src:selectedUrl,
            to_email:user.email
        }

        var options={
            key:"rzp_test_Bcr0Qprfh2CONg",
            key_secret:"o2JNHPNlQfFnEpPdGIAulOVM",
            amount:total_amount*100,
            currency:"INR",
            name:"Enma Pictures",
            description:"Movie Booking",
            handler:function(response){
                axios.post('http://127.0.0.1:8000/createticket',{
                    date:formatted_date,
                    time:selectedTime,
                    seat_number:selectedSeats,
                    payment_id:response.razorpay_payment_id,
                    user:user.id,
                    movie:selectedmovieId,
                    amount:total_amount
                }).then(createTicketResponse=>{
                    alert("Ticket Booked")
                    emailjs.send(serviceId,templateId,templateParams,publicKey).catch((error)=>{
                        console.log(error)
                    })
                    const bookedTicketId = createTicketResponse.data.booking_id
                    console.log(`Booked ticket id is ${bookedTicketId}`)
                    nav(`/viewticket/${bookedTicketId}`)
                }).catch((error)=>console.log(error))
            },
            prefill:{
                name:user.username,
                email:user.email
            },
            notes:{
                address:"Razorpay Corporate Office"
            },
            theme:{
                color:"#1c1b1be3"
            }
        }
        var pay=new window.Razorpay(options)
        pay.open()

    }
    return(
    <div className="confirmpageBody">
        <div className="card">
            <div className="card-details">
                <img
                    src={selectedUrl}
                    alt="Movie Poster"
                    height={120}
                    width={150}
                />
                <h2 className="pageMtitle">{selectedmovieName}</h2>
                <p>{selectedTime} | {formatted_date}</p>
                <p>{selectedSeats.length} Tickets</p>
                <hr />
                <h5>Enma Pictures</h5>
                <img src={poster} alt="Enma Pictures Logo" />
                <h6>Seat Number </h6>
                <span className="text-black">{selectedSeats.join(', ')}</span>
                <p>Total Amount:&#8377;{total_amount}</p>
                <button className="btn confirm" onClick={handlePayment}>Make Payment</button>
                <Link to={'/'} className="btn btn-warning">Cancel</Link>
            </div>
        </div>
    </div>
    );
}

const mapStateToProps = (state) => ({
selectedSeats: state.ticket.selectedSeats,
selectedDate: state.ticket.selectedDate,
selectedTime: state.ticket.selectedTime,
selectedmovieName: state.ticket.selectedmovieName,
selectedUrl:state.ticket.selectedUrl,
selectedmovieId:state.ticket.selectedmovieId
});

export default connect(mapStateToProps)(ConfirmPage);
