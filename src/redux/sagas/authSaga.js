import { put, call, all, takeEvery } from 'redux-saga/effects';

import {
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
} from '../Slices/authSlice';
import { signInWithGoogle } from '../../firebase'; // Import your Google sign-in function
import { signInUser, signUpUser, signOutUser, verifyOtp } from '../../services/api/userApi';
import { signOutFromGoogle } from '../../firebase';
import { CheckAuth} from '../../services/auth/CheckAuth';


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
    const { username, email, password } = action.payload;
    const data = yield call(signUpUser, { username, email, password });
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
    const response = yield call(verifyOtp, action.payload);
    yield put(verifyOtpSuccess(response.data));
    console.log("OTP verification successful");
  } catch (error) {
    console.error("OTP verification failed:", error);
    yield put(verifyOtpFailure(error.message));
  }
}

// Worker Saga: will be fired on checkAuthRequest actions
function* checkAuthSaga() {
  try {
    const response = yield call(CheckAuth); 
    yield put(checkAuthSuccess({ isAuthenticated: response.isAuthenticated }));
  } catch (error) {
    yield put(checkAuthFailure({ error: error.message }));
  }
}


// Watcher Saga: spawn a new checkAuthSaga task on each checkAuthRequest
export function* authSaga() {
  yield all([
    takeEvery(checkAuthRequest.type, checkAuthSaga),
    takeEvery(googleSignInStart.type, signInWithGoogleSaga),
    takeEvery(emailSignInStart.type, signInWithEmailSaga),
    takeEvery(signOutStart.type, signOutSaga),
    takeEvery(signUpStart.type, signUpSaga),
    takeEvery(verifyOtpStart.type, verifyOtpSaga),
  ]) 
}


