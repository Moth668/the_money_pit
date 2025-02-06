import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import "./StyleProfile.css"; // Reuse the same CSS file for consistency

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

const ViewWallet: React.FC = () => {
  // const { data: loginData, loading: loginLoading } = useQuery(IS_LOGGED_IN);
  const dummyUserId = "000000000000000000000001";
  const { data: profileData, loading: profileLoading } = useQuery(GET_PROFILE, {
    variables: { id: dummyUserId },  // ✅ Match the query's variable
  });
  const navigate = useNavigate();


  // if (loginLoading || profileLoading) return <p>Loading...</p>;
  if (profileLoading) return <p>Loading...</p>;

  console.log("profileData: ", profileData)
  console.log("GraphQL Response: ", JSON.stringify(profileData, null, 2));

  // if (!loginData?.isLoggedIn) {
  //   navigate("/login");
  //   return null;
  // }

  const { name, picture, cards, } = profileData?.user || {};
  return (
    <div className="wallet-container"> {/* Centering container */}
      <div className="upc">
        {cards && cards.length > 0 ? (
          <p>Cards: {cards.join(", ")}</p>
        ) : (
          <div className="no-cards-box">
            <p>No cards available</p>
            <button className="add-card-button" onClick={() => navigate("/add-card")}>
              Add a Card
            </button>
          </div>
        )}

        {picture && <img src={picture} alt={`${name}'s profile`} width="150" />}

        <button className="profile-button" onClick={() => navigate("/update-profile")}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ViewWallet;
