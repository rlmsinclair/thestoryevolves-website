import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const response = await axios.post(
        'https://api.thestoryevolves.com/api/check_email',
        { email },
        { withCredentials: true }
      );
      setIsRegistered(response.data.is_registered);
      setEmailSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://api.thestoryevolves.com/api/login',
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        setIsLoggedIn(true);
        navigate('/play');
      } else {
        console.error('Error:', response.data.message);
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'https://api.thestoryevolves.com/api/register',
      { name: username, email, password },
      { withCredentials: true }
    );
    setMessage(response.data.message);
    navigate('/play'); // Redirect to the play page after successful registration
  } catch (error) {
    console.error('Error:', error);
    setMessage('An account with this email already exists.');
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
    </div>
  );
};

export default RegisterLogin;