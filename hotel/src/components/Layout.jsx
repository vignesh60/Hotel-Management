import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "./Header";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import SideBar from "./SideBar";
import $ from 'jquery';
const Layout = () => {

  const location = useLocation();
  const [isAuthRoute,setIsAuthRoute] = useState(true);
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLogin");
    if (storedLoginState === "true") {
      setIsAuthRoute(false);
    }
  }, [localStorage]);

  if(!isAuthRoute){
    $(".home-container").css({paddingTop: "5.5rem"});
    $(".main-container").css({marginTop: "0"});
  }

  return (
    <>
      <Header />
      {isAuthRoute && <SignUp />}
      {isAuthRoute && <SignIn />}
      <SideBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
