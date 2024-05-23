import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Avatar, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import avatarImage from '../../assets/avatar1.png';
import AuthContext from '../../contexts/AuthContext';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  gender: string;
}

interface UserData {
  user: User;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('Other');
  const navigate = useNavigate();
  const { setUserName } = useContext(AuthContext);

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
        setName(response.data.user.name);
        setGender(response.data.user.gender);
        setUserName(response.data.user.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate, setUserName]);

  const handleUpdateProfile = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        navigate('/login');
        return;
      }
      const response = await axios.patch<UserData>('http://localhost:3000/api/auth/profile', {
        name,
        gender,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserData(response.data);
      setUserName(response.data.user.name);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Box className={styles.profileContainer}>
      <Box className={styles.avatarContainer}>
        <Avatar className={styles.avatar} alt="User Avatar" src={avatarImage} sx={{ width: 150, height: 160 }} />
      </Box>
      {editMode ? (
        <Box className={styles.userInfo}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gender"
            select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <Button variant="contained" color="primary" onClick={handleUpdateProfile}>Save</Button>
          <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
        </Box>
      ) : (
        <Box className={styles.userInfo}>
          <Typography variant="h5" className={styles.userName}>Name: {userData.user.name}</Typography>
          <Typography variant="subtitle1" className={styles.userId}>User ID: {userData.user._id}</Typography>
          <Typography variant="subtitle1" className={styles.userEmail}>Email: {userData.user.email}</Typography>
          <Typography variant="subtitle1" className={styles.userGender}>Gender: {userData.user.gender}</Typography>
          <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>Edit Profile</Button>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
