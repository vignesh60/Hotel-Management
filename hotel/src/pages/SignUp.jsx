import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import $ from "jquery";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiWarningOctagonBold } from "react-icons/pi";
import axios from "axios";

const SignUp = () => {
  const [overlay, setOverlay] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const parts = location.pathname.split("/");
  const wordAfterLastSlash = parts[parts.length - 1];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Password mismatch. Please check your password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log(res.data);
      alert("Registration successful");
    } catch (error) {
      console.error(error.response.data);
      alert("Registration failed");
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
              Sign Up{" "}
              <IoIosClose className="close-icon" onClick={() => closeForm()} />
            </h2>
            <form onSubmit={handleSubmit}>
              {error && (
                <p className="form_error-message">
                  {error} <PiWarningOctagonBold style={{ fontSize: "1rem" }} />
                </p>
              )}
              <div className="input-box">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
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
              <div className="input-box">
                <label htmlFor="confirm">Confirm password</label>
                <input
                  type="password"
                  name="password2"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <small>
                Already have an account?{" "}
                <Link to="/signin" style={{ color: "blue" }}>
                  Sign in
                </Link>
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
