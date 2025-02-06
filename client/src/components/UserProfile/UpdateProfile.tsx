import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import "./StyleProfile.css"; // Reuse the same CSS file for consistency

// GraphQL Mutation for saving profile
const SAVE_PROFILE = gql`
  mutation SaveProfile(
    $name: String!
    $email: String!
    $picture: String
    $address: String
    $cards: [String]!
    $username: String!
  ) {
    saveProfile(
      name: $name
      email: $email
      picture: $picture
      address: $address
      cards: $cards
      username: $username
    ) {
      name
      email
      picture
      address
      cards
      username
    }
  }
`;

const UpdateProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    picture: "",
    address: "",
    cards: [] as string[],
    username: "",
  });

  const [newCard, setNewCard] = useState<string>(""); // State to manage new card input
  const [saveProfile] = useMutation(SAVE_PROFILE);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCard(e.target.value);
  };

  const addCard = () => {
    // Validate card number length (16 digits)
    if (newCard.trim().length !== 16 || isNaN(Number(newCard))) {
      alert("Card number must be exactly 16 digits.");
      return;
    }

    setProfile((prevProfile) => ({
      ...prevProfile,
      cards: [...prevProfile.cards, newCard],
    }));

    setNewCard(""); // Clear the card input field
  };

  const removeCard = (index: number) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      cards: prevProfile.cards.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      await saveProfile({ variables: profile });
      navigate("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="profile-container"> {/* Centering wrapper */}
      <div className="upc">
        <div className="gradiant"></div>
        <div className="profile-down">
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "1.5rem",
            }}
          >
            Update Account Details
          </h1>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={profile.username}
              onChange={(e) => handleChange(e, "username")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={profile.name}
              onChange={(e) => handleChange(e, "name")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={profile.email}
              onChange={(e) => handleChange(e, "email")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Picture URL
            </label>
            <input
              type="text"
              placeholder="Enter picture URL"
              value={profile.picture}
              onChange={(e) => handleChange(e, "picture")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={profile.address}
              onChange={(e) => handleChange(e, "address")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Add a Credit Card
            </label>
            <input
              type="text"
              placeholder="Enter card number"
              value={newCard}
              onChange={handleCardChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
            />
            <button
              type="button"
              onClick={addCard} className="profile-button"
            >
              Add Card
            </button>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Your Cards
            </label>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {profile.cards.map((card, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>**** **** **** {card.slice(-4)}</span>{" "}
                  {/* Show only the last 4 digits */}
                  <button
                    type="button"
                    onClick={() => removeCard(index)} className="profile-button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleSave} className="profile-button"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
