import { useAuthStore } from "../../store/authStore";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoutes({ children, allowedRoles }) {
  const user = useAuthStore((state) => state.usuario);
  const location = useLocation();
  const rol = user?.rol || "anonimo";
  const path = location.pathname;
  // modificable

 if (path === "/login" && rol !== "anonimo") {
    
    if (rol === "cliente") return <Navigate to="/" replace />;

    if (rol === "repartidor") {
      const id = user.id_repartidor;
      return <Navigate to={`/dashboard-repartidor/${id}`} replace />;
    }

    if (rol === "comercio") {
      const id = user.id_comercio;
      return <Navigate to={`/dashboard-vendedor/${id}`} replace />;
    }
  }

  // 🚫 Repartidor solo puede entrar a su dashboard
if (
  rol === "repartidor" &&
  !path.startsWith(`/dashboard-repartidor/${user?.id_repartidor}`)
) {
  return <Navigate to={`/dashboard-repartidor/${user?.id_repartidor}`} replace />;
}

// 🚫 Comercio solo puede entrar a su dashboard
if (
  rol === "comercio" &&
  !path.startsWith(`/dashboard-vendedor/${user?.id_comercio}`)
) {
  return <Navigate to={`/dashboard-vendedor/${user?.id_comercio}`} replace />;
}


  // Verificación final por permisos
  if (!allowedRoles.includes(rol)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
}
