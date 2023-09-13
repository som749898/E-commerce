import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useContext, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

import coverImage from "../../Images/07. login.png";
import "./Login.css";
import { LoginContext } from "../../Context/LoginContext";
import { BookContext } from "../../Context/BookContext";


export const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {loginState,loginDispatch} = useContext(LoginContext);
  const {dispatch} = useContext(BookContext);

  const getToken = async () => {
    const credentials = {
      email: loginState.email,
      password: loginState.password
    }
    try {
      const generateToken = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials)
      }).then(res => res.json())
      localStorage.setItem("token",generateToken.encodedToken);
      localStorage.setItem("info", JSON.stringify(generateToken.foundUser));
      loginDispatch({type: "RESET"});
      generateToken.encodedToken ? await loadData() : toast.error('Incorrect Id or Password');
    } catch(e) {
      console.log(e)
    }
  }
  
  const loadData = async () => {
    const fetchBookData = () => {
      return new Promise( async(resolve, reject) => {
        try {
          const allCart = await fetch("/api/user/cart",{
            method: "GET",
            headers: {
              "authorization": localStorage.getItem("token"),
            },
          }).then(res => res.json());
          dispatch({type: "LOAD_CART", payload: { cart: allCart.cart}});
          resolve(allCart);
        }catch(error) {
          reject(error);
        }
      });
    }
    const myPromise = fetchBookData();
    toast.promise(myPromise, {
      loading: 'loading previous saved data',
      success: 'Login successfull',
      error: 'Error when fetching data',
    });
    try {
      const allWishlist = await fetch("/api/user/wishlist", {
        method: "GET",
        headers: {
          "authorization": localStorage.getItem("token"),
        },
      }).then(res => res.json());
      dispatch({type: "LOAD_WISHLIST", payload: { wishlist: allWishlist.wishlist  }});

      loginDispatch({type: "LOGIN"});
      location.state ? navigate(location?.state?.from?.pathname) : navigate("/");
    }catch(error) {
      console.log(error);
    }
  }

  const handleClick = () => {
    getToken();
  }

  const testClick = async () => {
    const credentials = {
      email: "manishbiswal@gmail.com",
      password: "password"
    }
    try {
      const generateToken = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials)
      }).then(res => res.json())
      localStorage.setItem("token",generateToken.encodedToken);
      localStorage.setItem("info", JSON.stringify(generateToken.foundUser));
      loginDispatch({type: "RESET"});
      await loadData();
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
              <input onChange={(e) => loginDispatch({type: "EMAIL", payload: e.target.value})} placeholder="Enter your email address" type="text" />
              <MdEmail className="signup-icon test"/>
            </div>
          </label>
          <label className="signup-field">
            <div>Password</div>
            <div className="signup-input">
              <input onChange={(e) => loginDispatch({type: "PASSWORD", payload: e.target.value})} placeholder="Enter your password" type={isVisible ? "text" : "password"} />
              {
                isVisible ? <AiFillEye onClick={() => setIsVisible(false)} className="signup-icon password-btn"/> : <AiFillEyeInvisible onClick={() => setIsVisible(true)} className="signup-icon password-btn"/>
              }
            </div>
          </label>
        </div>
        <div className="login-btn">
          <button className="sign-btn" onClick={handleClick}>Log in</button>
          <button className="test-btn" onClick={testClick}>Test Credentials</button>
        </div>
        <div className="sign-account">Don't have an account? <NavLink to="/signup" className="signup-login"><span onClick={() => loginDispatch({type: "RESET"})}>Sign Up</span></NavLink></div>
      </div>
    </div>
    <Toaster/>
  </div>
}