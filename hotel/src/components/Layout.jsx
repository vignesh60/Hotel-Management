import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "./Header";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import SideBar from "./SideBar";
const Layout = () => {

  return (
    <>
      <Header />
      <SignUp />
      <SignIn />
      <SideBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
