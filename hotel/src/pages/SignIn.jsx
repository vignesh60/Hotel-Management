import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import $ from "jquery";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { PiWarningOctagonBold } from "react-icons/pi";
import axios from "axios";

const SignIn = () => {
  const [overlay, setOverlay] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const parts = location.pathname.split("/");
  const wordAfterLastSlash = parts[parts.length - 1];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const res = await axios.post('http://localhost:5000/login', {
              email: formData.email,
              password: formData.password
          });
          localStorage.setItem('isLogin','true');
          localStorage.setItem('email',formData.email);
          alert('Login successful');
          window.location.reload();
      } catch (error) {
          //console.error(error.response.data);
          setError("User not found");
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
              {error && (
                <p className="form_error-message">
                  {error} <PiWarningOctagonBold style={{ fontSize: "1rem" }} />
                </p>
              )}
              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <small>
                If you don't have an account?{" "}
                <Link to="/signup" style={{ color: "blue" }}>
                  Sign up
                </Link>
              </small>
              <input type="submit" value="Sign In" className="btn" />
              <button className="btn" style={{ marginTop: "-0.4rem" }}>
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
