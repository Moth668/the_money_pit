import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import "./StyleProfile.css"; // Reuse the same CSS file for consistency

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

  // Redirect to login if not logged in
  if (!loginLoading && !loginData?.isLoggedIn) {
    navigate("/LoginForm");
    return null;
  }

  // Show loading indicator while data is being fetched
  if (loginLoading || profileLoading) return <p>Loading...</p>;

  const { name, picture, cards }: { name: string; picture: string; cards: string[] } = profileData?.getProfile || { cards: [] };

  return (
    <div className="upc">
      <div className="gradiant"></div>
      <div className="profile-down">
        <h2 className="profile-title">Wallet</h2>
        <div className="profile-description">
          {picture && (
            <img
              src={picture}
              alt={`${name}'s profile`}
              className="profile-image"
            />
          )}
          <h3>Saved Cards</h3>
          <ul>
            {cards.length > 0 ? (
              cards.map((card: string, index: number) => (
                <li key={index}>
                  **** **** **** {card.slice(-4)}
                </li>
              ))
            ) : (
              <p>No cards added yet.</p>
            )}
          </ul>
        </div>
        <button
          className="profile-button"
          onClick={() => navigate("/UpdateProfile")}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ViewWallet;
