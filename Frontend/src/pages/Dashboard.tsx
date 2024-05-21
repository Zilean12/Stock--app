import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import styles from './Dashboard.module.css'; // Import the CSS module

interface User {
  name: string;
  email: string;
  role: string;
}

interface UserData {
  user: User;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token not found');
        }
        const response = await axios.get<UserData>('http://localhost:3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Box className={styles.profileContainer}>
      <Avatar className={styles.avatar}>{userData.user.name[0]}</Avatar>
      <Typography variant="h4" className={styles.userName}>Name: {userData.user.name}</Typography>
      <Typography variant="subtitle1" className={styles.userEmail}>Email: {userData.user.email}</Typography>
    </Box>
  );
};

export default Dashboard;
