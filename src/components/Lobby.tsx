// Lobby.tsx

import React, { useState, useEffect, KeyboardEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Lobby: React.FC = () => {
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const [isJoiningStory, setIsJoiningStory] = useState(false);
  const [storyName, setStoryName] = useState('');
  const [message, setMessage] = useState('');
  const [allStories, setAllStories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllStories();
  }, []);

  const fetchAllStories = async () => {
    try {
      const response = await axios.get('https://api1.thestoryevolves.com/api/get_all_stories', { withCredentials: true });
      if (response.status === 200) {
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleStoryNameSubmit();
    }
  };

  const handleCreateStory = async () => {
    try {
      await axios.post('https://api1.thestoryevolves.com/api/update_storymaster', { is_storymaster: true }, { withCredentials: true });
      setIsCreatingStory(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleJoinStory = () => {
    setIsJoiningStory(true);
  };

  const handleStoryNameSubmit = async () => {
    try {
      if (isCreatingStory) {
        await axios.post('https://api1.thestoryevolves.com/api/update_story_name', { story_name: storyName }, { withCredentials: true });
        navigate('/play');
      } else if (isJoiningStory) {
        const response = await axios.post('https://api1.thestoryevolves.com/api/check_story_name', { story_name: storyName }, { withCredentials: true });
        if (response.data.exists) {
          await axios.post('https://api1.thestoryevolves.com/api/update_story_name', { story_name: storyName }, { withCredentials: true });
          navigate('/play');
        } else {
          setMessage('Invalid story name. Please enter a valid story name.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="lobby-container">
      <h1>Lobby</h1>
      {!isCreatingStory && !isJoiningStory && (
        <>
          <button onClick={handleCreateStory}>Create a Story</button>
          <button onClick={handleJoinStory}>Join a Story</button>
          <h2>Available Stories:</h2>
          <ul className="story-list">
            {allStories.map((story, index) => (
              <li key={index} onClick={() => setStoryName(story)}>{story}</li>
            ))}
          </ul>
        </>
      )}
      {(isCreatingStory || isJoiningStory) && (
        <>
          <input
            type="text"
            value={storyName}
            onKeyPress={handleKeyPress}
            onChange={(e) => setStoryName(e.target.value)}
            placeholder="Enter story name"
          />
          <button onClick={handleStoryNameSubmit}>Submit</button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Lobby;