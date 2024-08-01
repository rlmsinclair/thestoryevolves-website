// Play.tsx

import React, { useState, useEffect, KeyboardEvent } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [isStoryEvolving, setIsStoryEvolving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationsResponse, userInfoResponse, allSubmittedResponse] = await Promise.all([
          axios.get('https://api1.thestoryevolves.com/api/all_user_locations', {
            withCredentials: true,
          }),
          axios.get('https://api1.thestoryevolves.com/api/user_info', {
            withCredentials: true,
          }),
          axios.get('https://api1.thestoryevolves.com/api/check_all_submitted', {
            withCredentials: true,
          }),
        ]);

        if (locationsResponse.status === 200) {
          setAllUserLocations(locationsResponse.data);
          console.log('All User Locations:', locationsResponse.data);

          // Find the current user's location
          const currentUserLocation = locationsResponse.data.find(
            (user: UserLocation) => user.username === currentUser
          );
          if (currentUserLocation) {
            setUserLocation({
              lat: currentUserLocation.lat,
              lng: currentUserLocation.lng,
            });
          }
        }

        if (userInfoResponse.status === 200) {
          setCurrentUser(userInfoResponse.data.username);
        }

        if (allSubmittedResponse.status === 200 && allSubmittedResponse.data.all_submitted) {
          console.log('All users have submitted their input. The story is evolving!');
          setIsStoryEvolving(true);
        } else {
          setIsStoryEvolving(false);
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

  useEffect(() => {
    const pollSystemTurn = async () => {
      try {
        const response = await axios.post(
          'https://api1.thestoryevolves.com/api/system_turn',
          {},
          { withCredentials: true }
        );

        if (response.status === 200) {
          console.log('System turn executed successfully:', response.data.message);
        } else {
          console.error('Error executing system turn:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const intervalId = setInterval(pollSystemTurn, 5000); // Poll every 5 seconds

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      try {
        const response = await axios.post(
          'https://api1.thestoryevolves.com/api/user_turn',
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

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
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
        <button className="profile-button" onClick={handleProfileClick}>
          Profile
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
        {isStoryEvolving && (
          <div className="story-evolving-message">The story is evolving...</div>
        )}
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
          onKeyPress={handleKeyPress}
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