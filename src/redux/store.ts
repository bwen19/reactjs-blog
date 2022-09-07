import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postsReducer from './postsSlice';
import confirmReducer from './confirmSlice';
import alertReducer from './alertSlice';

// -------------------------------------------------------------------

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    confirm: confirmReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
