import {NavLink} from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";

import coverImage from "../../Images/07. login.png";
import "./Login.css";

export const Login = () => {
  const getToken = async () => {
    const credentials = {
      email: "adarshbalika@gmail.com",
      password: "adarshbalika"
    }
    try {
      const generateToken = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials)
      }).then(res => res.json())
      localStorage.setItem("token",generateToken.encodedToken);
    } catch(e) {
      console.log(e)
    }
  }
  return <div className="signup">
    <div className="signup-img">
      <img className="login-img" src={coverImage} alt="cover" />
    </div>
    <div className="signup-contain">
      <div className="signup-detail">
        <div className="signup-header">
          <h1>Login</h1>
          <div>Login to access all features</div>
        </div>
        <div className="signup-data">
          <label className="signup-field">
            <div>Email</div>
            <div className="signup-input">
              <input placeholder="Enter your email address" type="text" />
              <MdEmail className="signup-icon"/>
            </div>
          </label>
          <label className="signup-field">
            <div>Password</div>
            <div className="signup-input">
              <input placeholder="Enter your password" type="text" />
              <FaKey className="signup-icon"/>
            </div>
          </label>
        </div>
        <button className="sign-btn" onClick={getToken}>Log in</button>
        <div className="sign-account">Don't have an account? <NavLink to="/signup" className="signup-login">Sign Up</NavLink></div>
      </div>
    </div>
  </div>
}