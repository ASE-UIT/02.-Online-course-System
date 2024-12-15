import { createSlice } from "@reduxjs/toolkit";

const setup = () => {
  const authLecturer = localStorage.getItem("authLecturer");
  if (!authLecturer || authLecturer === "undefined") {
    localStorage.setItem("authLecturer", JSON.stringify([]));
    return { authLecturer: [] };
  }
  return { authLecturer: JSON.parse(authLecturer) };
};

export const authLecturerSlice = createSlice({
  name: "authLecturer",
  initialState: setup(),
  reducers: {
    addAuthLercturer: (state, action) => {
      console.log("action.payload", action.payload);
      let { token } = action.payload;
      state.authLecturer = token;

      localStorage.setItem("authLecturer", JSON.stringify(state.authLecturer));
    },
    removeAuthLercturer: (state) => {
      state.authLecturer = [];
      localStorage.setItem("authLecturer", JSON.stringify([]));
    }
  }
});

export const { addAuthLercturer, removeAuthLercturer } =
  authLecturerSlice.actions;
export default authLecturerSlice.reducer;
