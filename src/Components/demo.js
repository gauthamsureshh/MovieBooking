import axios from "axios";
import React, { useEffect, useState } from "react";

import '../Styles/seats_css.css';


function MovieSeatBookings(){
  
  const [selectedSeats,setSelectedSeats]=useState([])
  const [moviePrice,setMoviePrice]=useState(10)

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await axios.get('http://127.0.0.1:8000/seatselection/2/')
        const {selected_seats,movie_price}=response.data
        setSelectedSeats(selected_seats || [])
        setMoviePrice(movie_price  || 10)
      }
      catch(error){
        console.log('Error getting data',error)
      }
    }
    fetchData()
  },[])



useEffect(()=>{
  const postData=async()=>{
    try{
      await axios.patch('http://127.0.0.1:8000/seatselection/2/',{
        selected_seats:selectedSeats,
        movie_price:moviePrice
      })
    }catch(error){
      console.log("error saving seats",error)
    }
  }
  postData()
},[selectedSeats,moviePrice])

const handleSeatClick = (index) => {
  const newSelectedSeats = [...selectedSeats];
  if (newSelectedSeats.includes(index)) {
    newSelectedSeats.splice(newSelectedSeats.indexOf(index), 1);
  } else {
    newSelectedSeats.push(index);
  }
  setSelectedSeats(newSelectedSeats);
};

const renderSeats = () => {
  const rows = 3; // Number of rows
  const seatsPerRow = 8; // Number of seats per row

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
      
    </div>
)
}


export default MovieSeatBookings