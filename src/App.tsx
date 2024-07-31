// App.tsx

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterLogin from './components/RegisterLogin';
import Play from './components/Play';
import Lobby from './components/Lobby';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<RegisterLogin />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/play" element={<Play />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;