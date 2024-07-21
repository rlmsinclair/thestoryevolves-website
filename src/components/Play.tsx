import React, { useState } from 'react';

const Play: React.FC = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="play-container">
      <nav className="navbar">
        <button className="profile-button">Profile</button>
      </nav>
      <div className="map-container">
        {/* Add your map component or image here */}
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