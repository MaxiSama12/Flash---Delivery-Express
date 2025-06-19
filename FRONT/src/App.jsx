import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LoginPages from "./pages/LoginPages";
import RegisterClientePages from "./pages/RegisterClientePages";
import RegisterVendedorPages from "./pages/RegisterVendedorPages";
import RegisterRepartidorPages from "./pages/RegisterRepartidorPages";
import "./index.css";
import {
  HOME,
  LOGIN,
  REGISTERCLIENTE,
  REGISTERVENDEDOR,
  REGISTERREPARTIDOR,
  DASHBOARDVENDEDOR,
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
import MiPerfil from "./pages/MiPerfil/MiPerfil";

function App() {
  const [isBouncing, setIsBouncing] = useState(false);

  return (
    <BrowserRouter>
      <Cart isBouncing={isBouncing} />
      <ToastContainer />
      <Routes>
        <Route path="/vendedor/:id" element={<DashboardVendedor />} />

        <Route path="/repartidor" element={<DashboardRepartidor />} />

        <Route
          path={HOME}
          element={
            <HomePage
              onAddToCartAnimation={() => {
                setIsBouncing(true);
                setTimeout(() => setIsBouncing(false), 400);
              }}
            />
          }
        />
        <Route path={LOGIN} element={<LoginPages />} />
        <Route path={LISTACOMERCIO} element={<ListaComerciosPage />} />
        <Route path={REGISTERCLIENTE} element={<RegisterClientePages />} />
        {console.log("hola mundo")}
        <Route
          path={REGISTERREPARTIDOR}
          element={<RegisterRepartidorPages />}
        />
        <Route path="/mi-perfil" element={<MiPerfil/>}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/mis-direcciones" element={<MisDirecciones />} />
        <Route path={DASHBOARDREPARTIDOR} element={<DashboardRepartidor />} />
        <Route path="*" element={<NotFound />} />
        <Route path={REGISTERVENDEDOR} element={<RegisterVendedorPages />} />
        <Route path={REGISTERCOMERCIO} element={<RegisterComercioPages />} />
        <Route path={DASHBOARDVENDEDOR} element={<DashboardVendedor />} />
        <Route path={`${COMERCIO}/:id`} element={<ComercioPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
