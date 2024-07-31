// Lobby.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Lobby: React.FC = () => {
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const [isJoiningStory, setIsJoiningStory] = useState(false);
  const [storyName, setStoryName] = useState('');
  const navigate = useNavigate();

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
      } else if (isJoiningStory) {
        const response = await axios.post('https://api1.thestoryevolves.com/api/check_story_name', { story_name: storyName }, { withCredentials: true });
        if (response.data.exists) {
          await axios.post('https://api1.thestoryevolves.com/api/update_story_name', { story_name: storyName }, { withCredentials: true });
        } else {
          console.log('Story not found');
        }
      }
      navigate('/play');
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
        </>
      )}
      {(isCreatingStory || isJoiningStory) && (
        <>
          <input type="text" value={storyName} onChange={(e) => setStoryName(e.target.value)} placeholder="Enter story name" />
          <button onClick={handleStoryNameSubmit}>Submit</button>
        </>
      )}
    </div>
  );
};

export default Lobby;