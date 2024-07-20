import { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [message, setMessage] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://thestoryevolves-api-qnk39.ondigitalocean.app/api/check_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setIsRegistered(data.is_registered);
      setEmailSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://thestoryevolves-api-qnk39.ondigitalocean.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setIsLoggedIn(true);
      } else {
        const data = await response.json();
        console.error('Error:', data.message);
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://thestoryevolves-api-qnk39.ondigitalocean.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, email, password }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('An account with this email already exists.');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Register or Login</h1>
        {!emailSubmitted ? (
          <form onSubmit={handleEmailSubmit} className="form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
            <button type="submit" className="button">Submit</button>
          </form>
        ) : (
          <>
            {isLoggedIn ? (
              <p className="message success">{message}</p>
            ) : isRegistered ? (
              <form onSubmit={handleLogin} className="form">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input"
                />
                <button type="submit" className="button">Login</button>
              </form>
            ) : (
              <form onSubmit={handleRegistration} className="form">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input"
                />
                <button type="submit" className="button">Register</button>
              </form>
            )}
          </>
        )}
        {!isLoggedIn && message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
      </div>
    </div>
  );
}

export default App;