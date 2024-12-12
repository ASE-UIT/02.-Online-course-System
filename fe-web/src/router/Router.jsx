/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";
import withSuspense from "./WithSuspense";
import SignUpForm from "@/pages/Lecturer/SignUp/SignUpForm";
import VerifyCodeLecturer from "@/pages/Lecturer/SignUp/VerifyCodeLecturer";

const UserLayout = withSuspense(lazy(() => import("../layouts/UserLayout")));
const Home = withSuspense(lazy(() => import("../pages/HomePage/Home")));
const CourseDetail = withSuspense(
  lazy(() => import("@/pages/CourseDetailPage/CourseDetail"))
);
const SignUp = withSuspense(lazy(() => import("@/pages/SignUp/SignUp")));
const SignIn = withSuspense(lazy(() => import("@/pages/SignIn/SignIn")));
const StepOne = withSuspense(lazy(() => import("@/pages/SignUp/StepOne")));
const VerifyCode = withSuspense(
  lazy(() => import("@/pages/SignUp/VerifyCode"))
);
const ResultPage = withSuspense(
  lazy(() => import("@/pages/Result/ResultPage"))
);
const InfoInput = withSuspense(lazy(() => import("@/pages/SignUp/InfoInput")));
const LecturerLayout = withSuspense(
  lazy(() => import("@/layouts/LecturerLayout"))
);
const LecturerSignUp = withSuspense(
  lazy(() => import("@/pages/Lecturer/SignUp/LecturerSignUp"))
);
const LecturerResultPage = withSuspense(
  lazy(() => import("@/pages/Lecturer/Result/ResultPage"))
);
const LecturerLandingPage = withSuspense(
  lazy(() => import("@/pages/Lecturer/LandingPage/LecturerLandingPage.jsx"))
);
const TeacherCoursePage = withSuspense(
  lazy(() => import("@/pages/Lecturer/TeacherCoursePage/TeacherCoursePage"))
);
const LecturerCourseDetail = withSuspense(
  lazy(() => import("@/pages/Lecturer/CourseDetail/LecturerCourseDetail"))
);
const CourseAdd = withSuspense(
  lazy(() => import("@/pages/Lecturer/TeacherCoursePage/AddCourse/CourseAdd"))
);
const SignInForm = withSuspense(
  lazy(() => import("@/pages/SignIn/SignInForm"))
);
const ForgotPassword = withSuspense(
  lazy(() => import("@/pages/SignIn/ForgotPassword"))
);
const ResetPassword = withSuspense(
  lazy(() => import("@/pages/SignIn/ResetPassword"))
);
const NotFound = withSuspense(lazy(() => import("@/pages/NotFound")));

const SearchPage = withSuspense(
    lazy(() => import("@/pages/searchPage/searchPage")));
const DefaultLayout = withSuspense(
    lazy(() => import("@/layouts/DefaultLayout")));
const LecturerSignIn = withSuspense(
    lazy(() => import("@/pages/Lecturer/SignIn/LecturerSignIn")));
const CartPage = withSuspense(
    lazy(() => import("@/pages/CartPage/CartPage.jsx")));
const CourseList = withSuspense(
    lazy(() => import("@/pages/CourseList/CourseList.jsx")));
const LearningPage = withSuspense(
    lazy(() => import("@/pages/LearningPage/LearningPage.jsx")));
const CheckoutPage = withSuspense(
    lazy(() => import ("@/pages/PaymentPage/CheckoutPage.jsx")));
const CheckoutStep1Page = withSuspense(
    lazy(() => import ("@/pages/PaymentPage/CheckoutStep1.jsx")));
const CheckoutStep2Page = withSuspense(
    lazy(() => import ("@/pages/PaymentPage/CheckoutStep2")));
const CheckoutSuccessPage = withSuspense(
    lazy(() => import ("@/pages/PaymentPage/CheckoutSuccess.jsx")));
const CheckoutFailPage = withSuspense(
    lazy(() => import ("@/pages/PaymentPage/CheckoutFail.jsx")));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="web/" element={<UserLayout />}>
        <Route path="*" element={<DefaultLayout />}>
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
          <Route path="search" element={<SearchPage />} />
          <Route path="callback" element={<InfoInput />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="result/:content" element={<ResultPage />} />
          <Route path="course-list" element={<CourseList />} />
          <Route path="checkout" element={<CheckoutPage />} >
            <Route path="*" element={<Navigate to={"/web/checkout/step1"} />} />
            <Route path="step1" element={<CheckoutStep1Page/>}/>
            <Route path="step2" element={<CheckoutStep2Page/>}/>
            <Route path="success" element={<CheckoutSuccessPage/>}/>
            <Route path="fail" element={<CheckoutFailPage/>}/>
          </Route>
          {/* Lecturer layout */}
          <Route path="lecturer" element={<LecturerLayout />}>
            <Route path="sign-in" element={<LecturerSignIn />} />
            <Route path="sign-up" element={<LecturerSignUp />}>
              <Route
                path="*"
                element={<Navigate to={"/web/lecturer/sign-up"} />}
              />
              <Route index element={<SignUpForm />} />
              <Route
                path="step2/:signUpType/:emailOrPhone"
                element={<VerifyCodeLecturer />}
              />
            </Route>
            <Route path="result" element={<LecturerResultPage />} />
            <Route path="landing" element={<LecturerLandingPage />} />
            <Route path="course" element={<TeacherCoursePage />} />
            <Route path="courseAdd" element={<CourseAdd />} />
            <Route path="course/:id" element={<LecturerCourseDetail />} />
          </Route>
        </Route>
      </Route>
      <Route path="/web/learning/:courseId" element={<LearningPage />} />
      <Route path="*" element={<NotFound />} />
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
