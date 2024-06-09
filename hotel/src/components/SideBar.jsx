import React, { useContext, useEffect, useState } from "react";
import { IoCloseOutline, IoHome } from "react-icons/io5";
import $ from "jquery";
import { Link } from "react-router-dom";
import Logo from "../components/assets/logo.png";
import { IoSettingsSharp } from "react-icons/io5";
import { IoBed } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { BiSolidOffer } from "react-icons/bi";
import { PiSignInBold } from "react-icons/pi";
import { LiaSignInAltSolid } from "react-icons/lia";
import { UserContext } from "../pages/UserContext";

const SideBar = () => {
  const mailid = "vigneshg.22cse@kongu.edu";
  const { userinfo } = useContext(UserContext);
  const handleSideBar = () => {
    setTimeout(() => {
      $(".main-container").css({ display: "none" });
    }, 200);
    $(".sideBar-container").css({ transform: "translateX(-200%)" });
  };
  const [account, setAccount] = useState(false);
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLogin");
    if (storedLoginState === "true") {
      setAccount(true);
    }
  }, [localStorage]);
  return (
    <div
      className="main-container"
      onClick={() => {
        handleSideBar();
      }}
    >
      <div className="sideBar-container">
        <div className="close-icon-div">
          <span className="nav_logo">
            <img src={Logo} alt="" className="site-logo" />
            <p className="logo-text colored-text">LuxeStay</p>
          </span>
          <IoCloseOutline
            className="close-icon"
            onClickCapture={() => handleSideBar()}
          />
        </div>
        <hr />
        <div className="child-container">
          <div className="categories">
            <ul>
              {account && userinfo.useremail === mailid && (
                <>
                  <Link
                    to="dashboard"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <li>
                      <RiDashboardFill className="icons" /> Dashboard
                    </li>
                  </Link>
                  <Link
                    to="addroom"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <li>
                      <IoBed className="icons" /> Add Room
                    </li>
                  </Link>
                </>
              )}
              <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                <li>
                  <IoHome className="icons" />
                  Home
                </li>
              </Link>
              <Link
                to="roomslist"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <li>
                  <IoBed className="icons" /> Rooms List
                </li>
              </Link>
              <Link
                to="offters"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <li>
                  <BiSolidOffer className="icons" /> Offers
                </li>
              </Link>
              <Link
                to="settings"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <li>
                  <IoSettingsSharp className="icons" /> Settings
                </li>
              </Link>
              {!account && (
                <>
                  <Link
                    to="signin"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <li>
                      <PiSignInBold className="icons" /> Sign In
                    </li>
                  </Link>
                  <Link
                    to="signup"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <li>
                      <LiaSignInAltSolid className="icons" /> Sign Up
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="empty-container"></div>
      </div>
    </div>
  );
};

export default SideBar;
