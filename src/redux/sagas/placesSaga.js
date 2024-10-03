import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchAllPlaces as fetchAllPlacesApi, fetchHome } from '../../services/api/placesApi'; // Import the API function


import { fetchAllPlacesRequest, 
  fetchAllPlacesSuccess, 
  fetchAllPlacesFailure,
  searchPlacesRequest,
  searchPlacesSuccess, 
  searchPlacesFailure,
  fetchPlaceByIdFailure,
  fetchPlaceByIdRequest,
  fetchPlaceByIdSuccess,
  HomeRequest,
  HomeFailure,
  HomeSuccess,
 // fetchUserFavoritesStart,
  //fetchUserFavoritesSuccess,
  //fetchUserFavoritesFailure, 
  } from '../Slices/placesSlice';
import { searchPlaces , fetchPlaceById } from '../../services/api/placesApi';


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
    const places = yield call(searchPlaces, query, price, rating, location);
    yield put(searchPlacesSuccess(places));
  } catch (error) {
    yield put(searchPlacesFailure(error.message));
  }
}

function* fetchPlaceByIdSaga(action) {
  try {
    const placeId = action.payload;
    const place = yield call(fetchPlaceById, placeId);
    yield put(fetchPlaceByIdSuccess(place));
  } catch (error) {
    yield put(fetchPlaceByIdFailure(error.message));
  }
}
function* HomeSaga(action) {
  try {
    const places = yield call(fetchHome);
    yield put(HomeSuccess(places));
  } catch (error) {
    yield put(HomeFailure(error.message));
  }
}

// Watcher Saga: watches for actions dispatched to the store
export function* placesSaga() {
  yield takeEvery(fetchAllPlacesRequest.type, fetchAllPlacesSaga);
  yield takeEvery(HomeRequest.type, HomeSaga);
  yield takeEvery(searchPlacesRequest.type, searchPlacesSaga);
  yield takeEvery(fetchPlaceByIdRequest.type, fetchPlaceByIdSaga);
//  yield takeEvery(fetchUserFavoritesStart.type, fetchUserFavoritesSaga);


}
