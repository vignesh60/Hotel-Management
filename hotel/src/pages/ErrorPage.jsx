import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  useEffect(()=> {
    window.scrollTo(0,0);
  })
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2 className="text">Page Not Found</h2>
      <Link to="/">
        <button className="btn">Go Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
