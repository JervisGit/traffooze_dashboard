import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    firstName: 'Traffooze',
    lastName: 'Admin',
    email: 'traffooze@gmail.com',
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      // You can add save logic here if needed
    },
    []
  );

  return (
    <Grid>
    <Box sx={{ mr: 3}}>
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Account" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
    </Box>
    
    <Box sx={{ mt: 3, mr: 3}}>
    <form onSubmit={handleSubmit}>
    <Card>
      <CardHeader
        subheader="Update password"
        title="Password"
      />
      <Divider />
      <CardContent>
        <Stack
          spacing={3}
          sx={{ maxWidth: 400 }}
        >
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
          />
          <TextField
            fullWidth
            label="Password (Confirm)"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
          />
        </Stack>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained">
          Update
        </Button>
      </CardActions>
    </Card>
  </form>
  </Box>
  </Grid>
  );
};

export default AccountProfileDetails;
