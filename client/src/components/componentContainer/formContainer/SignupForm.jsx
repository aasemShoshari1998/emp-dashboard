import React, { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
function SignupForm() {
  const username = useRef();
  const password = useRef();
  const confirmPs = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSignup = async (e) => {
    if (username.current.value.length < 7) {
      setError("Username must be at least 7 characters in length");
    } else if (password.current.value.length < 7) {
      setError("Password must be at least 7 characters in length");
    } else if (password.current.value !== confirmPs.current.value) {
      setError("passwords do not match");
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
      };
      await fetch("emp-dashboard-api.vercel.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      dispatch({ type: "LOGIN" });
      const response = await fetch("emp-dashboard-api.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      dispatch({ type: "LOGIN_SUCCESS", payload: data });

      navigate("/");
    }
  };
  return (
    <div className="formContainer">
      <p className="error">{error}</p>
      <form className="form">
        <div className="row">
          <label htmlFor="">Username</label>
          <input
            type="text"
            ref={username}
            placeholder="Username"
            className="formInput"
          />
        </div>

        <div className="row">
          <label htmlFor="">Password</label>
          <input
            type="password"
            ref={password}
            placeholder="Password"
            className="formInput"
          />
        </div>
        <div className="row">
          <label htmlFor="">Confirm password</label>
          <input
            type="password"
            ref={confirmPs}
            placeholder="Confirm Password"
            className="formInput"
          />
        </div>

        <div className="row">
          <button type="button" className="btn" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
        <div className="row">
          <p className="register">
            Already have an account ? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
