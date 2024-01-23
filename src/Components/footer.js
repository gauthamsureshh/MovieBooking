import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faTwitter ,faFacebook} from '@fortawesome/free-brands-svg-icons'
import "../Styles/footer_css.css"
import { Link } from 'react-router-dom';

function Details(){
  return (
    <footer className="footer">
        <div className="about">
            <p><Link to="/"  className="aboutLink">HOME</Link></p>
            <p><Link to="/aboutus"  className="aboutLink">ABOUT US</Link></p>
            <p><Link to="/contactus"  className="aboutLink">CONTACT US</Link></p>
      </div>
      <hr />
      <div className="social-icons">
        
      <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      </div>
      <hr />
      <div className="footer-section">
        <h5>Policies</h5>
        <h5>Policies</h5>
      </div>
      <hr/>
      <div className="copyright">
        <p>COPYRIGHT &copy; 2024 ENMA PICTURES.ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Details;
