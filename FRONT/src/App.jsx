import { Routes, Route, useLocation } from "react-router-dom";
import LoginPages from "./pages/LoginPages";
import RegisterClientePages from "./pages/RegisterClientePages";
import RegisterRepartidorPages from "./pages/RegisterRepartidorPages";
import "./index.css";
import {
  HOME,
  LOGIN,
  REGISTERCLIENTE,
  REGISTERREPARTIDOR,
  DASHBOARDREPARTIDOR,
  REGISTERCOMERCIO,
  COMERCIO,
  LISTACOMERCIO,
} from "./router/route";
import RegisterComercioPages from "./pages/RegisterComercioPages";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import DashboardVendedor from "./components/dashboard/DashboardVendedor";
import DashboardRepartidor from "./components/dashboard/DashboardRepartidor";
import ListaComerciosPage from "./pages/ListaComerciosPage";
import ComercioPage from "./pages/ComercioPage";
import NotFound from "./pages/NotFound";
import Cart from "./components/ui/Cart";
import { useState } from "react";
import MisDirecciones from "./pages/MisDirecciones/MisDirecciones";
import LoginForm from "./components/auth/LoginForm";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import MiPerfil from "./pages/MiPerfil/MiPerfil";
import MisPedidos from "./pages/MisPedidos/MisPedidos";

function App() {
  const [isBouncing, setIsBouncing] = useState(false);
  const location = useLocation();
  const ocultarCart = /(dashboard|login|register)/.test(location.pathname);

  return (
    <>
      {!ocultarCart && <Cart isBouncing={isBouncing} />}
      <ToastContainer />
      <Routes>
        {/* DASHBOARD VENDEDOR */}
        <Route
          path="/dashboard-vendedor/:id"
          element={
            <ProtectedRoutes allowedRoles={["comercio"]}>
              <DashboardVendedor />
            </ProtectedRoutes>
          }
        />

        {/* HOME */}
        <Route
          path={HOME}
          element={
            <ProtectedRoutes allowedRoles={["cliente", "anonimo"]}>
              <HomePage
                onAddToCartAnimation={() => {
                  setIsBouncing(true);
                  setTimeout(() => setIsBouncing(false), 400);
                }}
              />
            </ProtectedRoutes>
          }
        />

        {/* LOGIN */}
        <Route
          path={LOGIN}
          element={
            <ProtectedRoutes allowedRoles={["anonimo"]}>
              <LoginPages />
            </ProtectedRoutes>
          }
        />

        {/* LISTA COMERCIO */}
        <Route
          path={LISTACOMERCIO}
          element={
            <ProtectedRoutes allowedRoles={["anonimo", "cliente"]}>
              <ListaComerciosPage />
            </ProtectedRoutes>
          }
        />

        {/* REGISTRO CLIENTES */}
        <Route
          path={REGISTERCLIENTE}
          element={
            <ProtectedRoutes allowedRoles={["anonimo"]}>
              <RegisterClientePages />
            </ProtectedRoutes>
          }
        />

        {/* REGISTRO REPARTIDOR */}
        <Route
          path={REGISTERREPARTIDOR}
          element={
            <ProtectedRoutes allowedRoles={["anonimo"]}>
              <RegisterRepartidorPages />
            </ProtectedRoutes>
          }
        />

        {/* MIS DIRECCIONES */}
        <Route
          path="/mis-direcciones"
          element={
            <ProtectedRoutes allowedRoles={["cliente"]}>
              <MisDirecciones />
            </ProtectedRoutes>
          }
        />

         {/* MIS PEDIDOS */}
        <Route
          path="/mis-pedidos"
          element={
            <ProtectedRoutes allowedRoles={["cliente"]}>
              <MisPedidos /> 
            </ProtectedRoutes>
          }
        />

         {/* MI PERFIL */}
        <Route
          path="/mi-perfil"
          element={
            <ProtectedRoutes allowedRoles={["cliente"]}>
              <MiPerfil /> 
            </ProtectedRoutes>
          }
        />

        {/* DASHBOARD REPARTIDOR */}
        <Route
          path="/dashboard-repartidor/:id"
          element={
            <ProtectedRoutes allowedRoles={["repartidor"]}>
              <DashboardRepartidor />
            </ProtectedRoutes>
          }
        />

        {/* ERROR 404 */}
        <Route path="*" element={<NotFound />} />

        {/* REGISTRO COMERCIO */}
        <Route
          path={REGISTERCOMERCIO}
          element={
            <ProtectedRoutes allowedRoles={["anonimo"]}>
              <RegisterComercioPages />
            </ProtectedRoutes>
          }
        />

        {/* COMERCIO POR ID */}
        <Route
          path={`${COMERCIO}/:id`}
          element={
            <ProtectedRoutes allowedRoles={["anonimo", "cliente"]}>
              <ComercioPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}
export default App;
