import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "./Header";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import SideBar from "./SideBar";
import $ from "jquery";
import { UserProvider } from "../pages/UserContext";

const Layout = () => {
  const location = useLocation();
  const [isAuthRoute, setIsAuthRoute] = useState(true);
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLogin");
    if (storedLoginState === "true") {
      setIsAuthRoute(false);
    }
  }, [localStorage]);

  if (!isAuthRoute) {
    $(".main-container").css({ marginTop: "0" });
  }

  return (
    <>
      <UserProvider>
        <Header />
        {isAuthRoute && <SignUp />}
        {isAuthRoute && <SignIn />}
        <SideBar />
        <Outlet />
        <Footer />
      </UserProvider>
    </>
  );
};

export default Layout;
