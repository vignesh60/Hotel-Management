import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import $ from "jquery";
import { useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [overlay, setOverlay] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const parts = location.pathname.split("/");
  const wordAfterLastSlash = parts[parts.length - 1];

  function closeForm() {
    setTimeout(() => {
      $(".form-container").css({ transform: "translateY(20%)", opacity: 0 });
      setTimeout(() => {
        setOverlay(false);
        navigate('/');
      }, 130);
    }, 100);
  }

  useEffect(() => {
    setTimeout(() => {
      $(".form-container").css({ Transform: "translateY(0%)", opacity: 1 });
    }, 100);
    if(wordAfterLastSlash === "signup"){
        setOverlay(true);
    }else{
        setOverlay(false);
    }
  }, [location]);

  return (
    <>
      {overlay && (
        <div className="overlay">
          <div className="form-container">
            <h2>
              Sign Up{" "}
              <IoIosClose className="close-icon" onClick={() => closeForm()} />
            </h2>
            <form action="#">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
              <label htmlFor="confirm">Confirm</label>
              <input type="password" id="confirm" />
              <input type="submit" value="Sign Up" className="btn" />
            </form>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default SignUp;
