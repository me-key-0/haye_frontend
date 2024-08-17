
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
  signUpFailure
} from '../Slices/userSlice';


import { signInWithGoogle } from '../../firebase'; // Import your Google sign-in function
import { signInUser } from '../../services/api/userApi'; 
import { signUpUser } from '../../services/api/userApi';
import { signOutUser } from '../../services/api/userApi';
import { signOutFromGoogle } from '../../firebase';


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
        signInMethod: 'google',
      }
      
    };
    // This sends the google data to the backend
  // yield call(axios.post, '/api/users/google-signin', data);
    
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
    yield put(signInSuccess({...data, signInMethod: 'email'}));
    // Optionally store tokens or user info in localStorage or cookies if needed
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  } catch (error) {
    // Dispatch failure action with error message
    yield put(signInFailure(error.message));
  }
}

// Sign up Saga
function* signUpSaga(action) {
  try {
    const { displayName, email, password } = action.payload;
    const data = yield call(signUpUser, { displayName, email, password }); // Call sign-up function
    yield put(signUpSuccess({ CurrentUser: data })); // Dispatch success action
    // Optionally store tokens or user info in localStorage or cookies if needed
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    // Automatically sign in the user after sign-up
    yield put(signInSuccess(data));
  } catch (error) {
    yield put(signUpFailure(error.message)); // Dispatch failure action
  }
}

// Sign out Saga
function* signOutSaga(action) {
  try {
    yield put(signOutStart());

    const { signInMethod } = action.payload.currentUser;
    
    if (signInMethod === 'google') {
      yield call(signOutFromGoogle);
    } else if (signInMethod === 'email') {
      yield call(signOutUser);
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error.message));
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
    takeEvery(signOutStart, signOutSaga),
    takeEvery(signUpStart.type, signUpSaga),
    //takeEvery(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)

  ]);
}
