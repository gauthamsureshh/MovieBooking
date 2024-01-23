import React from 'react'
import '../Styles/contactUs.css'
import Details from './footer';

function ContactUs() {
    return (
    <>
    <div className="contactUs">
        <div className='card'>
        <header>
            <h1>Contact Us</h1>
            <h5>Send Us a Message</h5>
        </header>
        <section className="contactForm">
            <form>
                <label htmlFor="name">Your Name:</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="email">Your Email:</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="message">Your Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </section>
        </div>
    </div>
    <Details/>
    </>
    )
}

export default ContactUs;
