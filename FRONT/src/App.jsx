import {BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePages from './pages/HomePages'
import LoginPages from './pages/LoginPages'
import RegisterPages from './pages/RegisterPages'
import { HOME, LOGIN, REGISTERCLIENTE, REGISTERVENDEDOR, REGISTERREPARTIDOR } from './router/route'


function App() {


  return (
    
    <BrowserRouter>
    <Routes>
      <Route path={HOME} element={<HomePages/>} />
      <Route path={LOGIN} element={<LoginPages/>} />
      <Route path={REGISTERCLIENTE} element={<RegisterPages/>} />
      <Route path={REGISTERVENDEDOR} element={<RegisterPages/>} />
      <Route path={REGISTERREPARTIDOR} element={<RegisterPages/>} />
    </Routes>
    </BrowserRouter>

  )
}

export default App
