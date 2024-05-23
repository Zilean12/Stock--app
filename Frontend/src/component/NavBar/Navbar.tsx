import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import AuthContext from '../../contexts/AuthContext';

const Navbar = () => {
  const { userName } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWatchlistClick = () => {
    navigate('/watchlist'); // Navigate to the watchlist page
    handleClose(); // Close the menu
  };

  return (
    <AppBar position="fixed" className={styles.navbar}>
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {userName ? (
          <>
            <Button color="inherit" component={Link} to="/stockdashboard">Stock Dashboard</Button>
            <Button color="inherit" onClick={handleClick}>
              {`Welcome, ${userName}`}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/profile">Profile</MenuItem>
              <MenuItem onClick={handleWatchlistClick}>Watchlist</MenuItem> {/* Button for Watchlist */}
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
