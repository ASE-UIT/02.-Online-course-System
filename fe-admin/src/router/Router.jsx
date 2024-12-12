/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";
import withSuspense from "./WithSuspense";
import ManageLecturer from "@/pages/ManageLecturer/ManageLecturer";

const UserLayout = withSuspense(lazy(() => import("../layouts/UserLayout")));
const Dashboard = withSuspense(
  lazy(() => import("@/pages/Dashboard/Dashboard"))
);
const ManageBusiness = withSuspense(
  lazy(() => import("@/pages/ManageBusiness/ManageBusiness"))
);
const ManageEmployee = withSuspense(
  lazy(() => import("@/pages/ManageEmployee/ManageEmployee"))
);
const ManageUser = withSuspense(
  lazy(() => import("@/pages/ManageUser/ManageUser"))
);
const Setting = withSuspense(lazy(() => import("@/pages/Setting/Setting")));
const ManageCategories = withSuspense(
  lazy(() => import("@/pages/ManageCategories/ManageCategories"))
);
const SignIn = withSuspense(lazy(() => import("@/pages/Signin/Signin")));
const DefaultLayout = withSuspense(
  lazy(() => import("@/layouts/DefaultLayout"))
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="admin" element={<DefaultLayout />}>
        <Route path="/admin/" element={<UserLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="business" element={<ManageBusiness />} />
          <Route path="courses/category-list" element={<ManageCategories />} />
          <Route path="teacher/list" element={<ManageLecturer />} />
          <Route path="employees" element={<ManageEmployee />} />
          <Route path="users" element={<ManageUser />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to={"/admin/dashboard"} />} />
      </Route>
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
