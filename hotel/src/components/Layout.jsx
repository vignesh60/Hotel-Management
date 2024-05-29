import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "./Header";
import SignUp from "../pages/SignUp";
const Layout = () => {
  return (
    <>
      <Header />
      <SignUp />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
