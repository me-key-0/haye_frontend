// src/redux/Slices/placesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { addFavorite, removeFavorite } from './userSlice';

const initialState = {
  allPlaces: [],
  place: null,
  favorites: [],
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
    addPlaceToFavorite(state, action) {
      const placeName = action.payload;
      //console.log(placeId)
      const place = state.allPlaces.find(p => p.name === placeName);
      if (place) {
        place.isFavorited = true;
        // Dispatch action to update user slice
        addFavorite({ id: placeName, ...place}); 
      }
    },
    removePlaceFromFavorite(state, action) {
      const placeId = action.payload;
      const place = state.places.find(p => p.id === placeId);
      if (place) {
        place.isFavorite = false;
        // Dispatch action to update user slice
        removeFavorite(placeId);
      }
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
  fetchPlaceByIdFailure,
  addPlaceToFavorite,
  removePlaceFromFavorite,
  fetchUserFavoritesStart,
  fetchUserFavoritesSuccess,
  fetchUserFavoritesFailure

} = placesSlice.actions;

export default placesSlice.reducer;

