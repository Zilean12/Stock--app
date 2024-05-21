import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, FormHelperText, Link, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material'; // Import icons for password visibility and email
import './Login.css'; // Import CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      // Handle successful login, e.g., set user authentication state
      window.location.href = '/dashboard'; // Redirect to dashboard after successful login
    } catch (error) {
      setError('Invalid email or password. Please try again.'); // Update error message
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  return (
    <Container maxWidth="sm">
      <Box className="login-container">
        <Typography variant="h4" gutterBottom className="login-heading">
          Log In
        </Typography>
        <form onSubmit={handleLogin} className="login-form">
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email className="input-icon" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'} // Toggle password visibility based on state
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ // Add input adornment for password visibility toggle
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className="input-icon" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Button type="submit" variant="contained" color="primary" fullWidth className="login-button">
            Login
          </Button>
        </form>
        <Box mt={2}>
          <Typography className="register-text">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/" className="register-link">
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
