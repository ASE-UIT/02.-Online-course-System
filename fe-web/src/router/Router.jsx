import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import Home from "../pages/HomePage/Home";
import CourseDetail from "@/pages/CourseDetailPage/CourseDetail";
import SignUp from "@/pages/SignUp/SignUp";
import SignIn from "@/pages/SignIn/SignIn";
import StepOne from "@/pages/SignUp/StepOne";
import VerifyCode from "@/pages/SignUp/VerifyCode";
import ResultPage from "@/pages/Result/ResultPage";
import InfoInput from "@/pages/SignUp/InfoInput";
import LecturerLayout from "@/layouts/LecturerLayout";
import LecturerSignUp from "@/pages/Lecturer/SignUp/LecturerSignUp";
import LecturerResultPage from "@/pages/Lecturer/Result/ResultPage";
import TeacherCoursePage from "@/pages/Lecturer/TeacherCoursePage/TeacherCoursePage";
import LecturerCourseDetail from "@/pages/Lecturer/CourseDetail/LecturerCourseDetail";
import CourseAdd from "@/pages/Lecturer/TeacherCoursePage/AddCourse/CourseAdd";
import SignInForm from "@/pages/SignIn/SignInForm";
import ForgotPassword from "@/pages/SignIn/ForgotPassword";
import ResetPassword from "@/pages/SignIn/ResetPassword";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="web/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="course/:id" element={<CourseDetail />} />
        <Route path="sign-up" element={<SignUp />}>
          <Route
            path="*"
            element={<Navigate to={"/web/sign-up/step1/email"} />}
          />
          <Route path="step1/:signUpType" element={<StepOne />} />
          <Route
            path="step2/:signUpType/:emailOrPhone"
            element={<VerifyCode />}
          />
        </Route>
        <Route path="sign-in" element={<SignIn />}>
          <Route path="*" element={<Navigate to={"/web/sign-in"} />} />
          <Route index element={<SignInForm />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="step2/:signUpType/:emailOrPhone"
            element={<VerifyCode />}
          />
          <Route
            path="reset-password/:emailOrPhone/:otp"
            element={<ResetPassword />}
          />
        </Route>
        <Route path="callback" element={<InfoInput />} />
        <Route path="result/:content" element={<ResultPage />} />
        {/* Lecturer layout */}
        <Route path="lecturer" element={<LecturerLayout />}>
          <Route path="sign-up" element={<LecturerSignUp />} />
          <Route path="result" element={<LecturerResultPage />} />
          <Route path="course" element={<TeacherCoursePage />} />
          <Route path="courseAdd" element={<CourseAdd />} />
          <Route path="course/:id" element={<LecturerCourseDetail />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={<NotFound />} />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true
    }
  }
);

export default router;
