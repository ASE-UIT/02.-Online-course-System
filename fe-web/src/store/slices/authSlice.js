import { createSlice } from "@reduxjs/toolkit";

const setup = () => {
  const auth = localStorage.getItem("auth");
  if (!auth || auth === "undefined") {
    localStorage.setItem("auth", JSON.stringify([]));
    return { auth: [] };
  }
  return { auth: JSON.parse(auth) };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: setup(),
  reducers: {
    addAuth: (state, action) => {
      console.log("action.payload", action.payload);
      let { token } = action.payload;
      state.auth = token;

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
