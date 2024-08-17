
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
 // signOutSuccess,
  // signOutFailure,
  //signUpStart,
  //signUpSuccess,
  //signUpFailure
} from '../Slices/userSlice';
//import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/';

import { signInWithGoogle } from '../../firebase'; // Import your Google sign-in function
import { signInUser } from '../../services/api/userApi'; // Import your email sign-in function

function* signInWithGoogleSaga() {
  try {
    const userCredential = yield call(signInWithGoogle); // Call Google sign-in function
    const user = userCredential.user;
    const data = {
      accessToken: user.accessToken,
      user: {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
      },
    };
    yield put(signInSuccess(data)); // Dispatch success action
  } catch (error) {
    yield put(signInFailure(error.message)); // Dispatch failure action
  }
}


function* signInWithEmailSaga(action) {
  try {
    const { email, password } = action.payload;
    const data = yield call(signInUser, { email, password }); // Call email sign-in function
    // Dispatch success action with user data
    yield put(signInSuccess(data));
    // Optionally store tokens or user info in localStorage or cookies if needed
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  } catch (error) {
    // Dispatch failure action with error message
    yield put(signInFailure(error.message));
  }
}


// Saga for fetching all users
function* fetchAllUsersSaga() {
  try {
    const response = yield call(axios.get, '/api/users');
    yield put(fetchAllUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchAllUsersFailure(error.message));
  }
}

// Watcher sagas
export function* userSaga() {
  yield all([
    takeEvery(fetchAllUsersRequest.type, fetchAllUsersSaga),
    takeEvery(googleSignInStart.type, signInWithGoogleSaga),
    takeEvery(emailSignInStart.type, signInWithEmailSaga),
    //takeEvery(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated),
    //takeEvery(UserActionTypes.SIGN_OUT_START, signOut),
    //takeEvery(signUpStart.type, signUp),
    //takeEvery(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)

  ]);
}
