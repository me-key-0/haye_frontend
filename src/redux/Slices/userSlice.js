import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    token: null,
    currentUser: null,
    favorites: [],
    status: 'idle', // standardized status: 'idle' | 'loading' | 'succeeded' | 'failed'

    error: null,
  },
  reducers: {
    
    fetchUserProfileStart(state) {
      state.status = "loading";
    },
    fetchUserProfileSuccess(state, action) {
      state.status = "succeeded";
      state.profile = action.payload;
    },
    fetchUserProfileFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    // Favorites fetch actions

     addFavorite : (state, action) => {
    
      const isFavorite = state.favorites.find(fav => fav === action.payload.name);

      //console.log(action.payload.name)
      //console.log(isFavorite)

      if (!isFavorite) {
        state.favorites.push(action.payload.name);
      }

    
    }
    ,
    
    removeFavorite(state, action) {
      
      state.favorites = state.favorites.filter(fav => fav !== action.payload); // Filter out the item
    },
    
   
    updateUserProfileStart(state) {
      state.status = "loading";
    },
    updateUserProfileSuccess(state, action) {
      state.status = "succeeded";
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.error = null;
    },
    updateUserProfileFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    fetchUserFavoritesStart(state) {
      state.status = "loading";
    },
    fetchUserFavoritesSuccess(state) {
      state.status = "succeeded";
      // state.favorites = action.payload;
    },
    fetchUserFavoritesFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    fetchScheduledEventsStart(state) {
      state.status = "loading";
    },
    fetchScheduledEventsSuccess(state) {
      state.status = "succeeded";
      // state.scheduledEvents = action.payload;
    },
    fetchScheduledEventsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    setUserAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
  },

  fetchUserFavoritesStart(state) {
    state.status = 'loading';
  },
  fetchUserFavoritesSuccess(state, action) {
    state.status = 'succeeded';
    //state.favorites = action.payload;
  },
  fetchUserFavoritesFailure(state, action) {
    state.status = 'failed';
    state.error = action.payload;
  }, 
  fetchScheduledEventsStart(state) {
    state.status = 'loading';
  },
  fetchScheduledEventsSuccess(state, action) {
    state.status = 'succeeded';
    //state.scheduledEvents = action.payload;
  },
  fetchScheduledEventsFailure(state, action) {
    state.status = 'failed';
    state.error = action.payload;
  },
  setUserAuthenticated(state, action) {
    state.isAuthenticated = action.payload;
  },
  setCurrentUser(state,action) {

    state.currentUser = action.payload.user.user;
    state.isAuthenticated = true;
    state.token = action.payload.user.token
  }
}); 


export const {
  
  fetchUserProfileStart,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  fetchUserFavoritesStart,
  fetchUserFavoritesSuccess,
  fetchUserFavoritesFailure,
  updateUserProfileStart,
  updateUserProfileSuccess,
  updateUserProfileFailure,
  fetchScheduledEventsStart,
  fetchScheduledEventsSuccess,
  fetchScheduledEventsFailure,
  setUserAuthenticated,
  setCurrentUser,
  addFavorite,
  removeFavorite,
} = userSlice.actions;

export default userSlice.reducer;
