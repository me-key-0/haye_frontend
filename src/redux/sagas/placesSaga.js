import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchAllPlaces as fetchAllPlacesApi } from '../../services/api/placesApi'; // Import the API function

import { fetchAllPlacesRequest, 
  fetchAllPlacesSuccess, 
  fetchAllPlacesFailure,
  searchPlacesRequest,
  searchPlacesSuccess, 
  searchPlacesFailure } from '../Slices/placesSlice';
import { fetchPlaces } from '../../services/api/placesApi';


// Worker Saga: will be fired on fetchAllPlacesRequest actions
function* fetchAllPlacesSaga() {
  try {
    // Call the API function
    const places = yield call(fetchAllPlacesApi);
    // Dispatch success action with the fetched places
    yield put(fetchAllPlacesSuccess(places));
  } catch (error) {
    console.error('Fetch all places failed', error);
    // Dispatch failure action with the error message
    yield put(fetchAllPlacesFailure(error.message));
  }
}
function* searchPlacesSaga(action) {
  try {
    const { query, price, rating, location } = action.payload;
    const places = yield call(fetchPlaces, query, price, rating, location);
    yield put(searchPlacesSuccess(places));
  } catch (error) {
    yield put(searchPlacesFailure(error.message));
  }
}

// Watcher Saga: watches for actions dispatched to the store
export function* placesSaga() {
  yield takeEvery(fetchAllPlacesRequest.type, fetchAllPlacesSaga);
  yield takeEvery(searchPlacesRequest.type, searchPlacesSaga);


}
