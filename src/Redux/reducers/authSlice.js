import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state) => {
      state.value = true;
    },
    exit: (state) => {
      state.value = false;
    },
  },
});

export const { signIn, exit } = authSlice.actions;

export default authSlice.reducer;
