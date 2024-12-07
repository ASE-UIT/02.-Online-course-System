import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import learning from "./slices/learningSlice";
import { courseRTKApi } from "./rtk/course.services";
export default configureStore({
  reducer: {
    auth: auth,
    learning: learning,
    [courseRTKApi.reducerPath]: courseRTKApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(courseRTKApi.middleware),
});
