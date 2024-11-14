import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import ManageBusiness from "@/pages/ManageBusiness/ManageBusiness";
import ManageEmployee from "@/pages/ManageEmployee/ManageEmployee";
import ManageUser from "@/pages/ManageUser/ManageUser";
import Setting from "@/pages/Setting/Setting";
import ManageCategories from "@/pages/ManageCategories/ManageCategories";
import SignIn from "@/pages/Signin/Signin";
import DefaultLayout from "@/layouts/DefaultLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="admin" element={<DefaultLayout />}>
        <Route path="/admin/" element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="business" element={<ManageBusiness />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="employees" element={<ManageEmployee />} />
          <Route path="users" element={<ManageUser />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to={"./admin/"} />} />
      </Route>
    </Route>
  )
);

export default router;
