import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    currentUser: null,
    users: [],
    favorites: [],
    scheduledEvents: [],
    status: 'idle', // standardized status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Fetching all users
    fetchAllUsersRequest(state) {
      state.status = 'loading';
    },
    fetchAllUsersSuccess(state, action) {
      state.status = 'succeeded';
      state.users = action.payload;
    },
    fetchAllUsersFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    // Authentication actions
    googleSignInStart(state) {
      state.status = 'loading';
    },
    emailSignInStart(state) {
      state.status = 'loading';
    },
    signInSuccess(state, action) {
      state.status = 'succeeded';
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    signOutStart(state) {
      state.status = 'loading';
    },
    signOutSuccess(state) {
      state.status = 'succeeded';
      state.currentUser = null;
      state.error = null;
      state.favorites = [];
      state.scheduledEvents = [];
    },
    signOutFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    signUpStart(state) {
      state.status = 'loading';
    },
    signUpSuccess(state, action) {
      state.status = 'succeeded';
      state.currentUser = action.payload.currentUser;
      state.error = null;
    },
    signUpFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    verifyOtpStart(state) {
      state.status = 'loading';
    },
    verifyOtpSuccess(state, action) {
      state.status = 'succeeded';
      state.error = null;
      state.currentUser = action.payload;
    },
    verifyOtpFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    fetchUserProfileStart(state) {
      state.status = 'loading';
    },
    fetchUserProfileSuccess(state, action) {
      state.status = 'succeeded';
      state.profile = action.payload;
    },
    fetchUserProfileFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    // Favorites fetch actions
     addFavorite : (state, action) => {
      const isFavorite = state.favorites.some(fav => fav.id === action.payload.id);
      //console.log(action.payload.name)
      //console.log(isFavorite)

      if (!isFavorite) {
        state.favorites.push(action.payload.name);
      }
    
      //console.log("Updated state.favorites:", state.favorites);
    }
    ,
    
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload); // Filter out the item
    },
    
   
    updateUserProfileStart(state) {
      state.status = 'loading';
    },
    updateUserProfileSuccess(state, action) {
      state.status = 'succeeded';
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.error = null;
    },
    updateUserProfileFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
  },
  fetchUserFavoritesStart(state) {
    state.status = 'loading';
  },
  fetchUserFavoritesSuccess(state, action) {
    state.status = 'succeeded';
    state.favorites = action.payload;
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
    state.scheduledEvents = action.payload;
  },
  fetchScheduledEventsFailure(state, action) {
    state.status = 'failed';
    state.error = action.payload;
  },
  setUserAuthenticated(state, action) {
    state.isAuthenticated = action.payload;
  },
  setCurrentUser(state,action) {
    state.currentUser = action.payload;
    state.isAuthenticated = true;
  }
}
}); 

export const {
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
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
  removeFavorite
  
} = userSlice.actions;

export default userSlice.reducer;
