import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import '../src/styles/main.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="flex-grow-1 container mt-5">
        <h1>Bienvenido a Flash Express</h1>
        <p>Acá va el contenido principal...</p>
        <App />
      </div>
      <Footer />
    </div>
  </StrictMode>,
)
