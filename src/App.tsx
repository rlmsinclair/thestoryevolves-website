import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterLogin from './components/RegisterLogin';
import Play from './components/Play';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<RegisterLogin onLogin={handleLogin} />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;