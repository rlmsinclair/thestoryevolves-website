import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  // Don't render the footer on the Play screen
  if (location.pathname === '/play') {
    return null;
  }

  return (
    <footer className="footer">
      Created with 🔥 by Robbie Sinclair
    </footer>
  );
};

export default Footer;