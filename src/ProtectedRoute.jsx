import { Navigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ Component }) => {

  const { anchorConnected, waxConnected, playerIsLogged } = useSelector((state) => state.user)

  if (!waxConnected && !anchorConnected) {
    // return <Navigate to="/home" replace />;
    return <Navigate to="/my-nfts" replace />;
  }
  if (!playerIsLogged) {
    return <Navigate to="/login" replace />
  }
  return <Component />;
};

export default ProtectedRoute;