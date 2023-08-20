import React, { useState } from 'react';
import { Box, Button, Stack, Card, CardActions, CardContent, CardHeader, Divider, TextField, Grid } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

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

  const [updateValues, setUpdateValues] = useState({
    newUsername: '',
    newPassword: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [showUpdateAccountCard, setShowUpdateAccountCard] = useState(false);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdateValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

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
        setLoggedInUsername(username);
        setIsLoggedIn(true);
        setShowUpdateAccountCard(true);
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

  const handleUpdateAccountSubmit = async (event) => {
    event.preventDefault();

    const { newUsername, newPassword } = updateValues;

    // You can add validation for the update fields here

    try {
      const response = await axios.put(
        'https://traffoozebackend.vercel.app/',
        {
          newUsername,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire('Success', 'Account updated successfully', 'success');
        setUpdateValues({ newUsername: '', newPassword: '' });
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update account. Please try again.', 'error');
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setLoggedInUsername('');
      setLoggedInEmail('');
      setShowUpdateAccountCard(false);
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
            <p>Email: {loggedInEmail}</p>
            {showUpdateAccountCard && (
              <Card sx={{ backgroundColor: '#f0f0f0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <CardHeader subheader="Update your account" title="Update Account" />
                <Divider />
                <CardContent>
                  <Stack spacing={3} sx={{ maxWidth: 400 }}>
                    <TextField
                      fullWidth
                      label="New Username"
                      name="newUsername"
                      onChange={handleUpdateChange}
                      value={updateValues.newUsername}
                      InputProps={{ style: { backgroundColor: '#fff', border: '1px solid #ccc' } }}
                    />
                    <TextField
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      onChange={handleUpdateChange}
                      value={updateValues.newPassword}
                      type="password"
                      InputProps={{ style: { backgroundColor: '#fff', border: '1px solid #ccc' } }}
                    />
                    {/* You can add other fields for updating */}
                  </Stack>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button variant="contained" onClick={handleUpdateAccountSubmit}>
                    Update
                  </Button>
                </CardActions>
              </Card>
            )}
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
        {!isLoggedIn && (
          <form onSubmit={handleRegisterSubmit}>
            <Card sx={{ backgroundColor: '#f0f0f0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <CardHeader subheader="Create an account" title="Register" />
              <Divider />
              <CardContent>
                <Stack spacing={3} sx={{ maxWidth: 400 }}>
                <TextField
                  fullWidth
                  label="Username"
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
            </Card>
          </form>
        )}
      </Box>
    </Grid>
  );
};

export default AccountProfileDetails;
