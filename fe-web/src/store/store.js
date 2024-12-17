import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import authLecturer from "./slices/authLecturerSlice";
import learning from "./slices/learningSlice";
import payment from "./slices/paymentSlice";
import signUp from "./slices/signUpSlice";
import studentInfor from "./slices/studentInforSlice";
import lecturerInfor from "./slices/lecturerInforSlice";
import { courseRTKApi } from "./rtk/course.services";
import {cartRTKApi} from "@/store/rtk/cart.services.js";

export default configureStore({
  reducer: {
    auth: auth,
    studentInfor: studentInfor,
    authLecturer: authLecturer,
    lecturerInfor: lecturerInfor,
    learning: learning,
    [courseRTKApi.reducerPath]: courseRTKApi.reducer,
    payment: payment,
    signUp: signUp,
    [cartRTKApi.reducerPath]: cartRTKApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseRTKApi.middleware)
        .concat(cartRTKApi.middleware),
});
