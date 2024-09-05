// sagas/eventsSagas.js
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { 
  scheduleEventStart,
  scheduleEventSuccess,
  scheduleEventFailure, 
  getScheduledEventsStart,
  getScheduledEventsSuccess, 
  getScheduledEventsFailure 
} from '../Slices/eventsSlice';

// Worker Saga for scheduling events
function* scheduleEventSaga(action) {
  try {
    const response = yield call(axios.post, '/api/events/schedule', action.payload);
    yield put(scheduleEventSuccess(response.data));
  } catch (error) {
    yield put(scheduleEventFailure(error.message));
  }
}

// Worker Saga for fetching scheduled events
function* getScheduledEventsSaga(action) {
  try {
    const response = yield call(axios.get, `/api/events/scheduled/${action.payload}`);
    yield put(getScheduledEventsSuccess(response.data));
  } catch (error) {
    yield put(getScheduledEventsFailure(error.message));
  }
}

// Watcher Saga
export function* eventsSaga() {
  yield takeEvery(scheduleEventStart.type, scheduleEventSaga);
  yield takeEvery(getScheduledEventsStart.type, getScheduledEventsSaga);
}
