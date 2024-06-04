import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import Profile from "./assets/person5.jpeg";
import { HiMiniBars3 } from "react-icons/hi2";
import $ from "jquery";
import { IoIosArrowDown } from "react-icons/io";
import { UserContext } from "../pages/UserContext"

const Header = () => {
  const [account, setAccount] = useState(false);
  const { userinfo } = useContext(UserContext);
  const handleSideBar = () => {
    $(".main-container").css({ display: "block" });
    setTimeout(() => {
      $(".sideBar-container").css({ transform: "translateX(0%)" });
    }, 10);
  };
  

  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLogin");
    if (storedLoginState === "true") {
      setAccount(true);
    }
  }, [localStorage]);

  const handleLogout = () => {
    const confirmation = window.confirm(
      "Are you sure you want to Logout your Account?"
    );

    if (confirmation) {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("email");
      setAccount(false);
      window.location.reload();
    }
  };

  $(document).ready(function () {
    $(".search_container input").focus(function () {
      $(".search_container").css({
        borderColor: "#2591f7",
        boxShadow: "0 0 0px 3px #197cf54d",
      });

      $(".search_container input").blur(function () {
        $(".search_container").css({
          border: "2px solid #197cf593",
          boxShadow: "0 0 0 0",
        });
      });
    });
  });

  const handleProfile = () => {
    $(".logout-container").toggle();
  };

  return (
    <nav>
      <div className="container nav_container">
        <div className="sidebar_logo">
          <HiMiniBars3 className="bar-icon" onClick={() => handleSideBar()} />
          <Link to="/" className="nav_logo">
            <img src={Logo} alt="Navbar logo" className="site-logo" />
          </Link>
        </div>
        <div className="search_container">
          <input type="text" placeholder="search" />
          <IoSearchOutline className="icon" />
        </div>

        {account ? (
          <div className="notification_plus_login">
            <div className="notification">
              <IoNotificationsOutline className="icon" />
            </div>
            <span className="profile-field" onClick={() => handleProfile()}>
              <img src={Profile} alt="Profile" className="profile" />
              <p>
                {userinfo.username} <IoIosArrowDown />
              </p>

              <div className="logout-container">
                <Link to="/profile">
                  <button>Profile</button>
                </Link>
                <button onClick={() => handleLogout()}>Logout</button>
              </div>
            </span>
            {/* <button className="btn log" onClick={() => handleLogout()}>
              Logout
            </button> */}
          </div>
        ) : (
          <div className="signin-signup">
            <Link to="signin">
              <button className="btn log">Sign In</button>
            </Link>
            <Link to="signup">
              <button className="btn log">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
