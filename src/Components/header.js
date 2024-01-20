import Carousel from 'react-bootstrap/Carousel';
import React from 'react';

function UpcomingMovies() {
    return (
    <div>
        <Carousel>
            <Carousel.Item>
                <img
                    className='d-block w-100'
                    src='https://i.pinimg.com/originals/e9/24/0b/e9240b7c5b29b0fb4aa86304a03287e8.jpg'
                    alt='first'
                    style={{ maxHeight: '400px' }}/>
                <Carousel.Caption>
                    <button className='btn btn-danger'>Watch Teaser</button>
                    <h4 style={{color:"red"}}>Coming Soon..!</h4>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='d-block w-100'
                    src='https://rukminim2.flixcart.com/image/850/1000/poster/q/r/v/posterskart-interstellar-movie-poster-pkis04-medium-original-imaebctvytcgcgcx.jpeg?q=90&crop=false'
                    alt='first'
                    style={{ maxHeight: '400px' }}/>
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='d-block w-100'
                    src='https://i0.wp.com/thetechnovore.com/wp-content/uploads/2019/04/D40BuNcWAAEVP4r.jpg?fit=1200%2C503&ssl=1'
                    alt='first'
                    style={{ maxHeight: '400px' }}/>
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>
);
}

export default UpcomingMovies;