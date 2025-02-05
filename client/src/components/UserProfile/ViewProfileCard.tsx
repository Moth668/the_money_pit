import React from "react";
import "./StyleProfile.css";
import { useNavigate } from "react-router-dom";
import { gql } from "graphql-tag";
import { useQuery } from "@apollo/client";

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
    name: "John Doe",
    email: "johndoe@example.com",
    picture: "https://via.placeholder.com/150",
    address: "1234 Elm Street",
    username: "johndoe",
  };
  

    // const { data: loginData, loading: loginLoading } = useQuery(IS_LOGGED_IN);
    const dummyUserId = "000000000000000000000001";
    const { data: profileData, loading: profileLoading } = useQuery(GET_PROFILE, {
        variables: { id: dummyUserId },  // ✅ Match the query's variable
      });  
    const navigate = useNavigate();
  
    // if (loginLoading || profileLoading) return <p>Loading...</p>;
    if ( profileLoading) return <p>Loading...</p>;
  
    console.log("profileData: ", profileData)
    console.log("GraphQL Response: ", JSON.stringify(profileData, null, 2));

    // if (!loginData?.isLoggedIn) {
    //   navigate("/login");
    //   return null;
    // }
  
    const { name, email, picture, address, username } = profileData?.user || mockProfileData;
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
          <a href="/update-profile">Update Profile</a>
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
