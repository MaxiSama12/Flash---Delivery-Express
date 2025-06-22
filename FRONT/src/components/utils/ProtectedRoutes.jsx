import { useAuthStore } from "../../store/authStore";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children, allowedRoles }) {
  const user = useAuthStore((state) => state.usuario);

  if (!user || !allowedRoles.includes(user.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
