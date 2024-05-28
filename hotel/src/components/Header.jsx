import React from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import Profile from "./assets/person5.jpeg";
import { HiMiniBars3 } from "react-icons/hi2";
import $ from "jquery";

const Header = () => {
  const handleSideBar = () => {
    $(".main-container").css({display: "block"});
    setTimeout(() => {
      $(".sideBar-container").css({transform: "translateX(0%)"})
    },10)
  }
  return (
    <nav>
      <div className="container nav_container">
        <div className="sidebar_logo">
        <HiMiniBars3 className='bar-icon' onClick={() => handleSideBar()}/>
        <Link to="/" className="nav_logo">
          <img src={Logo} alt="Navbar logo" className="site-logo"/>
        </Link>
        </div>
        <div className="search_container">
          <input type="text" placeholder="search" />
          <IoSearchOutline className="icon" />
        </div>

        <div className="notification_plus_login">
          <div className="notification">
            <IoNotificationsOutline className="icon" />
          </div>
          <Link to='/profile'>
          <img src={Profile} alt="Profile" className="profile" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
