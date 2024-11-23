import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import { courseRTKApi } from "./rtk/course.services";

export default configureStore({
  reducer: {
    auth: auth,
    [courseRTKApi.reducerPath]: courseRTKApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(courseRTKApi.middleware),
});
