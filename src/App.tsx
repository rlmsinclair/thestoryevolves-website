// App.tsx

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterLogin from './components/RegisterLogin';
import Play from './components/Play';
import Lobby from './components/Lobby';
import Profile from './components/Profile';
import Footer from './components/Footer';
import HowToPlay from './components/HowToPlay';

function App() {
  return (
    <Router>
      <div className="app">
        <HowToPlay />
        <Routes>
          <Route path="/" element={<RegisterLogin />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/play" element={<Play />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;