import "./Profile.css"

export const ProfileInfo = () => {
  const info = JSON.parse(localStorage.getItem("info"));
  return <div>
    <div className="profile-header">Profile Information</div>
    <div className="profile-contains">
      <div><span>Name </span>{`- ${info.firstName} ${info.lastName}`}</div>
      <div><span>Email </span>{`- ${info.email}`}</div>
    </div>
    <br/>
    <button className="profile-btn">Log Out</button>
  </div>
}