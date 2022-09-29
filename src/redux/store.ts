import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import alertReducer from './alertSlice';
import confirmReducer from './confirmSlice';
import postReducer from './postSlice';
import featuredPostReducer from './featuredPostSlice';
import userProfileReducer from './userProfileSlice';
import userPostReducer from './userPostSlice';

// -------------------------------------------------------------------

const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    confirm: confirmReducer,
    post: postReducer,
    featuredPost: featuredPostReducer,
    userProfile: userProfileReducer,
    userPost: userPostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
