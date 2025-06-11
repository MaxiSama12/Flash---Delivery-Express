import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroHomePage from './components/ui/HeroHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;

