// redux/placesSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Places Slice and Actions
const placesSlice = createSlice({
  name: 'places',
  initialState: {
    allPlaces: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchAllPlacesRequest(state) {
      state.status = 'loading';
    },
    fetchAllPlacesSuccess(state, action) {
      state.status = 'succeeded';
      state.allPlaces = action.payload;
    },
    fetchAllPlacesFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllPlacesRequest,
  fetchAllPlacesSuccess,
  fetchAllPlacesFailure,
} = placesSlice.actions;

export default placesSlice.reducer;
