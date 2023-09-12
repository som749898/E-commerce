import {NavLink} from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { useContext } from "react";

import coverImage from "../../Images/06. signup.png";
import "./Signup.css";
import { LoginContext } from "../../Context/LoginContext";

export const Signup = () => {
  const {loginState} = useContext(LoginContext);

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
      <img src={coverImage} alt="cover" />
    </div>
    <div className="signup-contain">
      <div className="signup-detail">
        <div className="signup-header">
          <h1>Sign up</h1>
          <div>Sign up to access all features</div>
        </div>
        <div className="signup-data">
          <label className="signup-field">
            <div>Full name</div>
            <div className="signup-input">
              <input placeholder="First name Last name" type="text" />
              <BsFillPersonFill className="signup-icon"/>
            </div>
          </label>
          <label className="signup-field">
            <div>Email</div>
            <div className="signup-input">
              <input placeholder="Enter your email address" type="text" />
              <MdEmail className="signup-icon"/>
            </div>
          </label>
          <label className="signup-field">
            <div>Username</div>
            <div className="signup-input">
              <input placeholder="create a unique username" type="text" />
              <BsFillPersonFill className="signup-icon"/>
            </div>
          </label>
          <label className="signup-field">
            <div>Create a strong Password</div>
            <div className="signup-input">
              <input placeholder="*************" type="text" />
              <FaKey className="signup-icon"/>
            </div>
          </label>
        </div>
        <button className="sign-btn" onClick={getToken}>Sign up</button>
        <div className="sign-account">Already have an account? <NavLink to="/login" className="signup-login">Log in</NavLink></div>
      </div>
    </div>
  </div>
}