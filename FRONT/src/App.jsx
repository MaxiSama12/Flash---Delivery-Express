import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
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
} from "./router/route";
import DashboardVendedor from "./components/dashboard/DashboardVendedor";
import DashboardRepartidor from "./components/dashboard/DashboardRepartidor";
import RegisterComercioPages from "./pages/RegisterComercioPages";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<HomePage />} />
        <Route path={LOGIN} element={<LoginPages />} />
        <Route path={REGISTERCLIENTE} element={<RegisterClientePages />} />

        <Route
          path={REGISTERREPARTIDOR}
          element={<RegisterRepartidorPages />}
        />
        <Route path={DASHBOARDREPARTIDOR} element={<DashboardRepartidor />} />

        <Route path={REGISTERVENDEDOR} element={<RegisterVendedorPages />} />
        <Route path={REGISTERCOMERCIO} element={<RegisterComercioPages />} />
        <Route path={DASHBOARDVENDEDOR} element={<DashboardVendedor />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
