import {configureStore} from '@reduxjs/toolkit';
import postReducer from '../features/post/postSlice.js';
import userReducer from '../features/auth/userSlice.js';

export const store = configureStore({
    reducer: {
        post: postReducer,
        user: userReducer
    },
  })
  
  export default store;