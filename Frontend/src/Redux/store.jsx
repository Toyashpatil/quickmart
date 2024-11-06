// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Counter/counterSlice';
import authReducer from './Auth/authSlice'
import cartReducer from './Cart/cartSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth:authReducer,
    cart:cartReducer,
  },
});
