import React from 'react'
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'
import './Footer.css';

function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-icons">
                <a href='https://instagram.com'><FaInstagram /></a>
                <a href='https://facebook.com'><FaFacebook /></a>
                <a href='https://twitter.com'><FaTwitter /></a>
            </div>
            <div className="footer-text">
                <p>	&#169; findmypet.com 2022</p>
            </div>
        </div>
    );
};

export default Footer;