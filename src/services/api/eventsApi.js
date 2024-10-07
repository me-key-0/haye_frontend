import axiosInstance from './axiosInstance';

export const scheduleEventAPI = async (eventData) => {
  try {
    const response = await axiosInstance.post('/schedule', eventData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to schedule the event');
  }
};

export const getscheduledEventsAPI = async (userID) => {
  try {
    const response = await axiosInstance.get(`/users/schedule`, {
      params: { userID }, // Pass userID as a query parameter
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get scheduled events');
  }
};


export const fetchAllEventsAPI = async () => {
  try {
      const response = await axiosInstance.get('/events');
      return response.data;

  } catch (error) {
    throw new Error('Failed to fetch events')
  }
}