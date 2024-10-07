// sagas/eventsSagas.js
import { call, put, takeEvery } from 'redux-saga/effects';

import { 
  scheduleEventStart,
  scheduleEventSuccess,
  scheduleEventFailure, 
  getScheduledEventsStart,
  getScheduledEventsSuccess, 
  getScheduledEventsFailure, 
  fetchAllEventsStart,
  fetchAllEventsSuccess,
  fetchAllEventsFailure
} from '../Slices/eventsSlice';

import { fetchAllEventsAPI, getscheduledEventsAPI, scheduleEventAPI } from '../../services/api/eventsApi';
// Worker Saga for scheduling events
function* scheduleEventSaga(action) {
  try {
  
    const response = yield call(scheduleEventAPI, action.payload);
    yield put(scheduleEventSuccess(response.data));
  } catch (error) {
    yield put(scheduleEventFailure(error.message));
  }
}

// Worker Saga for fetching scheduled events
function* getScheduledEventsSaga(action) {
  try {
    const userID = action.payload; // Assuming payload contains userID
    const response = yield call(getscheduledEventsAPI, userID);
    yield put(getScheduledEventsSuccess(response)); // Assuming response is the data directly
  } catch (error) {
    yield put(getScheduledEventsFailure(error.message));
  }
}
function* fetchAllEventsSaga() {
  try {
    const response = yield call(fetchAllEventsAPI);
    yield put(fetchAllEventsSuccess(response)); // Assuming response is the data directly
  } catch (error) {
    yield put(fetchAllEventsFailure(error.message));
  }
}

// Watcher Saga
export function* eventsSaga() {
  yield takeEvery(scheduleEventStart.type, scheduleEventSaga);
  yield takeEvery(getScheduledEventsStart.type, getScheduledEventsSaga);
  yield takeEvery(fetchAllEventsStart.type, fetchAllEventsSaga);

}
