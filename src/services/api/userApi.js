
import axiosInstance from './axiosInstance';

// Function to handle sign-in
export const signInUser = async (credentials) => {
  try {
    // POST request to the sign-in endpoint
    const response = await axiosInstance.post('/users/login', credentials);
    
    // Handle success
    return response.data; // This will include the access token and any other data from the backend
  } catch (error) {
    // Handle error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Backend error:', error.response.data);
      throw new Error(error.response.data.error || 'Server error');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error:', error.request);
      throw new Error('Network error');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      throw new Error('Error occurred');
    }
  }
};
