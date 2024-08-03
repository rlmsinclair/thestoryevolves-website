// App.tsx

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterLogin from './components/RegisterLogin';
import Play from './components/Play';
import Lobby from './components/Lobby';
import Profile from './components/Profile';
import Footer from './components/Footer';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    const handleTabClose = async (event: BeforeUnloadEvent) => {
      event.preventDefault();
      try {
        await axios.post('https://api1.thestoryevolves.com/api/leave_story', {}, { withCredentials: true });
      } catch (error) {
        console.error('Error updating story name:', error);
      }
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <Router>
      <div className="app">
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