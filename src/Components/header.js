import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpcomingMovies() {
    const [upcoming,setUpcoming]=useState([])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/upcoming').then(response=>{
            setUpcoming(response.data)
        })
    },[])

    return (
    <div>
        <Carousel>
        {upcoming.map(movie=>(
            <Carousel.Item>
            <img
                className='d-block w-100'
                src={movie.upcoming}
                alt='first'
                style={{ maxHeight: '400px' }}/>
            <Carousel.Caption>

            </Carousel.Caption>
        </Carousel.Item>
        ))}
        </Carousel>
    </div>
);
}

export default UpcomingMovies;