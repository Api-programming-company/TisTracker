import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({user}) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;