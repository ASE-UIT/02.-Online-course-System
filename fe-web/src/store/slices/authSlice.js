import { createSlice } from "@reduxjs/toolkit";

const setup = () => {
  localStorage.getItem("auth")
    ? true
    : localStorage.setItem("auth", JSON.stringify([]));
  let auth = JSON.parse(localStorage.getItem("auth"));
  return { auth: auth };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: setup,
  reducers: {
    addAuth: (state, action) => {
      let { object } = action.payload;

      state.auth = object;

      localStorage.setItem("auth", JSON.stringify(state.auth));
    },
    removeAuth: (state) => {
      state.auth = [];
      localStorage.setItem("auth", JSON.stringify([]));
    }
  }
});

export const { addAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
