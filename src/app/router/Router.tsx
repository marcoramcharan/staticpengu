import { RouteObject, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Guide from "../pages/Guide";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import EditSite from "../pages/EditSite";

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
        <Guide />
      </MainLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <MainLayout>
        <Login />
      </MainLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <MainLayout>
        <Signup />
      </MainLayout>
    ),
  },
  {
    path: "/dashboard/:userId",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/:userId/sites/:siteId/edit",
    element: (
      <ProtectedRoute>
        <MainLayout>
          <EditSite />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
];

export default routes;
