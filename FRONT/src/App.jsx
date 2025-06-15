import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import "./index.css"
import MisDirecciones from './pages/MisDirecciones/MisDirecciones';

function App() {
  return (

    <BrowserRouter>
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mis-direcciones" element={<MisDirecciones />} />
      </Routes>
   </BrowserRouter>

  );
}

export default App;

