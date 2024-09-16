import axiosInstance from './axiosInstance';

export const scheduleEventAPI = async (eventData) => {
  try {
    const response = await axiosInstance.post('/users/schedule', eventData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to schedule the event');
  }
};
