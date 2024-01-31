import poster from "../Images/logo3.png"
import "../Styles/viewTicket_css.css"
import React, { useEffect, useState } from "react"
import QRCode from "qrcode.react"

function ViewTicket(){
    const [qrCode, setQRCode] = useState("");
    useEffect(() => {
        const generateQRCodeData = () => {
                const showDetails = {
                    movieTitle: "Archer",
                    date: "2024-02-01",
                    time: "18:00",
                bookingID: "ABC123",
                seatNumber: "A1",
                totalAmount: "$20.00",
            };
            const data = `${showDetails.movieTitle}\n${showDetails.date} | ${showDetails.time}\nBooking ID: ${showDetails.bookingID}\nSeat Number: ${showDetails.seatNumber}\nTotal Amount: ${showDetails.totalAmount}`;
            setQRCode(data);
        };
    generateQRCodeData();
    }, []);

return(
        <>
        <div class="viewticket-body">
            <div className="card ticketCard">
                <div className="card-details">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411" alt="Movie Poster" />
                    <h2 className="pageMtitle">Archer</h2>
                    <p> date | time </p>
                    <p>Booking ID:</p>
                    <hr />
                    <h5>Enma Pictures</h5>
                    <QRCode value={qrCode}  className="qrcode"/>
                    <h6>Seat Number</h6>
                    <span className="seat-ticket">dsfe</span>
                    <p>Total Amount: $20.00</p>
                </div>
                <button className="btn btn-outline-warning btn-download">Download Ticket</button>
            </div>
        </div>
        </>
    )
}
export default ViewTicket