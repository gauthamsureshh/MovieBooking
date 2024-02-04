import "../Styles/viewTicket_css.css"
import React, { useEffect, useRef, useState } from "react"
import QRCode from "qrcode.react"
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


function ViewTicket(){
    const { bookid } = useParams();
    const [qrCode, setQRCode] = useState("");
    const [ticketData,setTicketData]=useState([])
    const pdfRef=useRef()
    function getBooking(){
        axios.get(`http://127.0.0.1:8000/bookedticket/${bookid}`).then(response=>{
            setTicketData(response.data)
        }).catch((error)=>console.log(error))
    }
        useEffect(()=>{
            getBooking()
        },[bookid])

        useEffect(() => {
            const generateQRCodeData = () => {
                if (ticketData.length > 0) {
                    const { movie, date, time, booking_id, seat_number, amount } = ticketData[0]
                    const showDetails = {
                        movieTitle: movie?.movie_title || "Unknown Movie",
                        date,
                        time,
                        bookingID: booking_id,
                        seatNumber: seat_number.join(', '),
                        totalAmount: amount
                    };
        
                    const data = `${showDetails.movieTitle}\n${showDetails.date} | ${showDetails.time}\nBooking ID: ${showDetails.bookingID}\nSeat Number: ${showDetails.seatNumber}\nTotal Amount: ₹${showDetails.totalAmount}`
                    setQRCode(data);
                    }
                }
            generateQRCodeData()
        },[ticketData])
        const downloadPdf=()=>{
            const input=pdfRef.current
            html2canvas(input).then((canvas)=>{
                const imgData=canvas.toDataURL('image/png')
                const pdf=new jsPDF('p','mm','a4',true)
                const pdfwidth=pdf.internal.pageSize.getWidth()
                const pdfheight=pdf.internal.pageSize.getHeight()
                const imgwidth=canvas.width
                const imgheight=canvas.height
                const ratio=Math.min(pdfwidth/imgwidth,pdfheight/imgheight)
                const imgX=(pdfwidth-imgwidth*ratio)/2
                const imgY=30;
                pdf.addImage(imgData,'PNG',imgX,imgY,imgwidth*ratio,imgheight*ratio)
                pdf.save('Ticket.pdf')
            })
        }

return(
        <>
        <div className="viewticket-body">
            <div className="card ticketCard" ref={pdfRef}>
                <div className="card-details" id="ticket-container">
                {ticketData.map((ticket) => (
                    <div key={ticket.booking_id}>
                    <img src={ticket.movie.poster_url} height={120} width={150} alt="Movie Poster" />
                    <h2 className="pageMtitle">{ticket.movie.movie_title}</h2>
                    <p>{ticket.date} | {ticket.time}</p>
                    <p>Booking ID: {ticket.booking_id}</p>
                    <hr />
                    <h5>Enma Pictures</h5>
                    <QRCode value={qrCode} className="qrcode" />
                    <h6>Seat Number</h6>
                    <span className="seat-ticket">{ticket.seat_number.join(', ')}</span>
                    <p>Total Amount: &#8377;{ticket.amount}</p>
                    </div>
                ))}
                </div>
            </div>
            <div className="center-buttons">
                <button className="btn btn-outline-warning btn-download" onClick={downloadPdf} >Download Ticket</button>
                </div>
                <Link to={"/"} className="fa fa-home btn-gohome">Go Home</Link>
        </div>
        </>
    )
}
export default ViewTicket