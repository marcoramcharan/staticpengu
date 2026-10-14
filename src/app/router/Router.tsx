import { Route, RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Guide from "../pages/Guide";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <MainLayout>
        <Route index element={<Home />} />
      </MainLayout>
    ),
  },
  {
    path: "/guide",
    element: (
      <MainLayout>
        <Route index element={<Guide />} />
      </MainLayout>
    ),
  },
];

export default routes;