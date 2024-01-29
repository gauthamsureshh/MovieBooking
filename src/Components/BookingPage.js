import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../Styles/booking.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import MovieSeatBooking from "./seats"
import checkAuth from '../Auth/checkAuth';




function BookingCard() {
    const { movieid } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedShowTime, setSelectedShowTime] = useState(null);
    const [movie, setMovie] = useState(null);


    const nav =useNavigate()
    const handleProceed=()=>{
        nav("../confirmticket")
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/moviedetails/${movieid}/`).then(response => {
            const details = response.data[0];
            console.log(details)
            setMovie(details);
        })
    }, [movieid]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleShowTimeChange = (time) => {
        setSelectedShowTime(time);
    };


    return (
        <div className='book-body'>
            <div className='card'>
                <div className='card-header'>
                    <h4> Movie :{movie?.movie_title}</h4>
                </div>
                <div className='card-header'>
                    <button
                        className={`date-button ${selectedDate === movie?.availableDates ? 'selected' : ''}`}
                        onClick={() => handleDateChange(movie?.availableDates)}
                    >
                        {new Date(movie?.availableDates).toLocaleDateString('en-GB', { year: '2-digit', month: 'short' })}
                    </button>
                </div>
                <div className='card-footer'>
                    {movie?.showTimes.map((showTime, index) => (
                    <button key={index} 
                        className={`showtime-button ${selectedShowTime === showTime ? 'selected' : ''}`}
                        onClick={() => handleShowTimeChange(showTime)}
                    >
                        {showTime}
                    </button>
                    ))}
                </div>
                <div className='card-footer'>
                    <MovieSeatBooking movieid={movieid}/>
                </div>
                <div className='proceed'>
                    <button className='btn btn-danger book-now' onClick={handleProceed}>Proceed</button>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(BookingCard)
