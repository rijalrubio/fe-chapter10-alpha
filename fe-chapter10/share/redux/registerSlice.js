import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    isRegistered: false,
    isRegistering: false,
  },
  reducers: {
    startRegistration: state => {
      state.isRegistering = true;
    },
    setRegister: state => {
      state.isRegistered = true
      state.isRegistering = false;
    },
    stopRegistration: state => {
      state.isRegistering = false;
    },
  },
});

export const { startRegistration, stopRegistration, setRegister } = registerSlice.actions;
export default registerSlice.reducer;