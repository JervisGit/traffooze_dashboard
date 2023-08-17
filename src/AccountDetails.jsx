import React, { useCallback, useState } from 'react';
import { Box, Button, Stack, Card, CardActions, CardContent, CardHeader, Divider, TextField, Grid } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const AccountProfileDetails = () => {
  const [loginValues, setLoginValues] = useState({
    username: '',
    password: '',
  });

  const [registerValues, setRegisterValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '', // Added email field
  });

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

  const handleLoginChange = useCallback(
    (event) => {
      setLoginValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleRegisterChange = useCallback(
    (event) => {
      setRegisterValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = loginValues;
    console.log('Logging in with:', username, password); // Log the login data

    if (!username.trim() || !password.trim()) {
      Swal.fire('Error', 'Please enter both username and password', 'error');
      return;
    }

    try {
      const response = await axios.post('https://traffoozebackend.vercel.app/login/', {
        username: username,
        password: password,
      });

      console.log('Login response:', response); // Log the login response

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
        Swal.fire('Success', 'Logged in successfully', 'success');
      } else {
        Swal.fire('Error', 'Invalid credentials', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'An error occurred', 'error');
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    const { username, password, confirmPassword, email } = registerValues;
    console.log('Registering with:', username, password, email); // Log the registration data

    if (!username.trim() || !password.trim() || !confirmPassword.trim() || !email.trim()) {
      Swal.fire('Error', 'Please fill out all the fields', 'error');
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire('Error', 'Passwords don\'t match', 'error');
      return;
    }

    try {
      const response = await axios.post('https://traffoozebackend.vercel.app/register/', {
        username,
        password,
        email, // Include email in the request
        confirmPassword,
      });

      console.log('Register response:', response); // Log the registration response

      if (response.status === 201) {
        Swal.fire('Success', 'Registered successfully', 'success');
        setRegisterValues({ username: '', password: '', confirmPassword: '', email: '' });
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to register. Please try again.', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Grid>
      <Box sx={{ mr: 3 }}>
        {isLoggedIn ? (
          <div>
            <h2>Welcome, User!</h2>
            <Button onClick={handleLogout} variant="contained">
              Logout
            </Button>
          </div>
        ) : (
          <form autoComplete="off" onSubmit={handleLoginSubmit}>
            <Card sx={{ backgroundColor: '#f0f0f0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <CardHeader title="Login" />
              <Divider />
              <CardContent>
                <Stack spacing={3} sx={{ maxWidth: 400 }}>
                  <TextField
                    fullWidth
                    label="Username ID"
                    name="username"
                    onChange={handleLoginChange}
                    required
                    value={loginValues.username}
                    InputProps={{ style: { backgroundColor: '#fff', border: '1px solid #ccc' } }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    onChange={handleLoginChange}
                    required
                    value={loginValues.password}
                    type="password"
                    InputProps={{ style: { backgroundColor: '#fff', border: '1px solid #ccc' } }}
                  />
                </Stack>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained">
                  Login
                </Button>
              </CardActions>
            </Card>
          </form>
        )}
      </Box>

      <Box sx={{ mt: 3, mr: 3 }}>
        <form onSubmit={handleRegisterSubmit}>
          <Card sx={{ backgroundColor: '#f0f0f0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader subheader="Create an account" title="Register" />
            <Divider />
            <CardContent>
              <Stack spacing={3} sx={{ maxWidth: 400 }}>
                <TextField
                  fullWidth
                  label="Username ID"
                  name="username"
                  onChange={handleRegisterChange}
                  required
                  value={registerValues.username}
                  InputProps={{ style: { backgroundColor: '#fff', border: '1px solid #ccc' } }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={handleRegisterChange}
                  required
                  value={registerValues.password}
                  type="password"
                  InputProps={{ style: { backgroundColor: '#fff', border: '1px solid #ccc' } }}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  onChange={handleRegisterChange}
                  required
                  value={registerValues.confirmPassword}
                  type="password"
                  InputProps={{ style: { backgroundColor: '#fff', border: '1px solid #ccc' } }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleRegisterChange}
                  required
                  value={registerValues.email}
                  InputProps={{ style: { backgroundColor: '#fff', border: '1px solid #ccc' } }}
                />
              </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained">
                Register
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Grid>
  );
};

export default AccountProfileDetails;
