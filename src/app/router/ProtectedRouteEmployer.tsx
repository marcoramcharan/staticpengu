import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../store/store";

const ProtectedRouteEmployer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { employer } = useStore();
  const userID = employer?.user?._id;

  if (!userID) {
    // User is not authenticated, redirect to login
    return <Navigate to="/" replace />;
  }

  return <>{children}</>; // User is authenticated, render the children
};

export default ProtectedRouteEmployer;
