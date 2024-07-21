import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Play: React.FC = () => {
  const [message, setMessage] = useState('');

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 51.5074, // Latitude of London
    lng: -0.1278  // Longitude of London
  };

  return (
    <div className="play-container">
      <nav className="navbar">
        <button className="profile-button">Profile</button>
      </nav>
      <div className="map-container">
        <LoadScript googleMapsApiKey="AIzaSyA3x0t8fQNXtfCh1CLzqicUkGyd4qWCm4k">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
          >
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
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Play;