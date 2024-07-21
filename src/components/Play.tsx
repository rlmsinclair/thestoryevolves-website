import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const Play: React.FC = () => {
  const [message, setMessage] = useState('');

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
      </nav>
      <div className="map-container">
        <LoadScript googleMapsApiKey="AIzaSyA3x0t8fQNXtfCh1CLzqicUkGyd4qWCm4k">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
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