import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    addSignUpData: (state, action) => {
      state = action.payload;
      return action.payload;
    },
    removeSignUpData: () => {
      return initialState;
    }
  }
});

export const { addSignUpData, removeSignUpData } = signUpSlice.actions;
export default signUpSlice.reducer;
