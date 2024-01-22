
  const [selectedSeats, setSelectedSeats] = useState([]);

  

  

  const handleSeatSelection = (seatNumber) => {
    const updatedSeats = selectedSeats.includes(seatNumber)
      ? selectedSeats.filter((seat) => seat !== seatNumber)
      : [...selectedSeats, seatNumber];

    setSelectedSeats(updatedSeats);
  };

 
  
  return (
    <div className="booking-card">
      <div className="booking-section">
      <div className="date-buttons">
          {availableDates.map(({ date, display }) => (
            <button
              key={date}
              className={`date-button ${selectedDate === date ? 'selected' : ''}`}
              onClick={() => handleDateChange(date)}
            >
              {display}
            </button>
          ))}
        </div>
      </div>


      <div className="booking-section">
        <h3>Select Show Time</h3>
        <div className="showtime-buttons">
          
        </div>
      </div>

      <div className="booking-section">
        <h3>Select Seats</h3>
        <div className="seat-grid">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className={`seat ${selectedSeats.includes(index + 1) ? 'selected' : ''}`}
              onClick={() => handleSeatSelection(index + 1)}
            >
              <div className="seat-icon">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="screen-section">
        <h3>Screen</h3>
        <div className="screen"></div>
      </div>
    </div>