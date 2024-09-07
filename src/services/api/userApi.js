import axiosInstance from "./axiosInstance";

// Function to handle sign-in
export const signInUser = async (credentials) => {
  try {

    
    const response = await axiosInstance.post('/users/login', credentials);
  
    console.log(response)

    return response.data; // This will include the access token and any other data from the backend
  } catch (error) {
    // Handle error
    if (error.response) {

      
      console.error('Backend error:', error.response.data.message);
      throw new Error(error.response.data.error || 'Server error');

    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network error:", error.request);
      throw new Error("Network error");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      throw new Error("Error occurred");
    }
  }
};

export const signUpUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/users/register", credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

export const signOutUser = () => {
  return axiosInstance.post('/users/logout'); // Call the backend logout endpoint
};

export const verifyOtp = async() => {
  try {
    const response = await axiosInstance.post('/users/register-user');
    console.log(response)
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
}

}

