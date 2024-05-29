import React from "react";
import { IoIosClose } from "react-icons/io";

const SignUp = () => {
  return (
    <div className="overlay">
      <div className="form-container">
        <h2>Sign Up <IoIosClose className="close-icon"/></h2>
        <form action="#">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          <label htmlFor="confirm">Confirm</label>
          <input type="password" id="confirm" />
          <input type="submit" value="Sign Up" className="btn"/>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
