// Profile.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserInfo {
  email: string;
  username: string;
  user_output: string;
  is_storymaster: boolean;
  story_name: string;
}

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('https://api1.thestoryevolves.com/api/user_info', {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {userInfo ? (
        <div>
          <p>
            <strong>Username:</strong> {userInfo.username}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;