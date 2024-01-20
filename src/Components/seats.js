import React, { useState } from 'react';
import './MovieSeatBooking.css'; // Make sure to include your CSS file

const MovieSeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSeatClick = (index) => {
    const newSelectedSeats = [...selectedSeats];
    if (newSelectedSeats.includes(index)) {
      // If the seat is already selected, remove it
      newSelectedSeats.splice(newSelectedSeats.indexOf(index), 1);
    } else {
      // If the seat is not selected, add it
      newSelectedSeats.push(index);
    }

    // Calculate the total price based on the selected seats
    const newTotalPrice = newSelectedSeats.length * 10; // Assuming $10 per seat

    // Update the state
    setSelectedSeats(newSelectedSeats);
    setTotalPrice(newTotalPrice);
  };

  return (
    <div className="movie-container">
      <label>Pick a movie:</label>
      <select id="movie">
        <option value="10">Avengers: Endgame ($10)</option>
        <option value="12">Joker ($12)</option>
        <option value="8">Toy Story 4 ($8)</option>
        <option value="9">The Lion King ($9)</option>
      </select>

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

      <div className="container">
        <div className="screen"></div>
        {/* ... Seat rows and columns go here ... */}
      </div>

      <p className="text">
        You have selected <span id="count">{selectedSeats.length}</span> seats for a price of $
        <span id="total">{totalPrice}</span>
      </p>
    </div>
  );
};

export default MovieSeatBooking;
