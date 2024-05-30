import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import $ from "jquery";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [overlay, setOverlay] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const parts = location.pathname.split("/");
  const wordAfterLastSlash = parts[parts.length - 1];

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");

  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (userData.password !== userData.password2) {
      setError("Password mismatch. Please check your password.");
    } else {
      setError("");
      navigate("/login");
    }
  };

  function closeForm() {
    setTimeout(() => {
      $(".form-container").css({ transform: "translateY(20%)", opacity: 0 });
      setTimeout(() => {
        setOverlay(false);
        navigate("/");
      }, 130);
    }, 100);
  }

  useEffect(() => {
    setTimeout(() => {
      $(".form-container").css({ Transform: "translateY(0%)", opacity: 1 });
    }, 100);
    if (wordAfterLastSlash === "signup") {
      setOverlay(true);
    } else {
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
            <form onSubmit={submitHandler}>
              {error && <p className="form_error-message">{error}</p>}
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={userData.name}
                onChange={changeInputHandler}
                autoFocus
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={changeInputHandler}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={changeInputHandler}
                required
              />
              <input
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={userData.password2}
                onChange={changeInputHandler}
                required
              />
              <small>
                Already have an account? <Link to="/signin" style={{color: "blue"}}>Sign in</Link>
              </small>
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
