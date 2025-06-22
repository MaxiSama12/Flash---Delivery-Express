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

function App() {
  const [isBouncing, setIsBouncing] = useState(false);
  const location = useLocation();
  const ocultarCart = /vendedor/.test(location.pathname);

  return (
    <>
      {!ocultarCart && <Cart isBouncing={isBouncing} />}
      <ToastContainer />
      <Routes>
        <Route
          path="/dashboard-vendedor/:id"
          element={
            <ProtectedRoutes allowedRoles={["comercio"]}>
              <DashboardVendedor />
            </ProtectedRoutes>
          }
        />

        {/* <Route path="/repartidor" element={<DashboardRepartidor />} /> */}

        <Route
          path={HOME}
          element={
            <ProtectedRoutes allowedRoles={["cliente"]}>
              <HomePage
                onAddToCartAnimation={() => {
                  setIsBouncing(true);
                  setTimeout(() => setIsBouncing(false), 400);
                }}
              />
            </ProtectedRoutes>
          }
        />
        <Route path={LOGIN} element={<LoginPages />} />
        <Route path={LISTACOMERCIO} element={<ListaComerciosPage />} />
        <Route path={REGISTERCLIENTE} element={<RegisterClientePages />} />
        <Route
          path={REGISTERREPARTIDOR}
          element={<RegisterRepartidorPages />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/mis-direcciones" element={<MisDirecciones />} />
        <Route
          path="/dashboard-repartidor/:id"
          element={
            <ProtectedRoutes allowedRoles={["repartidor"]}>
              <DashboardRepartidor />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path={REGISTERCOMERCIO} element={<RegisterComercioPages />} />
        {/* <Route path={DASHBOARDVENDEDOR} element={<DashboardVendedor />} /> */}
        <Route path={`${COMERCIO}/:id`} element={<ComercioPage />} />
      </Routes>
    </>
  );
}
export default App;
