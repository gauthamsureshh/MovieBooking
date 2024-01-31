import poster from "../Images/logo3.png";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../Styles/confirmPage.css";

function ConfirmPage({ selectedSeats, selectedDate, selectedTime, movieId }) {
    return(
    <div className="confirmpageBody">
        <div className="card">
            <div className="card-details">
                <img
                    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411"
                    alt="Movie Poster"
                />
                <h2 className="pageMtitle">Archer</h2>
                <p>{selectedTime} | {selectedDate}</p>
                <p>{selectedSeats.length} Tickets</p>
                <hr />
                <h5>Enma Pictures</h5>
                <img src={poster} alt="Enma Pictures Logo" />
                <h6>Seat Number </h6>
                <span className="text-black">{selectedSeats.join(', ')}</span>
                <p>Total Amount: ${selectedSeats.length * 20.0}</p>
                <button className="btn confirm">Confirm Ticket</button>
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
movieId: state.ticket.movieId,
});

export default connect(mapStateToProps)(ConfirmPage);
