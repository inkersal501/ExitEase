import { Navigate } from "react-router-dom"; 
import useAuth from "../context/useAuth";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, allowedRoles }) => { 
  const { user } = useAuth().getUser; 
  if (!user) {
    return <Navigate to="/" />;
  }

  // eslint-disable-next-line react/prop-types
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
