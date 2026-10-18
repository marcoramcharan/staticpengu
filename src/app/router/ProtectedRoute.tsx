import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useStore2 } from "../store/store2";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = useStore2((s) => s.user);
  const location = useLocation();
  const { userId } = useParams<{ userId?: string }>();

  // Not logged in -> go to login, remembering where they were headed.
  if (!user?.id) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Logged in but trying to open someone else's dashboard -> send to their own.
  if (userId && String(userId) !== String(user.id)) {
    return <Navigate to={`/dashboard/${user.id}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
