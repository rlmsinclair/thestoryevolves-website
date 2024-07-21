import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterLogin from './components/RegisterLogin';
import Play from './components/Play';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<RegisterLogin />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;