import React, { useState, useEffect } from 'react';
import '../Styles/seats_css.css';

const MovieSeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [movieIndex, setMovieIndex] = useState(0);
  const [moviePrice, setMoviePrice] = useState(10); // Default movie price, assuming $10 per seat

  useEffect(() => {
    // Load data from localStorage on component mount
    const storedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const storedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const storedMoviePrice = localStorage.getItem('selectedMoviePrice');

    if (storedSelectedSeats) {
      setSelectedSeats(storedSelectedSeats);
    }

    if (storedMovieIndex) {
      setMovieIndex(parseInt(storedMovieIndex, 10));
    }

    if (storedMoviePrice) {
      setMoviePrice(parseFloat(storedMoviePrice));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever selectedSeats, movieIndex, or moviePrice change
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice.toFixed(2)); // Save with 2 decimal places
  }, [selectedSeats, movieIndex, moviePrice]);

  const handleSeatClick = (index) => {
    const newSelectedSeats = [...selectedSeats];
    if (newSelectedSeats.includes(index)) {
      // If the seat is already selected, remove it
      newSelectedSeats.splice(newSelectedSeats.indexOf(index), 1);
    } else {
      // If the seat is not selected, add it
      newSelectedSeats.push(index);
    }

    // Calculate the total price based on the selected seats and movie price
    const newTotalPrice = newSelectedSeats.length * moviePrice;

    // Update the state
    setSelectedSeats(newSelectedSeats);
    setTotalPrice(newTotalPrice);
  };

  const movieSelectHandler = (e) => {
    setMovieIndex(e.target.selectedIndex);
    setMoviePrice(parseFloat(e.target.value));
  };

  const renderSeats = () => {
    const rows = 5; // Number of rows
    const seatsPerRow = 8; // Number of seats per row

    const seatComponents = [];

    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatNumber = (row - 1) * seatsPerRow + seat;
        const isOccupied = seatNumber % 7 === 0; // Example: Mark every 7th seat as occupied

        rowSeats.push(
          <div
            key={seatNumber}
            className={`seat ${selectedSeats.includes(seatNumber) ? 'selected' : ''} ${
              isOccupied ? 'occupied' : ''
            }`}
            onClick={() => !isOccupied && handleSeatClick(seatNumber)}
          ></div>
        );
      }
      seatComponents.push(<div key={row} className="row">{rowSeats}</div>);
    }

    return seatComponents;
  };

  return (
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
      

      <div className="container">{renderSeats()}</div>
      <div className="screen-section">
        <div className="screen"></div>
      </div>

      <p className="text">
        You have selected <span id="count">{selectedSeats.length}</span> seats for a price of $
        <span id="total">{totalPrice.toFixed(2)}</span>
      </p>
      <div className='payment'>
        <button className='btn btn-outline btn-dark'>Make Payment</button>
      </div>
    </div>
  );
};

export default MovieSeatBooking;
