// utils/queries.ts

import axios from "axios";

// Define the API endpoint
const API_ENDPOINT = "http://localhost:5173/profile"; // Replace with your actual API endpoint

/**
 * Fetch the profile data for the current user.
 * @returns A promise that resolves to the user's profile data.
 */
export const fetchProfileData = async (): Promise<{
  name: string;
  email: string;
  picture: string;
  address: string;
  cards: string[];
  username: string;
}> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/profile`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};

/**
 * Fetch the user's transaction history or related data.
 * @returns A promise that resolves to the transaction history.
 */
interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
}

export const fetchTransactionHistory = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/transactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    throw error;
  }
};

/**
 * Check the status of the user session.
 * @returns A promise that resolves to the session status.
 */
export const fetchSessionStatus = async (): Promise<{
  isLoggedIn: boolean;
}> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/session`);
    return response.data;
  } catch (error) {
    console.error("Error fetching session status:", error);
    throw error;
  }
};
