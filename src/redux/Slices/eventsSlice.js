// store/eventsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    scheduledEvents: [],
    
    status: 'idle',
    error: null,
  },
  reducers: {
    scheduleEventStart: (state) => {
        state.status = 'loading';
    },
    scheduleEventSuccess: (state, action) => {
      console.log(action.payload.name)
      state.scheduledEvents.push(action.payload.name);
    
    },
    scheduleEventFailure: (state, action) => {
      state.error = action.payload;
    },
    getScheduledEventsStart: (state) => {
        state.status = 'loading' ;
    },
    getScheduledEventsSuccess: (state, action) => {
     //  state.scheduledEvents = action.payload;
    },
    getScheduledEventsFailure: (state, action) => {
      state.error = action.payload;
    },
    
  },
});

export const {
  scheduleEventSuccess,
  scheduleEventStart,
  scheduleEventFailure,
getScheduledEventsStart,
  getScheduledEventsSuccess,
  getScheduledEventsFailure,
  addNotification,
} = eventsSlice.actions;

export default eventsSlice.reducer;
