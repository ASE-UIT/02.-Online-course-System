import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  moduleSlt: -1,
  lessonSlt: -1,
  lesson: null,
  course: null,
};
const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    setLearning: (state, action) => {
      const newState = { ...state, ...action.payload };
      return newState;
    },
  },
  //extraReducers: (builder) => {},
});
export const { setLearning } = learningSlice.actions;
export default learningSlice.reducer;
