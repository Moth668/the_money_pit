import React, { useState } from "react";

type ProfileData = {
  name: string;
  email: string;
  picture: string;
  address: string;
  cards: string[]; // Represents the user's list of credit cards
  username: string;
};

const PersonalProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    picture: "",
    address: "",
    cards: [],
    username: "",
  });

  const [newCard, setNewCard] = useState<string>(""); // For managing new card input

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ProfileData
  ) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCard(e.target.value);
  };

  const addCard = () => {
    if (newCard.trim() === "") {
      alert("Card number cannot be empty.");
      return;
    }

    setProfile((prevProfile) => ({
      ...prevProfile,
      cards: [...prevProfile.cards, newCard],
    }));

    setNewCard(""); // Clear the input field after adding the card
  };

  const removeCard = (index: number) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      cards: prevProfile.cards.filter((_, i) => i !== index),
    }));
  };

  const saveProfile = () => {
    console.log("Profile saved:", profile);
  };

  const uploadPhoto = () => {
    console.log("Photo uploaded");
  };

  const logOut = () => {
    console.log("Logged out");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "50px",
        border: "2px solid #ccc",
        borderRadius: "15px",
        backgroundColor: "#f9f9f9",
        color: "#333",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Personal Profile
      </h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={profile.name}
            onChange={(e) => handleInputChange(e, "name")}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={profile.username}
            onChange={(e) => handleInputChange(e, "username")}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={profile.email}
            onChange={(e) => handleInputChange(e, "email")}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Physical Address
          </label>
          <input
            type="text"
            placeholder="Enter your physical address"
            value={profile.address}
            onChange={(e) => handleInputChange(e, "address")}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
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
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            type="button"
            onClick={addCard}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
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
              <li key={index} style={{ marginBottom: "8px" }}>
                {card}{" "}
                <button
                  type="button"
                  onClick={() => removeCard(index)}
                  style={{
                    marginLeft: "10px",
                    padding: "4px 8px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            type="button"
            onClick={uploadPhoto}
            style={{
              padding: "10px 20px",
              margin: "10px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Upload Profile Picture
          </button>
          <button
            type="button"
            onClick={saveProfile}
            style={{
              padding: "10px 20px",
              margin: "10px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save Profile
          </button>
          <button
            type="button"
            onClick={logOut}
            style={{
              padding: "10px 20px",
              margin: "10px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Log Out
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalProfile;
