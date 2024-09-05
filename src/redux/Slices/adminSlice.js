import { createSlice } from '@reduxjs/toolkit';
//import { fetchAllPlaces, addPlace, updatePlace, deletePlace, fetchAllEvents, addEvent, updateEvent, deleteEvent } from '../api/adminApi'; // Assume these API functions exist

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    places: [],
    events: [],
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchPlacesStart(state) {
      state.status = 'loading';
    },
    fetchPlacesSuccess(state, action) {
      state.status = 'succeeded';
      state.places = action.payload;
    },
    fetchPlacesFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    addPlaceStart(state) {
      state.status = 'loading';
    },
    addPlaceSuccess(state, action) {
      state.status = 'succeeded';
      state.places.push(action.payload);
    },
    addPlaceFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    deletePlaceStart(state) {
      state.status = 'loading';
    },
    deletePlaceSuccess(state, action) {
      state.status = 'succeeded';
      state.places = state.places.filter(place => place.id !== action.payload);
    },
    deletePlaceFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    fetchEventsStart(state) {
      state.status = 'loading';
    },
    fetchEventsSuccess(state, action) {
      state.status = 'succeeded';
      state.events = action.payload;
    },
    fetchEventsFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    addEventStart(state) {
      state.status = 'loading';
    },
    addEventSuccess(state, action) {
      state.status = 'succeeded';
      state.events.push(action.payload);
    },
    addEventFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    deleteEventStart(state) {
      state.status = 'loading';
    },
    deleteEventSuccess(state, action) {
      state.status = 'succeeded';
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    deleteEventFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    updatePlaceStart: (state) => {
      state.status = 'loading';
    },
    updatePlaceSuccess: (state, action) => {
      state.status = 'succeeded';
      const updatedPlace = action.payload;
      const index = state.places.findIndex((place) => place.id === updatedPlace.id);
      if (index !== -1) {
        state.places[index] = updatedPlace;
      }
    },
    updatePlaceFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },

    // For updating events
    updateEventStart: (state) => {
      state.status = 'loading';
    },
    updateEventSuccess: (state, action) => {
      state.status = 'succeeded';
      const updatedEvent = action.payload;
      const index = state.events.findIndex((event) => event.id === updatedEvent.id);
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    },
    updateEventFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

    
 

export const {
  fetchPlacesStart, fetchPlacesSuccess, fetchPlacesFailure,
  addPlaceStart, addPlaceSuccess, addPlaceFailure,
  deletePlaceStart, deletePlaceSuccess, deletePlaceFailure,
  updatePlaceStart, updatePlaceSuccess, updatePlaceFailure,
  updateEventStart,updateEventSuccess, updateEventFailure,
  fetchEventsStart, fetchEventsSuccess, fetchEventsFailure,
  addEventStart, addEventSuccess, addEventFailure,
  deleteEventStart, deleteEventSuccess, deleteEventFailure,
} = adminSlice.actions;

export default adminSlice.reducer;
