import React, { useState, useEffect } from 'react';
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
    newEmail: '',
    newPassword: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
  const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem('username') || '');
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [showUpdateAccountCard, setShowUpdateAccountCard] = useState(localStorage.getItem('token') !== null);
  const [emailToUpdate, setEmailToUpdate] = useState('');
  const [passwordToUpdate, setPasswordToUpdate] = useState('');

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

  useEffect(() => {
    if (isLoggedIn && loggedInUsername && !loggedInEmail) {
      const fetchEmail = async () => {
        try {
          const emailResponse = await axios.get(
            'https://traffoozebackend.vercel.app/get-email-by-username/',
            {
              params: { username: loggedInUsername },
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          if (emailResponse.status === 200) {
            setLoggedInEmail(emailResponse.data.email);
          }
        } catch (emailError) {
          console.error(emailError);
        }
      };

      fetchEmail();
    }
  }, [isLoggedIn, loggedInUsername, loggedInEmail]);

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
        localStorage.setItem('username', username);
        setLoggedInUsername(username);
        setIsLoggedIn(true);
        setShowUpdateAccountCard(true);
  
        // Fetch and set the logged-in user's email
        try {
          const emailResponse = await axios.post(
            'https://traffoozebackend.vercel.app/get-email-by-username/',
            {
              username: username,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
  
          if (emailResponse.data && emailResponse.data.email) {
            setLoggedInEmail(emailResponse.data.email);
          }
        } catch (emailError) {
          console.error('Error fetching email:', emailError);
          Swal.fire('Error', 'Failed to fetch email for the logged-in user', 'error');
        }
  
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


  const validateEmail = (email) => {
    if (!email.trim()) return false;  // Check if email is only spaces
  
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };
  
  const validatePassword = (password) => {
    if (!password.trim()) return false;  // Check if password is only spaces
    return password.length >= 1;
  };

  const handleUpdateAccountSubmit = async (event) => {
    event.preventDefault();
  
    const { newEmail, newPassword } = updateValues;
  
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const username = localStorage.getItem('username'); // Retrieve the username from state

      if (newEmail.length == 0 && newPassword.length == 0) {
        Swal.fire('Error', 'Please enter something to update.', 'error');
        return;
      }
  
      // Only check for email validity if newEmail is provided and not empty
      if (newEmail && newEmail.length > 0 && !validateEmail(newEmail)) {
        Swal.fire('Error', 'Please enter a valid email address.', 'error');
        return;
      }
      
      // Only check for password validity if newPassword is provided and not empty
      if (newPassword && newPassword.length > 0 && !validatePassword(newPassword)) {
        Swal.fire('Error', 'Password must be at least 8 characters long.', 'error');
        return;
      }
  
      const response = await axios.post(
        'https://traffoozebackend.vercel.app/change-password-and-email/',
        {
          username: username,
          email: newEmail ? newEmail : '', 
          password: newPassword ? newPassword : '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        if (newEmail && newEmail.length > 0) {
          // Update loggedInEmail with the new email
          setLoggedInEmail(newEmail);
        }
  
        // Clear newEmail and newPassword in updateValues state
        setUpdateValues({ newEmail: '', newPassword: '' });
  
        Swal.fire('Success', 'Account updated successfully', 'success');
      } else {
        Swal.fire('Error', 'Failed to update account. Please try again.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'An unexpected error occurred. Please try again.', 'error');
    }
  };



  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
      // Make a POST request to the logout API endpoint
      const response = await axios.post('https://traffoozebackend.vercel.app/logout/',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setLoggedInUsername('');
        setLoggedInEmail('');
        setShowUpdateAccountCard(false);
        Swal.fire('Success', 'Logged out successfully', 'success');
      } else {
        Swal.fire('Error', 'Failed to log out. Please try again.', 'error');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
      Swal.fire('Error', 'An unexpected error occurred. Please try again.', 'error');
    }
  };

  return (
    <Grid>
      <Box sx={{ mr: 3 }}>
        {isLoggedIn ? (
          <div>
            <h2>Welcome, {localStorage.getItem('username')}!</h2>
            {showUpdateAccountCard && (
              <Card sx={{ backgroundColor: '#f0f0f0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <CardHeader subheader="Update your account" title="Update Account" />
                <Divider />
                <CardContent>
                  <Stack spacing={3} sx={{ maxWidth: 400 }}>
                  <p>Email: {loggedInEmail}</p>

                  <TextField
                    fullWidth
                    label="New Email"
                    name="newEmail"
                    onChange={handleUpdateChange}
                    value={updateValues.newEmail}
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