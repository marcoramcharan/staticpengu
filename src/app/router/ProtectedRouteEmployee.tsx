import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../store/store";

const ProtectedRouteEmployee: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { employee } = useStore();
  const userID = employee?.user?._id;

  if (!userID) {
    // User is not authenticated, redirect to login
    return <Navigate to="/" replace />;
  }

  return <>{children}</>; 
};

export default ProtectedRouteEmployee;
