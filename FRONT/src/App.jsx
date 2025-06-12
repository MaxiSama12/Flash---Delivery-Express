import {BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePages from './pages/HomePages'
import LoginPages from './pages/LoginPages'
import RegisterClientePages from './pages/RegisterClientePages'
import RegisterVendedorPages from './pages/RegisterVendedorPages'
import RegisterRepartidorPages from './pages/RegisterRepartidorPages'
import { HOME, LOGIN, REGISTERCLIENTE, REGISTERVENDEDOR, REGISTERREPARTIDOR, DASHBOARDVENDEDOR, DASHBOARDREPARTIDOR } from './router/route'
import DashboardVendedor from './components/dashboard/DashboardVendedor'
import DashboardRepartidor from './components/dashboard/DashboardRepartidor'


function App() {


  return (
    
    <BrowserRouter>
    <Routes>
      <Route path={HOME} element={<HomePages/>} />
      <Route path={LOGIN} element={<LoginPages/>} />
      <Route path={REGISTERCLIENTE} element={<RegisterClientePages/>} />
      <Route path={REGISTERVENDEDOR} element={<RegisterVendedorPages/>} />
      <Route path={REGISTERREPARTIDOR} element={<RegisterRepartidorPages/>} />
      <Route path={DASHBOARDVENDEDOR} element={<DashboardVendedor/>} />
      <Route path={DASHBOARDREPARTIDOR} element={<DashboardRepartidor/>} />
    </Routes>
    </BrowserRouter>

  )
}

export default App
