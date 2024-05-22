// Profile.tsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import avatarImage from '../../assets/avatar1.png';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserData {
  user: User;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          navigate('/login');
          return;
        }
        const response = await axios.get<UserData>('http://localhost:3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData(response.data);

        // Store username in local storage
        localStorage.setItem('userName', response.data.user.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Box className={styles.profileContainer}>
      <Box className={styles.avatarContainer}>
        <Avatar className={styles.avatar} alt="User Avatar" src={avatarImage} sx={{ width: 150, height: 160 }} />
      </Box>
      <Box className={styles.userInfo}>
        <Typography variant="h5" className={styles.userName}>Name: {userData.user.name}</Typography>
        <Typography variant="subtitle1" className={styles.userId}>User ID: {userData.user._id}</Typography>
        <Typography variant="subtitle1" className={styles.userEmail}>Email: {userData.user.email}</Typography>
      </Box>
    </Box>
  );
};

export default Profile;