import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js"; // Adjust the path as needed

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/moneyPitDB", {})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use a fixed ObjectId (24-character hex string) for the dummy user.
const dummyObjectId = new mongoose.Types.ObjectId("000000000000000000000001");

// Define 12 months for one year.
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// Generate monthlyIncome: starting at 5000, increasing by 50 each month.
const monthlyIncome = months.map((month) => ({
  month,
  income: Math.floor(100 + Math.random() * 5000),
}));

// Define several expense categories.
const expenseCategories = [
  "Food",
  "Rent",
  "Utilities",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Education"
];

// Generate monthlyExpenses: for each month, create one expense record per category with a random amount.
let monthlyExpenses: any = [];
months.forEach((month) => {
  expenseCategories.forEach((category) => {
    const expense = Math.floor(100 + Math.random() * 1400);
    monthlyExpenses.push({ month, category, expense });
  });
});

// Generate currentSavings: starting at 1500, increasing by 30 each month.
const currentSavings = months.map((month, index) => ({
  month,
  savings: 1500 + index * 30,
}));

// Generate currentInvestments: starting at 3000, increasing by 40 each month.
const currentInvestments = months.map((month, index) => ({
  month,
  investment: 3000 + index * 40,
}));

const seedUsers = new User(
  {
    _id: dummyObjectId,
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    password: "securepassword", // In production, this should be hashed.
    monthlyIncome,
    monthlyExpenses,
    currentSavings,
    currentInvestments,
  },
);

const seedDB = async () => {
  try {
    await User.deleteMany();
    await seedUsers.save();
    console.log("Database Seeded Successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

seedDB();
