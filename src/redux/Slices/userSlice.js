import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    users: [], // For fetching all users, if needed
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Actions related to fetching all users
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
    // Actions related to authentication
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
    signOutSuccess(state) {
      state.status = 'succeeded';
      state.currentUser = null;
      state.error = null;
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
      state.currentUser = action.payload.user;
      state.error = null;
    },
    signUpFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
} = userSlice.actions;

export default userSlice.reducer;
