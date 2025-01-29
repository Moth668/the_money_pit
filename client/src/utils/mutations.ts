// utils/mutations.ts

import axios from 'axios';

// Define the API endpoint
const API_ENDPOINT = 'http://localhost:3001/graphql'; // Replace with your actual API endpoint

/**
 * Save profile data to the server.
 * @param profile - The profile data to save.
 * @returns A promise that resolves to the server response.
 */
export const saveProfileData = async (profile: {
  name: string;
  email: string;
  picture: string;
  address: string;
  cards: string[];
  username: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/profile`, profile);
    return response.data;
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
};

/**
 * Upload a profile picture.
 * @param file - The picture file to upload.
 * @returns A promise that resolves to the uploaded file's URL or metadata.
 */
export const uploadProfilePicture = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_ENDPOINT}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.url; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

/**
 * Log out the current user.
 * @returns A promise that resolves when the user is logged out.
 */
export const logOutUser = async (): Promise<void> => {
  try {
    await axios.post(`${API_ENDPOINT}/logout`);
    console.log('Logged out successfully');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
