import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const Play: React.FC = () => {
  const [message, setMessage] = useState('');
  const [userOutput, setUserOutput] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('https://thestoryevolves-api-qnk39.ondigitalocean.app/api/user_output_stream');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setUserOutput(data.user_output);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      try {
        const response = await axios.post(
          'https://thestoryevolves-api-qnk39.ondigitalocean.app/api/user_turn',
          { user_input: message },
          { withCredentials: true }
        );

        if (response.status === 200) {
          console.log('User input stored successfully:', response.data.message);
          setMessage('');
        } else {
          console.error('Error storing user input:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleInitializeSystemTurn = async () => {
    try {
      const response = await axios.post(
        'https://thestoryevolves-api-qnk39.ondigitalocean.app/api/system_turn',
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log('System turn initialized successfully:', response.data.message);
      } else {
        console.error('Error initializing system turn:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 51.5074,
    lng: -0.1278,
  };

  return (
    <div className="play-container">
      <nav className="navbar">
        <button className="profile-button">Profile</button>
        <button className="initialize-system-turn-button" onClick={handleInitializeSystemTurn}>
          Initialise System Turn
        </button>
      </nav>
      <div className="map-container">
        <LoadScript googleMapsApiKey="AIzaSyA3x0t8fQNXtfCh1CLzqicUkGyd4qWCm4k">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="output-container">
        <p className="user-output">{userOutput}</p>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Play;