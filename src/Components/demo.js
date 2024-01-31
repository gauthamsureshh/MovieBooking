import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';


function SearchResults(){
const {searchTerm}=useParams()
const [movies,setMovies]=useState([])
useEffect(() => {
  axios.get(`http://127.0.0.1:8000/moviesearch/${searchTerm}`).then(response => {
      const details = response.data;
      console.log("API response:",details)
      setMovies(details);
  }).catch(error => {
    console.error("Error fetching data:", error);
  });
}, [searchTerm]);
const nav=useNavigate()
const handleBook=(movieid)=>{
  nav(`bookingpage/${movieid}`)
}

  function formatDuration(duration) {
    const [hours, minutes, seconds] = duration.split(':');
    return `${hours.padStart(2, '0')}H:${minutes.padStart(2, '0')}M:${seconds.padStart(2, '0')}S`;
}
  return(
    <div className='now-showing'>
      <div className='movie-list-container'>
        {movies && movies.length > 0 ? (
          movies.map(movie => (
            <div className="movie-card" key={movie.id}>
              <img className="poster" src={movie.poster_url} alt="Movie Poster" />
              <div className="movie-details">
                <h2 className="title">{movie.movie_title}</h2>
                <h4 className="genre">{movie.genre}</h4>
                <h4 className="duration">{formatDuration(movie.duration)}</h4>
                <h4 className="release-date">{movie.date_of_release}</h4>
              </div>
              <button className="btn-book-now" onClick={() => handleBook(movie.id)}>Book Now</button>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  )
}
export default SearchResults