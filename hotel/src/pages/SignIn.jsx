import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import $ from "jquery";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Retrieve form data from event.target
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    if (e === formData.email && pass === formData.password) {
      localStorage.setItem("isLogin", "true");
      window.reload();
    } else {
      console.log("Invalid email or password:", formData.email);
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="submit" value="Sign In" className="btn" />
              <button className="btn">
                <FcGoogle className="icon" /> Sign In with Google
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
