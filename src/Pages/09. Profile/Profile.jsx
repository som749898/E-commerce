import "./Profile.css"
import {Header} from "../../Components/01. Header/Header";
import { ProfileInfo } from "../../Components/07. Profile/Profile";
import { Address } from "../../Components/08. Address/Address";
import { useState } from "react";

export const Profile = () => {
  const [show, setShow] = useState("profile");
  const activeStyle = (text) => {
    return text === show ? "profile-active" : "";
  }
  return <div>
    <Header/>
    <div className="profile-nav">
      <div className={activeStyle("profile")} onClick={() => setShow("profile")}>Profile</div>
      <div className={activeStyle("address")} onClick={() => setShow("address")}>Address</div>
      <div className={activeStyle("orders")}>Orders</div>
    </div>
    {
      show === "profile" && <ProfileInfo/>
    }
    {
      show === "address" && <Address/>
    }
  </div>
}