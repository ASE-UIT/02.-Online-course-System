import { configureStore } from "@reduxjs/toolkit";
import modal from "./slices/modal";

export default configureStore({
  reducer: {
    modal: modal
  }
});
