import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

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

const ViewProfile: React.FC = () => {
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

  if (!profileData?.user) {
    console.error("User data is missing:", profileData);
    return <p>Error: No profile data found.</p>;
  }

  // if (!loginData?.isLoggedIn) {
  //   navigate("/LoginForm");
  //   return null;
  // }

  const { name, email, picture, address, cards, username } = profileData?.user || {};

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "20px auto" }}>
      <h1>Welcome, {username}</h1>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Address: {address}</p>
      <p>Cards: {cards ? cards.join(", ") : "No cards available"}</p>
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
  );
};

export default ViewProfile;
