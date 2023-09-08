import "./Profile.css"
import {Header} from "../../Components/01. Header/Header";

export const Profile = () => {
  const info = JSON.parse(localStorage.getItem("info"));
  console.log("info", info);
  return <div>
    <Header/>
    <div>
      <div className="profile-header">Profile Information</div>
      <div className="profile-contains">
        <div><span>Name </span>{`- ${info.firstName} ${info.lastName}`}</div>
        <div><span>Email </span>{`- ${info.email}`}</div>
      </div>
      <br/>
      <button className="profile-btn">Log Out</button>
    </div>
  </div>
}