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
    <div className="upc">
      {cards && cards.length > 0 ? (
        <p>Cards: {cards.join(", ")}</p>
      ) : (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            borderRadius: "5px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          <p>No cards available</p>
          <button
            style={{
              padding: "8px",
              backgroundColor: "#28a745",
              color: "#FFF",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/add-card")}
          >
            Add a Card
          </button>
        </div>
      )}

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

  )
};

export default ViewWallet;
