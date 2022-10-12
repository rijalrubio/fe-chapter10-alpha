import authSlice from "./authSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
