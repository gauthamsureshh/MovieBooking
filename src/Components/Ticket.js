import "../Styles/Ticket.css"
import poster from "../Images/logo3.png"

function Ticket(){
    return(
        <div className="confirmBody">
            <div className="card">
                <div className="card-details">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411" alt="Movie Poster" />
                    <h2 className="pageMtitle">Archer</h2>
                    <p>Date | Time</p>
                    <p>Booking ID:</p>
                    <hr />
                    <h5>Enma Pictures</h5>
                    <img src={poster} alt="Enma Pictures Logo" />
                    <h6>Seat Number</h6>
                    <p>Total Amount: $20.00</p>
                    <button className="btn confirm">Confirm Ticket</button>
                </div>
            </div>
        </div>
    )
}
export default Ticket