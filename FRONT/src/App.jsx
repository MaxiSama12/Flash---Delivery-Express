import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import "./index.css"
import MisDirecciones from './pages/MisDirecciones/MisDirecciones';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer'
function App() {
  return (

    <BrowserRouter>
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="flex-grow-1 container">
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mis-direcciones" element={<MisDirecciones />} />
      </Routes>
      </div>
        <Footer />
      </div>
   </BrowserRouter>

  );
}

export default App;

