import authSlice from './authSlice';
import registerSlice from './registerSlice';

const { configureStore } = require('@reduxjs/toolkit');

export const store = configureStore({
  reducer: {
    auth: authSlice,
    register: registerSlice
  },
});
