import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { fetchAllPlacesRequest, fetchAllPlacesSuccess, fetchAllPlacesFailure } from '../Slices/placesSlice';

// Worker Saga: will be fired on fetchAllPlacesRequest actions
function* fetchAllPlacesSaga() {
  try {
    const response = yield call(axios.get, '/api/places');
    yield put(fetchAllPlacesSuccess(response.data));
  } catch (error) {
    console.error('Fetch all places failed', error);
    yield put(fetchAllPlacesFailure(error.message));
  }
}

// Watcher Saga: watches for actions dispatched to the store
function* placesSaga() {
  yield takeEvery(fetchAllPlacesRequest.type, fetchAllPlacesSaga);
}

export default placesSaga;
