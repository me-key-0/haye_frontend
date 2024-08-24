// src/redux/Slices/placesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allPlaces: [],
  place: null,
  loading: false,
  error: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    searchPlacesRequest: (state) => {
      state.loading = true;
    },
    searchPlacesSuccess: (state, action) => {
      state.loading = false;
      state.allPlaces = action.payload;
    },
    searchPlacesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllPlacesRequest(state) {
      state.loading = true;
    },
    fetchAllPlacesSuccess(state, action) {
      state.loading = false;
      state.allPlaces = action.payload;
    },
    fetchAllPlacesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPlaceByIdRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPlaceByIdSuccess(state, action) {
      state.loading = false;
      state.place = action.payload;
    },
    setAllPlaces(state, action) {
      state.allPlaces = action.payload;
    },
  },
});

export const {
  fetchAllPlacesRequest,
  fetchAllPlacesSuccess,
  fetchAllPlacesFailure,
  setAllPlaces,
  searchPlacesRequest, 
  searchPlacesSuccess, 
  searchPlacesFailure,
  fetchPlaceByIdRequest,
  fetchPlaceByIdSuccess,
  fetchPlaceByIdFailure
} = placesSlice.actions;

export default placesSlice.reducer;

