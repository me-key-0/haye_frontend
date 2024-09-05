import axiosInstance from './axiosInstance';

// Fetch all places
export const fetchAllPlaces = async () => {
  try {
    const response = await axiosInstance.get('/api/places');
    return response.data;
  } catch (error) {
    console.error('Fetch all places error:', error);
    throw error;
  }
};
export const searchPlaces = async (query, price, rating, location) => {
  try {
    const response = await axiosInstance.get('/places', {
      params: { query, price, rating, location },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch places');
  }
};

// Fetch a place by ID
export const fetchPlaceById = async (id) => {
  try {
    const response = await axiosInstance.get(`/places/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fetch place by ID error:', error);
    throw error;
  }
};

