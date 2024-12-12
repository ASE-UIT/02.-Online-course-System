import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import learning from "./slices/learningSlice";
import payment from "./slices/paymentSlice";
import signUp from "./slices/signUpSlice";
import { courseRTKApi } from "./rtk/course.services";

export default configureStore({
  reducer: {
    auth: auth,
    learning: learning,
    [courseRTKApi.reducerPath]: courseRTKApi.reducer,
    payment:payment,
    signUp: signUp,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseRTKApi.middleware)
});
