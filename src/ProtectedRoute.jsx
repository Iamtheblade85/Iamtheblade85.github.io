import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ Component }) => {
  const { anchorConnected, waxConnected } = useSelector((state) => state.user);

  if (!waxConnected && !anchorConnected) {
    return <Navigate to="/home" replace />;
  }
  return <Component />;
};

export default ProtectedRoute;
