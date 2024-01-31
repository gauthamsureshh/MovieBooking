import React, { useState, useEffect ,createContext} from 'react';
import { useParams } from 'react-router-dom';
import "../Styles/booking.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import MovieSeatBooking from "./seats"
import checkAuth from '../Auth/checkAuth';
import { useDispatch } from 'react-redux';
import { selectSeat,selectDate,selectTime,selectmovieId } from '../store/ticketSlice';



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
        dispatch(selectTime(selectedShowTime))
        dispatch(selectmovieId(movieid))
        dispatch(selectDate(selectDate))
        dispatch(selectSeat(selectedSeatsfromchild))
        nav("../confirmpage")
    }

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
                {getDates(new Date(startShowDate), new Date(endShowDate)).map((date, index) => (
                        <button
                            key={index}
                            className={`date-button ${selectedDate === date.toISOString() ? 'selected' : ''}`}
                            onClick={() => handleDateChange(date.toISOString())}
                        >
                            {new Date(date.toISOString().split('T')[0]).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                        </button>
                    ))}
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

export default BookingCard
