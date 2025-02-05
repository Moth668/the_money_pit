import React from "react";
import "./StyleProfile.css";
import { useNavigate } from "react-router-dom";
import { gql } from "graphql-tag";
import { useQuery } from "@apollo/client";

const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      name
      email
      picture
      address
      cards
      username
    }
  }
`;

const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn
  }
`;

const ViewProfileCard: React.FC = () => {
    const { data: loginData, loading: loginLoading } = useQuery(IS_LOGGED_IN);
    const { data: profileData, loading: profileLoading } = useQuery(GET_PROFILE);
    const navigate = useNavigate();
  
    if (loginLoading || profileLoading) return <p>Loading...</p>;
  
    if (!loginData?.isLoggedIn) {
      navigate("/LoginForm");
      return null;
    }
  
    const { name, email, picture, address, username } = profileData?.getProfile || {};
  return (
    <div className="upc">
      <div className="gradiant"></div>
      <div className="profile-down">
        <img src={picture} alt="profile picture" />
        <div className="profile-title">{username}</div>
        <div className="profile-description">
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
        </div>


        <div className="profile-button">
          <a href="./UpdateProfile.tsx">Update Profile</a>
        </div>
        <button className="profile-button"
        onClick={() => navigate("/Wallet")}
      >
        View Wallet
      </button>
      </div>
    </div>
  );
};

export default ViewProfileCard;
