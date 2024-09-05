import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
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
  verifyOtpSuccess,
  verifyOtpFailure,
  verifyOtpStart,
} from '../Slices/userSlice';

import { signInWithGoogle } from '../../firebase'; // Import your Google sign-in function
import { signInUser, signUpUser, signOutUser } from '../../services/api/userApi';
import { signOutFromGoogle } from '../../firebase';

function* signInWithGoogleSaga() {
  try {
    console.log("Starting Google sign-in...");
    const userCredential = yield call(signInWithGoogle);
    const user = userCredential.user;
    const data = {
      accessToken: user.accessToken,
      user: {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
        signInMethod: 'google',
      }
    };
    yield put(signInSuccess(data));
    console.log("Google sign-in successful");
  } catch (error) {
    console.error("Google sign-in failed:", error);
    yield put(signInFailure(error.message));
  }
}

function* signInWithEmailSaga(action) {
  try {
    console.log("Starting email sign-in...");
    const { email, password } = action.payload;
    const data = yield call(signInUser, { email, password });
    yield put(signInSuccess({ ...data, signInMethod: 'email' }));
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    console.log("Email sign-in successful");
  } catch (error) {
    console.error("Email sign-in failed:", error);
    yield put(signInFailure(error.message));
  }
}

function* signUpSaga(action) {
  try {
    console.log("Starting sign-up...");
    const { displayName, email, password } = action.payload;
    const data = yield call(signUpUser, { displayName, email, password });
    yield put(signUpSuccess({ currentUser: data }));
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    yield put(signInSuccess(data));
    console.log("Sign-up successful");
  } catch (error) {
    console.error("Sign-up failed:", error);
    yield put(signUpFailure(error.message));
  }
}

function* signOutSaga(action) {
  try {
    console.log("Starting sign-out process...");
    const { signInMethod } = action.payload.currentUser;

    if (signInMethod === 'google') {
      yield call(signOutFromGoogle);
    } else if (signInMethod === 'email') {
      yield call(signOutUser);
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    
    yield put(signOutSuccess());
    console.log("Sign-out successful, user signed out.");
  } catch (error) {
    console.error("Sign-out failed:", error);
    yield put(signOutFailure(error.message));
  }
}

function* verifyOtpSaga(action) {
  try {
    console.log("Starting OTP verification...");
    const response = yield call(axios.post, '/api/verify-otp', action.payload);
    yield put(verifyOtpSuccess(response.data));
    console.log("OTP verification successful");
  } catch (error) {
    console.error("OTP verification failed:", error);
    yield put(verifyOtpFailure(error.message));
  }
}

function* fetchAllUsersSaga() {
  try {
    console.log("Fetching all users...");
    const response = yield call(axios.get, '/api/users');
    yield put(fetchAllUsersSuccess(response.data));
    console.log("Fetched all users successfully");
  } catch (error) {
    console.error("Fetching all users failed:", error);
    yield put(fetchAllUsersFailure(error.message));
  }
}

export function* userSaga() {
  yield all([
    takeEvery(fetchAllUsersRequest.type, fetchAllUsersSaga),
    takeEvery(googleSignInStart.type, signInWithGoogleSaga),
    takeEvery(emailSignInStart.type, signInWithEmailSaga),
    takeEvery(signOutStart.type, signOutSaga),
    takeEvery(signUpStart.type, signUpSaga),
    takeEvery(verifyOtpStart.type, verifyOtpSaga)
  ]);
}
