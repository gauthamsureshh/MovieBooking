import React, { useState } from 'react'
import '../Styles/contactUs.css'
import Details from './footer';
import emailjs from '@emailjs/browser'

function ContactUs() {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [message,setMessage]=useState('')
    const serviceId='service_09kch9a'
    const templateId='template_m8gcqyy'
    const publicKey='O6G0F7zdY5gc3Ol3v'

    const templateParams={
        from_name:name,
        message:message,
        from_email:email

    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!name || !email || !message){
            alert('Please fill all fields..!')
            return
        }
        emailjs.send(serviceId,templateId,templateParams,publicKey).then((response)=>{
            alert('Feedback sent successfully!')
            setName('')
            setEmail('')
            setMessage('')
        })
    }


    return (
    <>
    <div className="contactUs">
        <div className='card'>
        <header>
            <h1>Contact Us</h1>
            <h5>Write me a Message</h5>
        </header>
        <section className="contactForm">
            <form>
                <input type="text" id="name" name="name" required placeholder='Your Name' value={name} onChange={(event)=>setName(event.target.value)} />
                <input type="email" id="email" name="email" required placeholder='Your Email' value={email} onChange={(event)=>setEmail(event.target.value)}/>
                <textarea id="message" name="message" rows="4" required placeholder='Your Message' value={message} onChange={(event)=>setMessage(event.target.value)}></textarea>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </section>
        </div>
    </div>
    <Details/>
    </>
    )
}

export default ContactUs;
