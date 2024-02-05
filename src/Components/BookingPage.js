import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import "../Styles/booking.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import MovieSeatBooking from "./seats"
import checkAuth from '../Auth/checkAuth';
import { useDispatch } from 'react-redux';
import { selectSeat,selectDate,selectTime,selectmovieName,selectUrl,selectmovieId} from '../store/ticketSlice';



function BookingCard() {

    const { movieid } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedShowTime, setSelectedShowTime] = useState(null);
    const [movie, setMovie] = useState(null);
    const [startShowDate,setStartShowDate]=useState('')
    const [endShowDate,setEndShowDate]=useState('')
    const [selectedSeatsfromchild,setSelectedSeatsFromChild]=useState([])
    const nav =useNavigate()
    const dispatch=useDispatch()
    const handleProceed=()=>{
        if(selectedSeatsfromchild.length > 0 && selectedDate && selectedShowTime){
            dispatch(selectmovieId(movieid))
            dispatch(selectTime(selectedShowTime))
            dispatch(selectmovieName(movie.movie_title))
            dispatch(selectDate(selectedDate))
            dispatch(selectSeat(selectedSeatsfromchild))
            dispatch(selectUrl(movie.poster_url))
            nav("../confirmpage")
        }
        else{
            alert("Have to Select Seats,Time And Date to Proceed")
        }
        
    }
    console.log(`date${selectedDate} and time ${selectedShowTime}`)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/moviedetails/${movieid}/`).then(response => {
            const details = response.data[0];
            console.log(details)
            setMovie(details);
            setStartShowDate(details.showbegins)
            setEndShowDate(details.showends)
        })
    }, [movieid]);
    const handleseatchange=(selectedSeats)=>{
        setSelectedSeatsFromChild(selectedSeats)
    }


    const getDates = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };
    const dates = getDates(new Date(startShowDate), new Date(endShowDate))
    const [visibleStartDateIndex, setVisibleStartDateIndex] = useState(0);
    const visibleDates = dates.slice(visibleStartDateIndex, visibleStartDateIndex + 5);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleShowTimeChange = (time) => {
        setSelectedShowTime(time);
    };


    const handlePrevDates = () => {
        if (visibleStartDateIndex > 0) {
            setVisibleStartDateIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleNextDates = () => {
        if (visibleStartDateIndex + 5 < dates.length) {
            setVisibleStartDateIndex((prevIndex) => prevIndex + 1);
        }
    };


    return (
        
        <div className='book-body'>
            <div className='card'>
                <div className='card-header'>
                    <h4> Movie :{movie?.movie_title}</h4>
                </div>
                <div className='card-header'>
                <button className="arrow-button" onClick={handlePrevDates}>&lt;</button>
                {visibleDates.map((date, index) => (
                        <button
                            key={index}
                            className={`date-button ${selectedDate === date.toISOString() ? 'selected' : ''}`}
                            onClick={() => handleDateChange(date.toISOString())}
                        >
                            {new Date(date.toISOString().split('T')[0]).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                        </button>
                    ))} 
                
                    <button className="arrow-button" onClick={handleNextDates}>&gt;</button>
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
                    <MovieSeatBooking OnSeatChange={handleseatchange}/>
                </div>
                <div className='proceed'>
                    <button className='btn btn-danger book-now' onClick={handleProceed}>Proceed</button>
                </div>
            </div>
            
        </div>
    );
}

export default checkAuth(BookingCard)
