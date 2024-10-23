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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/sign-up" element={<SignUp />}>
          <Route
            path="/sign-up"
            element={<Navigate to={"/sign-up/step1/email"} />}
          />
          <Route path="step1/:signUpType" element={<StepOne />} />
          <Route path="step2/:signUpType" element={<VerifyCode />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/callback" element={<InfoInput />} />
        <Route path="/result/:content" element={<ResultPage />} />
      </Route>
      <Route path="*" element={<Navigate to={"./"} />} />
    </Route>
  )
);

export default router;
