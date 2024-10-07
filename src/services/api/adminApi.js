// src/api/adminApi.js

import axiosInstance from './axiosInstance';

export const fetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching events: ' + error.message);
  }
};

// Fetch All Places

// Add New Place
export const addPlace = async (placeData) => {
  try {
    const response = await axiosInstance.post('/places', placeData);
    return response.data;
  } catch (error) {
    throw new Error('Error adding place: ' + error.message);
  }
};

// Delete Place
export const deletePlace = async (placeId) => {
  try {
    const response = await axiosInstance.delete(`/admin/places/${placeId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting place: ' + error.message);
  }
};
export const updatePlace = async (placeId, updatedPlaceData) => {
    try {
      const response = await axiosInstance.put(`/places/${placeId}`, updatedPlaceData);
      return response.data; // Assuming the response contains the updated place
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating place');
    }
  };

// Add New Event
export const addEvent = async (eventData) => {
  try {
    const response = await axiosInstance.post('/events', eventData);
    return response.data;
  } catch (error) {
    throw new Error('Error adding event: ' + error.message);
  }
};

// Delete Event
export const deleteEvent = async (eventId) => {
  try {
    const response = await axiosInstance.delete(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting event: ' + error.message);
  }
};

  
  // API to update an event
  export const updateEvent = async (eventId, updatedEventData) => {
    try {
      const response = await axiosInstance.put(`/admin/events/${eventId}`, updatedEventData);
      return response.data; // Assuming the response contains the updated event
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating event');
    }
  };