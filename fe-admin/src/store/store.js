import { configureStore } from "@reduxjs/toolkit";
import modal from "./slices/modal";
import { baseApi } from "./rtk/base.service";

export default configureStore({
  reducer: {
    modal: modal,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});
