import React from 'react'
import '../styling/Footer.css'

import InstaIcon  from  '../assets/instagram_icon.png'
import pinterestIcon from '../assets/pintester_icon.png'
import whatsappIcon from '../assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
         <div className="top">
      
            <h1>FASHION</h1>
         </div>
         <ul className='footer-menu'>
             <li>Company</li>
             <li>Products</li>
             <li>Offices</li>
             <li>About</li>
             <li>Contact</li>
         </ul>
         <div className="social-icons">
            <img src={InstaIcon} alt="" />
            <img src={pinterestIcon} alt="" />
            <img src={whatsappIcon} alt="" />
         </div>
         <hr className='footer-line' />
         <div className='Copyright'>
            <p>© Cpoyright All Rights Resreved</p>
         </div>
    </div>
  )
}

export default Footer;