import { useAuthStore } from "../../store/authStore";
import { Navigate, useLocation, useParams } from "react-router-dom";

export default function ProtectedRoutes({ children, allowedRoles }) {
  const user = useAuthStore((state) => state.usuario);
  const location = useLocation();
  const rol = user?.rol || "anonimo";
  const path = location.pathname;
  // modificable


  
  return <>{children}</>;
}
