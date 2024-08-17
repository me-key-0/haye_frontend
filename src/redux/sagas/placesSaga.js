import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchAllPlaces as fetchAllPlacesApi } from '../../services/api/placesApi'; // Import the API function
import { fetchAllPlacesRequest, fetchAllPlacesSuccess, fetchAllPlacesFailure } from '../Slices/placesSlice';

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

// Watcher Saga: watches for actions dispatched to the store
export function* placesSaga() {
  yield takeEvery(fetchAllPlacesRequest.type, fetchAllPlacesSaga);
}
