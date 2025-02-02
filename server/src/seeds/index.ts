import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js"; // Adjust the path as needed

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/moneyPitDB", {})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use a valid fixed ObjectId (24-character hex string)
const dummyObjectId = new mongoose.Types.ObjectId("000000000000000000000001");

const seedUsers = [
  {
    _id: dummyObjectId, // Fixed valid ObjectId
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    password: "securepassword", // In production, hash the password
    monthlyIncome: [
      { month: "January", income: 5000 },
      { month: "February", income: 5200 },
    ],
    monthlyExpenses: [
      { month: "January", expense: 2000 },
      { month: "February", expense: 2100 },
    ],
    currentSavings: [
      { month: "January", savings: 1500 },
      { month: "February", savings: 1600 },
    ],
    currentInvestments: [
      { month: "January", investment: 3000 },
      { month: "February", investment: 3200 },
    ],
  },
];

const seedDB = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(seedUsers);
    console.log("Database Seeded Successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

seedDB();
