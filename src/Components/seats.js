
import React, { useEffect, useState } from "react";

import '../Styles/seats_css.css';


function MovieSeatBooking(props){


  
  const [selectedSeats,setSelectedSeats]=useState([])


const sendSeatsBack=()=>{
  props.OnSeatChange(selectedSeats)

}

const handleSeatClick = (index) => {
  const newSelectedSeats = [...selectedSeats];
  if (newSelectedSeats.includes(index)) {
    newSelectedSeats.splice(newSelectedSeats.indexOf(index), 1);
  } else {
    newSelectedSeats.push(index);
  }
  setSelectedSeats(newSelectedSeats);
};

useEffect(() => {
  sendSeatsBack();
}, [selectedSeats]);
const renderSeats = () => {
  const rows = 3; 
  const seatsPerRow = 8;

  const seatComponents = [];

  for (let row = 1; row <= rows; row++) {
    const rowSeats = [];
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const seatNumber = String.fromCharCode(64 + row) + seat; // Convert row to letter (A, B, C...)
      const isOccupied = seatNumber % 7 === 0;

      rowSeats.push(
        <div
          key={seatNumber}
          className={`seat ${selectedSeats.includes(seatNumber) ? 'selected' : ''} ${
            isOccupied ? 'occupied' : ''
          }`}
          onClick={() => !isOccupied && handleSeatClick(seatNumber)}
        >
          {seatNumber}
        </div>
      );
    }
    seatComponents.push(<div key={row} className="row">{rowSeats}</div>);
  }

  return seatComponents;
};


return(
  <div className="movie-container">
      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>N/A</small>
        </li>

        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>

        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>
      

      <div className="screen-container">{renderSeats()}</div>
      <div className="screen-section">
        <div className="screen"></div>
      </div>

      <p className="text">
        You have selected <span id="count">{selectedSeats.length}</span> Seats
      </p>
      <p>
        Total Amount: &#8377;{selectedSeats.length * 140.0}
      </p>
      
    </div>
)
}


export default MovieSeatBooking