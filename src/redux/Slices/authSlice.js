import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,       
    currentUser: null,        
    isAuthenticated: false, 
    status: 'idle',    
    error: null,       
  },
  reducers: {
    // Authentication actions
    googleSignInStart(state) {
      state.status = 'loading';
    },
    emailSignInStart(state) {
      state.status = 'loading';
    },
    signInSuccess: (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
      state.isAuthenticated = true;
     
    },
   
    signInFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    signOutStart(state) {
      state.status = 'loading';
    },
   signOutSuccess: (state) => {
      state.status = 'succeeded';
      state.token = null;
      state.currentUser = null;
      state.isAuthenticated = false;
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
     
    checkAuthRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    checkAuthSuccess: (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    checkAuthFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.error;
    },
  },
});

export const {
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  checkAuthRequest,
  checkAuthSuccess,
  checkAuthFailure,
} = authSlice.actions;

export default authSlice.reducer;
