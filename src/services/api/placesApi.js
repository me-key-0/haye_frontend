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

// Fetch a place by ID
export const fetchPlaceById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/places/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fetch place by ID error:', error);
    throw error;
  }
};

// Create a new place
export const createPlace = async (placeData, imageFile) => {
  const formData = new FormData();
  formData.append('name', placeData.name);
  formData.append('category', placeData.category);
  formData.append('priceRange', placeData.priceRange);
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post('/api/places', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Create place error:', error);
    throw error;
  }
};

// Update a place by ID
export const updatePlace = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/api/places/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Update place error:', error);
    throw error;
  }
};

// Delete a place by ID
export const deletePlace = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/places/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete place error:', error);
    throw error;
  }
};
