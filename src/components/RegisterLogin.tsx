// RegisterLogin.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [message, setMessage] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api1.thestoryevolves.com/api/check_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
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
      const response = await fetch('https://api1.thestoryevolves.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setIsLoggedIn(true);
        navigate('/lobby'); // Redirect to lobby after successful login
      } else {
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
      const response = await fetch('https://api1.thestoryevolves.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        navigate('/lobby'); // Redirect to lobby after successful registration
      } else {
        setMessage('An account with this email already exists.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
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
              <button type="submit" className="button">
                Submit
              </button>
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
                    <button type="submit" className="button">
                      Login
                    </button>
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
                    <button type="submit" className="button">
                      Register
                    </button>
                  </form>
              )}
            </>
        )}
        {!isLoggedIn && message && (
            <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>
              {message}
            </p>
        )}
        <p className="claw-warning">Watch out for... The Claw</p>
        <div className="how-to-play">
          <h3>How to Play:</h3>
          <ol>
            <li>Register with your email, then create a username and password.</li>
            <li>Create or join a story.</li>
            <li>You will spawn in central London.</li>
            <li>
              Each turn lasts 24 hours. Enter what you would like to do in these 24 hours.
              You can mention and interact with other players by username.
              For example "I give Robbie a high five." or "I walk north as far as I can."
            </li>
            <li>The story will evolve only after everyone has made their turn.</li>
          </ol>
        </div>
      </div>
  );
};

export default RegisterLogin;