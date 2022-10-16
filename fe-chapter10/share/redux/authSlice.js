import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isLoggingIn: false,
    token: null,
  },
  reducers: {
    startLoggingIn: state => {
      state.isLoggingIn = true;
    },
    stopLoggingIn: state => {
      state.isLoggingIn = false;
    },
    // reducer to update state to loggin is true and add jwt token
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload;
      state.isLoggingIn = false;
    },
    // reducer to update state to loggin is false and remove jwt
    setLogout: (state, action) => {
      state.isLoggedIn = false;
      state.accessToken = "udah logout";
    },
  },
});

export const { startLoggingIn, stopLoggingIn, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
