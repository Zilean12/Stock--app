import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import './Dashboard.css'; // Import the CSS file

const avatars = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/1.jpg',
  'https://randomuser.me/api/portraits/men/2.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
];

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token not found');
        }
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
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

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarChange = (avatar) => {
    setUserData((prevData) => ({
      ...prevData,
      user: { ...prevData.user, avatar },
    }));
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="profile-container">
      <Avatar
        className="profile-avatar"
        src={userData.user.avatar || userData.user.name[0]}
        onClick={handleAvatarClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAvatarClose}
      >
        {avatars.map((avatar, index) => (
          <MenuItem key={index} onClick={() => handleAvatarChange(avatar)}>
            <Avatar src={avatar} />
          </MenuItem>
        ))}
      </Menu>
      <Typography variant="h4" className="profile-name">Name: {userData.user.name}</Typography>
      <Typography variant="subtitle1" className="profile-email">Email ID: {userData.user.email}</Typography>
      <Typography variant="subtitle1" className="profile-role">{userData.user.role}</Typography>
      <Button variant="contained" color="secondary" className="logout-button" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
