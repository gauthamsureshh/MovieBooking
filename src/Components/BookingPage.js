import React, { useState } from 'react';
import "../Styles/booking.css"

function BookingCard (){
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedShowTime, setSelectedShowTime] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleShowTimeChange = (time) => {
        setSelectedShowTime(time)
    }
    const availableDates = [
        { date: '2024-01-25', display: '25 Jan' },
        { date: '2024-01-26', display: '26 Jan' },
        { date: '2024-01-27', display: '27 Jan' },
        { date: '2024-01-28', display: '28 Jan' },
        { date: '2024-01-29', display: '29 Jan' },
        ]
    
    const showTimes = ['11:30 AM', '02:30 PM', '05:00 PM', '09:00 PM'];

    return(
        <div className='book-body'>
            <div className='card'>
            <div className='card-header'>
                {availableDates.map(({ date, display }) => (
                <button key={date} className={`date-button ${selectedDate === date ? 'selected' : ''}`} onClick={() => handleDateChange(date)}>
                    {display}
                </button>
                ))}
            </div>
            <div className='card-footer'>
                {showTimes.map((time) => (
                <button key={time} className={`showtime-button ${selectedShowTime === time ? 'selected' : ''}`} onClick={() => handleShowTimeChange(time)}>
                    {time}
                </button>
                ))}
            </div>
            <div className='card-footer'>
                <h4 style={{color:"black"}}>Seat Selection</h4>
            </div>
        </div>
        </div>
    )

};

export default BookingCard;
