import { createSlice } from "@reduxjs/toolkit";

const setup = () => {
  localStorage.getItem("testRedux")
    ? true
    : localStorage.setItem("testRedux", JSON.stringify([]));
  let testRedux = JSON.parse(localStorage.getItem("testRedux"));
  return { testRedux: testRedux };
};

export const testReduxSlice = createSlice({
  name: "testRedux",
  initialState: setup,
  reducers: {
    addTestRedux: (state, action) => {
      let { object } = action.payload;

      state.testRedux = object;

      localStorage.setItem("testRedux", JSON.stringify(state.testRedux));
    }
  }
});

export const { addTestRedux } = testReduxSlice.actions;
export default testReduxSlice.reducer;
