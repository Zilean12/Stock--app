import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import AuthContext from '../../contexts/AuthContext';



const Navbar = () => {
    const { userName } = useContext(AuthContext);
    const [displayUserName, setDisplayUserName] = useState(userName);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    setUserName(null);
    navigate('/login');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={styles.navbar}>
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {userName ? ( // Check if userName is available in context
          <>
            <Button color="inherit" onClick={handleClick}>
              {`Welcome, ${userName}`}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;