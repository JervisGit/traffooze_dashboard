import React, { useCallback, useState } from 'react';
import { Box, Button, Stack, Card, CardActions, CardContent, CardHeader, Divider, TextField, Grid } from '@mui/material';
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
  });

  const handleLoginChange = useCallback(
    (event) => {
      setLoginValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleRegisterChange = useCallback(
    (event) => {
      setRegisterValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://traffoozebackend.vercel.app/login', {
        username: loginValues.username,
        password: loginValues.password,
      });
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://traffoozebackend.vercel.app/register', {
        username: registerValues.username,
        password: registerValues.password,
        confirmPassword: registerValues.confirmPassword,
      });
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid>
      <Box sx={{ mr: 3 }}>
        <form autoComplete="off" onSubmit={handleLoginSubmit}>
          <Card sx={{ backgroundColor: '#f0f0f0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader title="Login" />
            <Divider />
            <CardContent>
              <Stack spacing={3} sx={{ maxWidth: 400 }}>
                <TextField
                  fullWidth
                  label="User Name"
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
                  label="User Name"
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
