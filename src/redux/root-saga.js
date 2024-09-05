// redux/rootSaga.js
import { all } from 'redux-saga/effects';
import { userSaga } from './sagas/userSaga';
import { placesSaga } from './sagas/placesSaga';

export function* rootSaga() {
  yield all([
    userSaga(),
    placesSaga(),
  ]);
}
