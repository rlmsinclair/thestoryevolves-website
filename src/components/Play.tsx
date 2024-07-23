import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const Play: React.FC = () => {
  const [message, setMessage] = useState('');
  const [userOutput, setUserOutput] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const fetchUserOutput = async () => {
      try {
        const response = await axios.get(
          'https://thestoryevolves-api-qnk39.ondigitalocean.app/api/user_output',
          { withCredentials: true }
        );

        if (response.status === 200) {
          setUserOutput(response.data.user_output);
          setUserLocation({ lat: response.data.lat, lng: response.data.lng });
        }
      } catch (error) {
        console.error('Error:', error);
      }

      // Schedule the next fetch after a delay
      setTimeout(fetchUserOutput, 1000);
    };

    fetchUserOutput();
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

  const defaultCenter = {
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
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation || defaultCenter}
            zoom={10}
          >
            {userLocation && <Marker position={userLocation} />}
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