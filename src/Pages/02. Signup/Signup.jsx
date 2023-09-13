import {NavLink} from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import coverImage from "../../Images/06. signup.png";
import "./Signup.css";
import { LoginContext } from "../../Context/LoginContext";

export const Signup = () => {
  const {loginState, loginDispatch} = useContext(LoginContext);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const getToken = async () => {
    const credentials = {
      email: loginState.email,
      password: loginState.password,
      firstName: loginState.firstName,
      lastName: loginState.lastName,
    }
    try {
      const generateToken = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(credentials)
      }).then(res => res.json())
      localStorage.setItem("token",generateToken.encodedToken);
      localStorage.setItem("info", JSON.stringify(generateToken.createdUser));
    }catch(error) {
      console.log(error);
    }
  }

  const handleClick = async () => {
    if(loginState.firstName.length !== 0 && loginState.lastName.length !== 0 && loginState.email.length !== 0 && loginState.password.length !== 0) {
      try {
        await getToken();
        loginDispatch({ type: "LOGIN" });
        navigate("/");
        loginDispatch({ type: "RESET" });
      } catch (error) {
        toast.error('Error when fetching');
      }
    }else {
      toast.error('Invalid data');
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
            <div>First Name</div>
            <div className="signup-input">
              <input onChange={(e) => loginDispatch({type: "FIRST_NAME", payload: e.target.value})} placeholder="Enter your first name" type="text" />
              <BsFillPersonFill className="signup-icon"/>
            </div>
          </label>
          <label className="signup-field">
            <div>Last Name</div>
            <div className="signup-input">
              <input onChange={(e) => loginDispatch({type: "LAST_NAME", payload: e.target.value})} placeholder="Enter your second name" type="text" />
              <BsFillPersonFill className="signup-icon"/>
            </div>
          </label>
          <label className="signup-field">
            <div>Email</div>
            <div className="signup-input">
              <input onChange={(e) => loginDispatch({type: "EMAIL", payload: e.target.value})} placeholder="Enter your email address" type="text" />
              <MdEmail className="signup-icon"/>
            </div>
          </label>
          <label className="signup-field">
            <div>Create a strong Password</div>
            <div className="signup-input">
              <input onChange={(e) => loginDispatch({type: "PASSWORD", payload: e.target.value})} placeholder="Enter your password" type={isVisible ? "text" : "password"} />
              {
                isVisible ? <AiFillEye onClick={() => setIsVisible(false)} className="signup-icon password-btn"/> : <AiFillEyeInvisible onClick={() => setIsVisible(true)} className="signup-icon password-btn"/>
              }
            </div>
          </label>
        </div>
        <button className="sign-btn" onClick={handleClick}>Sign up</button>
        <div className="sign-account">Already have an account? <NavLink to="/login" className="signup-login"><span onClick={() => loginDispatch({type: "RESET"})}>Log in</span></NavLink></div>
      </div>
    </div>
    <Toaster/>
  </div>
}