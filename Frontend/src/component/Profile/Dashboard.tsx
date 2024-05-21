import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
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

const Dashboard: React.FC = () => {
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
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Box className={styles.profileContainer}>
      <Box className={styles.avatarContainer}>
        {/* <Avatar className={styles.avatar} sx={{ width: 150, height: 160 }}>
           {userData && userData.user && userData.user.name ? userData.user.name[0] : ''}
        </Avatar>     */}
        <Avatar className={styles.avatar} alt="User Avatar" src={avatarImage} sx={{ width: 150, height: 160 }} />

      </Box>
      <Box className={styles.userInfo}>
        <Typography variant="h5" className={styles.userName}>Name: {userData.user.name}</Typography>
        <Typography variant="subtitle1" className={styles.userId}>User ID: {userData.user._id}</Typography>
        <Typography variant="subtitle1" className={styles.userEmail}>Email: {userData.user.email}</Typography>
        <br />
        <Button className={styles.logoutButton} onClick={handleLogout}>
          <span style={{ fontWeight: 'bold', color: 'black' }}>Logout</span>
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard; 
