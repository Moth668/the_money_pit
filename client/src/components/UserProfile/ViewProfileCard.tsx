import React from "react";
import "./StyleProfile.css";
import { useNavigate } from "react-router-dom";
import { gql } from "graphql-tag";
import { useQuery } from "@apollo/client";
import favicon from "../../../../assets/Adobe Express - file.png";

const GET_PROFILE = gql`
  query GET_PROFILE($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      picture
      address
      cards
      monthlyIncome {
        month
        income
      }
      monthlyExpenses {
        month
        category
        expense
      }
      currentSavings {
        month
        savings
      }
      currentInvestments {
        month
        investment
      }
    }
  }
`;

// const IS_LOGGED_IN = gql`
//   query IsLoggedIn {
//     isLoggedIn
//   }
// `;

const ViewProfileCard: React.FC = () => {
  const mockProfileData = {
    name: "John Sow",
    email: "moneypig@example.com",
    picture: favicon,
    address: "5505 Farnam St, Omaha, NE 68132",
    username: "Money_Pig668",
  };

  // const { data: loginData, loading: loginLoading } = useQuery(IS_LOGGED_IN);
  const dummyUserId = "000000000000000000000001";
  const { data: profileData, loading: profileLoading } = useQuery(GET_PROFILE, {
    variables: { id: dummyUserId }, // ✅ Match the query's variable
  });
  const navigate = useNavigate();

  if (profileLoading) return <p>Loading...</p>;

  console.log("profileData: ", profileData);
  console.log("GraphQL Response: ", JSON.stringify(profileData, null, 2));

  const { name, email, picture, address, username } =
    profileData?.user || mockProfileData;

  return (
    <div className="profile-container">
      <div className="upc">
        <div className="gradiant"></div>
        <div className="profile-down">
          <img src={picture} alt="profile picture" />
          <div className="profile-title">{username}</div>
          <div className="profile-description">
            <p>
              <strong>Name</strong>: {name}
            </p>
            <p>
              <strong>Email</strong>: {email}
            </p>
            <p>
              <strong>Address</strong>: {address}
            </p>
          </div>

          <div className="profile-buttons-container">
            <button className="profile-button">
              <a href="/update-profile">Update Profile</a>
            </button>

            <button
              className="profile-button"
              onClick={() => navigate("/Wallet")}
            >
              View Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileCard;
