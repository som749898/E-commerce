import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { useContext } from "react";
import toast, { Toaster } from 'react-hot-toast';

import coverImage from "../../Images/07. login.png";
import "./Login.css";
import { LoginContext } from "../../Context/LoginContext";
import { BookContext } from "../../Context/BookContext";


export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {loginDispatch} = useContext(LoginContext);
  const {dispatch} = useContext(BookContext);

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
      localStorage.setItem("info", JSON.stringify(generateToken.foundUser));
      
      await loadData();
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
        <button className="sign-btn" onClick={handleClick}>Log in</button>
        <div className="sign-account">Don't have an account? <NavLink to="/signup" className="signup-login">Sign Up</NavLink></div>
      </div>
    </div>
    <Toaster/>
  </div>
}