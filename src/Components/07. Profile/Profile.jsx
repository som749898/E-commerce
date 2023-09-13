import "./Profile.css";
import { LoginContext } from "../../Context/LoginContext";
import { BookContext } from "../../Context/BookContext";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileInfo = () => {
  const info = JSON.parse(localStorage.getItem("info"));
  const {loginDispatch} = useContext(LoginContext);
  const navigate = useNavigate();
  const {dispatch} = useContext(BookContext);
  const clickHandler = () => {
    navigate("/");
    localStorage.removeItem('token');
    localStorage.removeItem('info');
    loginDispatch({type: "LOGOUT"});
    dispatch({type: "RESET"});
  }
  return <div>
    <div className="profile-header">Profile Information</div>
    <div className="profile-contains">
      <div><span>Name </span>{`- ${info.firstName} ${info.lastName}`}</div>
      <div><span>Email </span>{`- ${info.email}`}</div>
    </div>
    <br/>
    <button className="profile-btn" onClick={clickHandler}>Log Out</button>
  </div>
}