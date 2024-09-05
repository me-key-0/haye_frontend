import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  fetchScheduledEventsStart,
  fetchScheduledEventsSuccess,
  fetchScheduledEventsFailure,
  fetchUserFavoritesStart,
  fetchUserFavoritesSuccess,
  fetchUserFavoritesFailure,
  fetchUserProfileStart,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  updateUserProfileStart,
  updateUserProfileSuccess,
  updateUserProfileFailure,
  setUserAuthenticated
} from '../Slices/userSlice';

import { CheckAuth } from '../../services/auth/CheckAuth';

function* fetchAllUsersSaga() {
  try {
    const response = yield call(axios.get, '/api/users');
    yield put(fetchAllUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchAllUsersFailure(error.message));
  }
}

function* fetchUserProfileSaga(action) {
  try {
    const response = yield call(axios.get, `/api/users/${action.payload}/profile`);
    yield put(fetchUserProfileSuccess(response.data));
  } catch (error) {
    yield put(fetchUserProfileFailure(error.message));
  }
}

function* updateUserProfileSaga(action) {
  try {
    const { userId, updatedData } = action.payload;
    const response = yield call(axios.put, `/api/users/${userId}`, updatedData);
    yield put(updateUserProfileSuccess(response.data));
  } catch (error) {
    yield put(updateUserProfileFailure(error.message));
  }
}

function* fetchUserFavoritesSaga(action) {
  try {
    const response = yield call(axios.get, `/api/users/${action.payload}/favorites`);
    yield put(fetchUserFavoritesSuccess(response.data));
  } catch (error) {
    yield put(fetchUserFavoritesFailure(error.message));
  }
}

function* isUserAuthenticatedSaga() {
  try {
    const isAuthenticated = yield call(CheckAuth);
    yield put(setUserAuthenticated(isAuthenticated));
  } catch (error) {
    console.error('Error checking user authentication:', error);
  }
}

function* fetchScheduledEventsSaga(action) {
  try {
    const response = yield call(axios.get, `/api/events/scheduled/${action.payload}`);
    yield put(fetchScheduledEventsSuccess(response.data));
  } catch (error) {
    yield put(fetchScheduledEventsFailure(error.message));
  }
}

export function* userSaga() {
 
  yield all([
    takeEvery(fetchAllUsersRequest.type, fetchAllUsersSaga),
    takeEvery(fetchScheduledEventsStart.type, fetchScheduledEventsSaga),
    takeEvery(fetchUserFavoritesStart.type, fetchUserFavoritesSaga),
    takeEvery(fetchUserProfileStart.type, fetchUserProfileSaga),
    takeEvery(updateUserProfileStart.type, updateUserProfileSaga),
    takeEvery(setUserAuthenticated.type, isUserAuthenticatedSaga)
  ]); 
}
