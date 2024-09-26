import { configureStore } from "@reduxjs/toolkit";
import testRedux from "./slices/testRedux";

export default configureStore({
  reducer: {
    testRedux: testRedux
  }
});
