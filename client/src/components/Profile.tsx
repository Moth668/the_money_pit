import React, { useState } from "react";

type ProfileData = {
  name: string;
  email: string;
  picture: "",
  income: number;
  expenses: number;
};

const PersonalProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    picture: "",
    income: 0,
  expenses: 0
  });

   const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ProfileData
  ) => {
    const value = field === "income" || field === "expenses" ? +e.target.value : e.target.value;
    setProfile({ ...profile, [field]: value });
  };

  const saveProfile = () => {
    // Save profile data logic here (e.g., API call or localStorage)
    console.log("Profile saved:", profile);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>Personal Profile</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "medium", marginBottom: "8px" }}>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={profile.name}
            onChange={(e) => handleInputChange(e, "name")}
            style={{ width: "100%", padding: "8px", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "medium", marginBottom: "8px" }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={profile.email}
            onChange={(e) => handleInputChange(e, "email")}
            style={{ width: "100%", padding: "8px", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "medium", marginBottom: "8px" }}>Monthly Income</label>
          <input
            type="number"
            placeholder="Enter your monthly income"
            value={profile.income}
            onChange={(e) => handleInputChange(e, "income")}
            style={{ width: "100%", padding: "8px", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "medium", marginBottom: "8px" }}>Monthly Expenses</label>
          <input
            type="number"
            placeholder="Enter your monthly expenses"
            value={profile.expenses}
            onChange={(e) => handleInputChange(e, "expenses")}
            style={{ width: "100%", padding: "8px", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <button
          type="button"
          onClick={saveProfile}
          style={{ padding: "10px 20px", fontSize: "1rem", fontWeight: "bold", color: "#fff", backgroundColor: "#007BFF", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default PersonalProfile;