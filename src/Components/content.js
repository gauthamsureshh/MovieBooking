import React, { useEffect, useState } from 'react';
import "../Styles/movieList.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function Nowshowing() {
    const [movies,setMovies]=useState([])
    const [showAll,setShowall]=useState(false)
    const nav=useNavigate()

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/movielist').then(response=>{
                setMovies(response.data)
        })
    },[])


    const handleViewall=()=>{
        setShowall(true)
    }
    const handleBook=(movieid)=>{
        nav(`bookingpage/${movieid}`)
    }
    function formatDuration(duration) {
        const [hours, minutes, seconds] = duration.split(':');
        return `${hours.padStart(2, '0')}H:${minutes.padStart(2, '0')}M:${seconds.padStart(2, '0')}S`;
    }
    return (
        <div className='now-showing'>
            <marquee  direction="left">
                <h4>-----------------------NOW SHOWING---------------------- </h4>
            </marquee>
        <div className='movie-list-container'>
        {movies.slice(0,showAll ? movies.length :4).map(movie=>(
            <div className="movie-card" key={movie.id}>
                <img className="poster" src={movie.poster_url} alt="Movie Poster" />
                <div className="movie-details">
                    <h2 className="title">{movie.movie_title}</h2>
                    <h4 className="genre">{movie.genre}</h4>
                    <h4 className="duration">{formatDuration(movie.duration)}</h4>
                    <h4 className="release-date">{movie.date_of_release}</h4>
                </div>
                <button className="btn-book-now" onClick={()=>handleBook(movie.id)}>Book Now</button>
            </div>
    ))}
    
    </div>
    <button className='btn-view-all' onClick={handleViewall }>View ALL</button>
    </div>
    );
}

export default Nowshowing;
