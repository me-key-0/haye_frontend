import { all } from 'redux-saga/effects';
import { userSaga } from './sagas/userSaga';
import { placesSaga } from './sagas/placesSaga';
import { authSaga } from './sagas/authSaga';
import { eventsSaga } from './sagas/eventsSaga';

export function* rootSaga() {
  yield all([
    userSaga(),
    placesSaga(),
    authSaga(),
    eventsSaga()
    
  ]);
}
