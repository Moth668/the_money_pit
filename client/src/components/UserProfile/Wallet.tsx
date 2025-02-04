import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

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

const ViewWallet: React.FC = () => {
  const { data: loginData, loading: loginLoading } = useQuery(IS_LOGGED_IN);
  const { data: profileData, loading: profileLoading } = useQuery(GET_PROFILE);
  const navigate = useNavigate();

  
  if (loginLoading || profileLoading) return <p>Loading...</p>;

  if (!loginData?.isLoggedIn) {
    navigate("/login");
    return null;
  }

  const { name, picture, cards, } = profileData?.getProfile || {};

<div className="upc">
<p>Cards: {cards.join(", ")}</p>
      {picture && <img src={picture} alt={`${name}'s profile`} width="150" />}
      <button
        style={{
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
        onClick={() => navigate("/update-profile")}
      >
        Update Profile
      </button>
    </div>
};

export default ViewWallet;