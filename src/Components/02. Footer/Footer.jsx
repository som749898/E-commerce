import { AiFillApple,AiFillWindows } from "react-icons/ai";
import { BiLogoPlayStore } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import { BsTwitter,BsFillTelephoneFill,BsLinkedin,BsGithub } from "react-icons/bs";
import {MdEmail} from "react-icons/md";

import "./Footer.css";
import cupImage from "../../Images/04. downloadImage.jpeg"
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return <div>
    <div className="download">
      <div className="text">
        <p className="heading">Download the BookBazaar App and discover a world of books!</p>
        <p className="content">The app is now available in different stores supporting all devices!</p>
        <div className="logo-container">
          <div className="logo">
            <AiFillApple className="download-logo"/>
            <div>
              <p className="download-text">Download From</p>
              <p className="download-source">App Store</p>
            </div>
          </div>
          <div className="logo">
            <BiLogoPlayStore className="download-logo" />
            <div>
              <p className="download-text">Download From</p>
              <p className="download-source">Google Play</p>
            </div>
          </div>
          <div className="logo">
            <AiFillWindows className="download-logo" />
            <div>
              <p className="download-text">Download From</p>
              <p className="download-source">Windows Store</p>
            </div>
          </div>
        </div>
      </div>
      <img src={cupImage} alt="cup" />
    </div>
    <div className="footer">
      <div className="footer-left">
        <NavLink to="/" className="app-logo">
          <HiShoppingCart className="cart-logo" />
          <h3 className="heading">BookBazaar</h3>
        </NavLink>
        <p className="footer-content">Order books online and get them delivered!</p>
        <p className="footer-website">bookbazaar@netlify.com</p>
        <div className="social-media">
          <a href="https://github.com/som749898" target="_blank" rel="noopener noreferrer">
            <BsGithub className="footer-logo"/>
          </a>
          <a href="https://www.linkedin.com/in/manishsom20/" target="_blank" rel="noopener noreferrer">
            <BsLinkedin className="footer-logo"/>
          </a>
          <a href="https://twitter.com/ManishSBiswal1" target="_blank" rel="noopener noreferrer">
            <BsTwitter className="footer-logo"/>
          </a> 
        </div>
      </div>
      <div className="footer-right">
        <p className="text-1">Need assistance?</p>
        <p className="text-2">Our support team is available</p>
        <div className="footer-helpline">
          <BsFillTelephoneFill className="helpline-logo" />
          <p className="helpline-text">(+123) 000 111 222 333</p>
        </div>
        <div className="footer-helpline">
          <MdEmail className="helpline-logo" />
          <p className="helpline-text">support@bookbazaar.com</p>
        </div>
      </div>
    </div>
  </div>
}