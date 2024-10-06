import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import Home from "../pages/HomePage/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<Navigate to={"./"} />} />
    </Route>
  )
);

export default router;
