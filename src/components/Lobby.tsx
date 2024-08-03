// Lobby.tsx

import React, { useState, useEffect, KeyboardEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Lobby: React.FC = () => {
  const [isCreatingStory, setIsCreatingStory] = useState(false);
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

  const handleStoryNameSubmit = async () => {
    try {
      await axios.post('https://api1.thestoryevolves.com/api/update_story_name', { story_name: storyName }, { withCredentials: true });
      navigate('/play');
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleJoinStory = async (selectedStoryName: string) => {
    try {
      await axios.post('https://api1.thestoryevolves.com/api/update_story_name', { story_name: selectedStoryName }, { withCredentials: true });
      navigate('/play');
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while joining the story. Please try again.');
    }
  };

  return (
    <div className="lobby-inner-container">
      <h1>Lobby</h1>
      {!isCreatingStory && (
        <>
          <button onClick={handleCreateStory}>Create a Story</button>
          <h2>Available Stories:</h2>
          <ul className="story-list">
            {allStories.map((story, index) => (
              <li key={index} onClick={() => handleJoinStory(story)}>{story}</li>
            ))}
          </ul>
        </>
      )}
      {isCreatingStory && (
        <>
          <input
            type="text"
            value={storyName}
            onKeyPress={handleKeyPress}
            onChange={(e) => setStoryName(e.target.value)}
            placeholder="Enter new story name"
          />
          <button onClick={handleStoryNameSubmit}>Create Story</button>
        </>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Lobby;