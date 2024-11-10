import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/admin" element={<UserLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<Navigate to={"./"} />} />
    </Route>
  )
);

export default router;
