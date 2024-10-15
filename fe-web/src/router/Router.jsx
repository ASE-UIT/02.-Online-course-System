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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      <Route path="*" element={<Navigate to={"./"} />} />
    </Route>
  )
);

export default router;
