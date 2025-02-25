import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                {/* <img src={assets.logo} alt=''/> */}
                <p>Discover the wonders of wildlife at our zoo! Our mission is to inspire and educate visitors about the incredible diversity of animals and the importance of conservation. Join us for an unforgettable experience, and help support our efforts to protect and preserve wildlife for future generations. Visit us today and be part of our journey to make a difference.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt=''/>
                    <img src={assets.twitter_icon} alt=''/>
                    <img src={assets.linkedin_icon} alt=''/>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>MyZOO</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Order Tickets</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1+212_456+7869</li>
                    <li>Contact@MyZOO.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2024 © MyZOO.com - All Right Reserved.</p>
      
    </div>
  )
}

export default Footer
