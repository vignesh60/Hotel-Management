import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "./Header";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
const Layout = () => {

  return (
    <>
      <Header />
      <SignUp />
      <SignIn />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
