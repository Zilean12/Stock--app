import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, FormHelperText, IconButton, InputAdornment } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import './Register.css';

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
}

const Register: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError('');
    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError('Password must be at least 8 characters long, contain both uppercase and lowercase letters, have at least one number, and have at least one special character.');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
    setPasswordError('');
    // Check if passwords match
    if (newPassword !== password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const checkUppercase = (str: string) => {
    return /[A-Z]/.test(str);
  };

  const checkLowercase = (str: string) => {
    return /[a-z]/.test(str);
  };

  const checkNumber = (str: string) => {
    return /\d/.test(str);
  };

  const checkSpecialChar = (str: string) => {
    return /[!@#$%^&*]/.test(str);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', {
        name,
        email,
        password,
      });
      console.log(response.data);
      onSubmit(name, email, password); // or handle the successful submission as needed
    } catch (error: any) {
      setApiError(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleLoginNavigate = () => {
    navigate('/login');
  };

  return (
    <Container className="register-container">
      <Box className="form-container">
        <Typography component="h1" variant="h4" className="title">
          Create an Account
        </Typography>
        <Typography component="p" className="subtitle">
          Join for exclusive access!
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={handleNameChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {password !== '' && (
                    <>
                      {checkUppercase(password) ? <CheckCircleOutlineIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />}
                      {checkLowercase(password) ? <CheckCircleOutlineIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />}
                      {checkNumber(password) ? <CheckCircleOutlineIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />}
                      {checkSpecialChar(password) ? <CheckCircleOutlineIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />}
                    </>
                  )}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={!!passwordError}
            helperText={passwordError || ' '}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {confirmPassword !== '' && (
                    <>
                      {password === confirmPassword ? <CheckCircleOutlineIcon style={{ color: 'green' }} /> :
                      <CancelIcon style={{ color: 'red' }} />}
                    </>
                  )}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                color: password === confirmPassword && confirmPassword !== '' ? 'green' : 'red',
              },
            }}
            InputLabelProps={{ shrink: true }}
          />
          {apiError && (
            <FormHelperText error>{apiError}</FormHelperText>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit-button"
            disabled={!!passwordError || password !== confirmPassword}
          >
            Create Account
          </Button>
          <br />
          <br />
            <Typography component="p" className="subtitle">
                Already have an account? <Link to="/login">Login</Link>
            </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Register;