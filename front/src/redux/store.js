import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authslice';

// 5. store에 slide 등록
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
