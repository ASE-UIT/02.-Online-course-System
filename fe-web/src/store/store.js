import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";

export default configureStore({
  reducer: {
    auth: auth
  }
});
