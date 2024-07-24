import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface UserLocation {
  id: number;
  username: string;
  lat: number;
  lng: number;
  user_output: string;
}

const Play: React.FC = () => {
  const [message, setMessage] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [allUserLocations, setAllUserLocations] = useState<UserLocation[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationsResponse, userInfoResponse] = await Promise.all([
          fetch('https://api.thestoryevolves.com/api/all_user_locations', {
            credentials: 'include',
          }),
          fetch('https://api.thestoryevolves.com/api/user_info', {
            credentials: 'include',
          }),
        ]);

        if (locationsResponse.ok) {
          const locationsData = await locationsResponse.json();
          setAllUserLocations(locationsData);
          console.log('All User Locations:', locationsData);

          // Find the current user's location
          const currentUserLocation = locationsData.find(
            (user: UserLocation) => user.username === currentUser
          );
          if (currentUserLocation) {
            setUserLocation({
              lat: currentUserLocation.lat,
              lng: currentUserLocation.lng,
            });
          }
        }

        if (userInfoResponse.ok) {
          const userInfoData = await userInfoResponse.json();
          setCurrentUser(userInfoData.username);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 2000); // Fetch every 2 seconds

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, [currentUser]);

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      try {
        const response = await fetch('https://api.thestoryevolves.com/api/user_turn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_input: message }),
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User input stored successfully:', data.message);
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
      const response = await fetch('https://api.thestoryevolves.com/api/system_turn', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('System turn initialized successfully:', data.message);
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
            {allUserLocations.map((user) => (
              <Marker
                key={user.id}
                position={{ lat: user.lat, lng: user.lng }}
                title={user.username}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="output-container">
        {allUserLocations.map((user) => (
          <div key={user.id} className={`user-output ${user.username === currentUser ? 'current-user' : ''}`}>
            <strong>{user.username}:</strong> {user.user_output && <span>{user.user_output}</span>}
          </div>
        ))}
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