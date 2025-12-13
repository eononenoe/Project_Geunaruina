import { configureStore } from '@reduxjs/toolkit';

// Reducers will be imported here
// import authReducer from './slices/authSlice';
// import sajuReducer from './slices/sajuSlice';

const store = configureStore({
  reducer: {
    // auth: authReducer,
    // saju: sajuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
