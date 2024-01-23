import React from 'react'
import "../Styles/aboutUs.css"
import Details from './footer'
import { Link } from 'react-router-dom'
import image from "../Images/logo3.png"
import NavBar from './navBar'


function AboutUs() {
    return (
        <>
        <div className="aboutUs">
            <header>
                <h1>Welcome to Enma Pictures</h1>
                <h4>Your Ultimate Movie Experience</h4>
            </header>
            <section className="aboutSection">
                <h2>ABOUT US</h2>
                <p>
                Enma Pictures is not just a movie theatre; it's a cinematic journey designed to
                captivate your senses and immerse you in the magic of storytelling. With state-of-the-art
                facilities, a diverse selection of films, and a commitment to creating memorable
                experiences, we strive to be your go-to destination for entertainment.
                </p>
            </section>
            <section className="goalSection">
                <h2>Our Goal</h2>
                <p>
                    Our mission is to provide a unique and unforgettable cinematic experience to our
                    audience. We aim to showcase a wide range of films, from blockbuster hits to
                    thought-provoking indie gems, in a comfortable and technologically advanced environment.
                    At Enma Pictures, we believe in the power of storytelling to connect people and inspire
                    imaginations.
                </p>
            </section>
            <section className="teamsection">
                <h2>Meet Our Team</h2>
                <p>
                Our dedicated team is passionate about cinema and committed to ensuring that every visit
                to Enma Pictures is a memorable one. From our friendly staff at the ticket counter to
                our skilled projectionists, each member plays a crucial role in creating a welcoming and
                enjoyable atmosphere for our patrons.
                </p>
            </section>
            <p>
                Have questions, suggestions, or just want to share your movie experience with us? Feel
                free to reach out @<Link to="/contactus"  className="contact"> CONTACT US</Link>. We're here to assist you!
        </p>
    </div>
    <Details/>
        </>
)
}

export default AboutUs;
