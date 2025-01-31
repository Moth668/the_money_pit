// import React from "react";
import "./StyleProfile.css";
import profile_icon from "../assets/Elon_Musk.jpg";


const ViewProfile = () => {
  return (
    <div className="upc">
      <div className="gradiant"></div>
      <div className="profile-down">
        <img src={profile_icon} alt="" />
        <div className="profile-title">Username</div>
        <div className="profile-description">
          <ul>
            <li>Name: Elon Musk</li>
            <li>Email: musky@gmail.com</li>
            <li>Address: 1234 rich guy rd</li>
          </ul>
          
        </div>


        <div className="profile-button">
          <a href="./UpdateProfile.tsx">Update Profile</a>
        </div>
        <div className="profile-button">
          <a href="./Wallet.tsx">View Wallet</a>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
