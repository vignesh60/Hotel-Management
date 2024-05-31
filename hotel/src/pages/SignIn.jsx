import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import $ from "jquery";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { PiWarningOctagonBold } from "react-icons/pi";

const SignIn = () => {
  var e = "vigneshg.22cse@kongu.edu";
  var pass = "1234";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [overlay, setOverlay] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const parts = location.pathname.split("/");
  const wordAfterLastSlash = parts[parts.length - 1];

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Retrieve form data from event.target
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    if (e === formData.email && pass === formData.password) {
      localStorage.setItem("isLogin", "true");
      navigate("/");
      window.location.reload();
    } else {
      setError("Invalid email & password");
      // Optionally, show error message to user
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
    if (wordAfterLastSlash === "signin") {
      setOverlay(true);
    } else {
      setOverlay(false);
    }
  }, [location]);

  $(document).ready(function () {
    $("input").focus(function () {
      $(this).siblings("label").css({ top: "0" });
    });

    $("input").blur(function () {
      if (!$(this).val()) {
        $(this).siblings("label").css({ top: "50%" });
      }
    });
  });

  return (
    <>
      {overlay && (
        <div className="overlay">
          <div className="form-container">
            <h2>
              Sign In{" "}
              <IoIosClose className="close-icon" onClick={() => closeForm()} />
            </h2>
            <form onSubmit={handleSubmit}>
            {error && <p className="form_error-message">{error} <PiWarningOctagonBold style={{fontSize: "1rem"}}/></p>}
              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <div className="input-box">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <small>
                If you don't have an account?{" "}
                <Link to="/signup" style={{ color: "blue" }}>
                  Sign up
                </Link>
              </small>
              <input type="submit" value="Sign In" className="btn" />
              <button className="btn" style={{marginTop:"-0.4rem"}}>
                <FcGoogle className="icon"/> Sign In with Google
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
