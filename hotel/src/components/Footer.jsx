import React from "react";
import Logo from "./assets/logo.png";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="footer">
      <div className="child-footer">
        <div className="logo">
          <img src={Logo} alt="Logo" style={{ maxWidth: "4rem" }} />
          <p>
            LuxStay: Your perfect getaway starts here! Book luxurious rooms with
            top-notch amenities, unparalleled comfort, and excellent service.
            Explore our wide range of accommodations to find your dream stay,
            whether for a weekend escape, a business trip, or a family vacation.
            Experience convenience, quality, and peace of mind with LuxStay.
            Your satisfaction is our priority.
          </p>
        </div>

        <div className="row">
          <div className="col">
            <h2>COMPANY</h2>
            <a href="#">About us</a>
            <a href="#">Legal information</a>
            <a href="#">Contact Us</a>
            <a href="#">Blogs</a>
          </div>
          <div className="col">
            <h2>HELP CENTER</h2>
            <a href="#">Help Center</a>
            <a href="#">Find a Property</a>
            <a href="#">How To Host?</a>
            <a href="#">Why Us?</a>
            <a href="#">FAQs</a>
            <a href="#">Rental Guides</a>
          </div>
          <div className="col">
            <h2>CONTACT INFO</h2>
            <a href="#">Phone: 1234567890</a>
            <a href="#">Email: company@gmail.com</a>
            <a href="#">Location: Perundurai, Erode, TamilNadu - 334 434</a>
            <div className="social-icons">
              <a href="https://facebook.com">
                <FaSquareFacebook className="social-icon" />
              </a>
              <a href="https://instagram.com">
                <RiInstagramFill className="social-icon" />
              </a>
              <a href="https://linkedin.com">
                <IoLogoLinkedin className="social-icon" />
              </a>
              <a href="https://twitter.com">
                <FaSquareXTwitter className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <span className="copy-right">
        <p>&copy; 2024 our team | All rights reserved</p>
        <p>Created with love by our team</p>
      </span>
    </div>
  );
};

export default Footer;
