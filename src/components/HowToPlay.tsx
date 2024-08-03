// HowToPlay.tsx

import React from 'react';
import { useLocation } from 'react-router-dom';

const HowToPlay: React.FC = () => {
  const location = useLocation();

  // Don't render the How to Play section on the Play screen
  if (location.pathname === '/play') {
    return null;
  }

  return (
    <div className="how-to-play">
      <h3>How to Play:</h3>
      <ol>
        <li>Register with your email, then create a username and password.</li>
        <li>Create or join a story.</li>
        <li>You will spawn in central London.</li>
        <li>Each turn lasts 24 hours. Enter what you would like to do in these 24 hours. You can mention and interact with other players by username. For example "I give Robbie a high five." or "I walk north as far as I can."</li>
        <li>The story will evolve only after everyone has made their turn.</li>
      </ol>
    </div>
  );
};

export default HowToPlay;