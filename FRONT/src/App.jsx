import {BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePages from './pages/HomePages'
import LoginPages from './pages/LoginPages'
import { HOME, LOGIN } from './router/route'


function App() {


  return (
    
    <BrowserRouter>
    <Routes>
      <Route path={HOME} element={<HomePages/>} />
      <Route path={LOGIN} element={<LoginPages/>} />
    </Routes>
    </BrowserRouter>

  )
}

export default App
