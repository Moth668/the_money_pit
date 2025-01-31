import React from "react";
import "./StyleProfile.css";
import profile_icon from "../assets/Elon_Musk.jpg";

const ViewProfile = () => {
  return (
    <div className="upc">
      <div className="gradiant"></div>
      <div className="profile-down">
        <img src={profile_icon} alt="" />
        <div className="profile-title">Elon Musk</div>
        <div className="profile-description">
          I am a businessman and political figure known for my key roles in the
          automotive company Tesla, Inc. and the space company SpaceX.
        </div>
        <div className="profile-button">
          <a href="./UpdateProfile.tsx">Update Profile</a>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
