import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import $ from "jquery";
import { Link } from "react-router-dom";
import Logo from "../components/assets/logo.png";
import { IoSettingsSharp } from "react-icons/io5";
import { IoBed } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { BiSolidOffer } from "react-icons/bi";

const SideBar = () => {
    const handleSideBar = () => {
        setTimeout(() => {
          $(".main-container").css({ display: "none" });
        }, 200);
        $(".sideBar-container").css({ transform: "translateX(-200%)" });
      };
  return (
    <div
      className="main-container"
      onClick={() => {
        handleSideBar();
      }}
    >
      <div className="sideBar-container">
        <div className="close-icon-div">
          <img src={Logo} alt="" className="site-logo" />
          <IoCloseOutline
            className="close-icon"
            onClickCapture={() => handleSideBar()}
          />
        </div>
        <hr />
        <div className="child-container">
          <div className="categories">
            <ul>
              <Link
                to="dashboard"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <li><RiDashboardFill className="icons"/> Dashboard</li>
              </Link>
              <Link
                to="roomslist"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <li><IoBed className="icons"/> Rooms List</li>
              </Link>
              <Link
                to="offters"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <li><BiSolidOffer className="icons"/> Offers</li>
              </Link>
              <Link
                to="settings"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <li><IoSettingsSharp className="icons"/> Settings</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="empty-container"></div>
      </div>
    </div>
  );
};

export default SideBar;
