import React, { useCallback, useState, useEffect } from 'react';
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
    email: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const fetchLoggedInUser = async () => {
    try {
      const response = await axios.get('https://traffoozebackend.vercel.app/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setLoggedInUsername(response.data.username);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLoggedInUser();
    }
  }, [isLoggedIn]);

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

    if (!username.trim() || !password.trim()) {
      Swal.fire('Error', 'Please enter both username and password', 'error');
      return;
    }

    try {
      const response = await axios.post('https://traffoozebackend.vercel.app/login/', {
        username: username,
        password: password,
      });

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
        email,
        confirmPassword,
      });

      if (response.status === 200) {
        Swal.fire('Success', 'Registered successfully', 'success');
        setRegisterValues({ username: '', password: '', email: '' });
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to register. Please try again.', 'error');
    }
  };

  /*const handleLogout = async () => {
    try {
      const response = await axios.post('https://traffoozebackend.vercel.app/logout/', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.status === 200) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setLoggedInUsername('');
        Swal.fire('Success', 'Logged out successfully', 'success');
      } else {
        console.error('Logout failed with status:', response.status);
        Swal.fire('Error', 'Logout failed', 'error');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
      Swal.fire('Error', 'An error occurred during logout', 'error');
    }
  };*/
  
  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setLoggedInUsername('');
      Swal.fire('Success', 'Logged out successfully', 'success');
    } catch (error) {
      console.error('An error occurred during logout:', error);
      Swal.fire('Error', 'An error occurred during logout', 'error');
    }
  };
  
  return (
    <Grid>
      <Box sx={{ mr: 3 }}>
        {isLoggedIn ? (
          <div>
            <h2>Welcome, {loggedInUsername}!</h2>
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
            </Card>          </form>
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
                  label="Email"
                  name="email"
                  onChange={handleRegisterChange}
                  required
                  value={registerValues.email}
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
                
              </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained">
                Register
              </Button>
            </CardActions>
          </Card>        </form>
      </Box>
    </Grid>
  );
};

export default AccountProfileDetails;