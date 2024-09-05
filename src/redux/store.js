// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './Slices/userSlice';
import placesReducer from './Slices/placesSlice';
import authReducer from './Slices/authSlice';
import eventsReducer from './Slices/eventsSlice';
import adminReducer from './Slices/adminSlice'
import { rootSaga } from './root-saga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
  reducer: {
    user: userReducer,
    places: placesReducer,
    auth : authReducer,
    events : eventsReducer,
    admin : adminReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
