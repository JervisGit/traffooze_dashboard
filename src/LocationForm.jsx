import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { AddressAutofill } from '@mapbox/search-js-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const LocationForm = () => {
  const [showHomeFormExpanded, setShowHomeFormExpanded] = useState(false);
  const [showWorkFormExpanded, setShowWorkFormExpanded] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');

  const [homeAddress, setHomeAddress] = useState('');
  const [workAddress, setWorkAddress] = useState('');


  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      // You can add save logic here if needed
    },
    []
  );

  const handleSaveDetails = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username not found!',
      });
      return;
    }

    // Get current addresses
    let currentAddresses = {};
    try {
        const response = await axios.post('https://traffoozebackend.vercel.app/get-address/', { username });
        currentAddresses = response.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error fetching current addresses!',
      });
    }

    // Prepare data for API call
    const data = {
        username: username,
        homeAddress: homeAddress || currentAddresses.homeAddress,
        workAddress: workAddress || currentAddresses.workAddress,
    };

    // Update addresses
    try {
        await axios.post('https://traffoozebackend.vercel.app/update-address/', data);
        Swal.fire('Success', 'Addresses updated successfully!', 'success');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error updating addresses!',
      });
    }
  };

  const handleTextFieldBlur = () => {
    console.log('Text Field Value:', textFieldValue);
  };

  const access_token = process.env.REACT_APP_MAPBOX_API_KEY;

  return (
    <Grid>
    <Box sx={{ mr: 3}}>
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Home" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <Grid style={{ display: showHomeFormExpanded ? 'none' : 'block' }} >
                  <AddressAutofill 
                    fullWidth
                    accessToken={access_token}
                    style={{ height: '100px', padding: '10px' }}
                  >
                    
                    <TextField 
                        fullWidth 
                        label="Address" 
                        value={homeAddress}
                        onChange={(event) => setHomeAddress(event.target.value)}
                    />
                  
                  </AddressAutofill>
                </Grid>
                { !showHomeFormExpanded && 
                  <Button
                  
                  onClick={() => setShowHomeFormExpanded(true)}
                  >
                  Enter an address manually
                  </Button>
                }
                <Grid style={{ display: showHomeFormExpanded ? 'block' : 'none' }}>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address1"
                      required
                    />
                  </Grid>
                  <Grid xs={12} md={6} mt={3}>
                    <TextField
                      fullWidth
                      label="Address Line 2"
                      name="address2"
                    />
                  </Grid>
                  <Grid xs={12} md={6} mt={3}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      required
                    />
                  </Grid>
                  <Grid xs={12} md={6} mt={3}>
                    <TextField
                      fullWidth
                      label="State / Region"
                      name="state"
                      required
                    />
                  </Grid>
                  <Grid xs={12} md={6} mt={3}>
                    <TextField
                      fullWidth
                      label="Zip / Postcode"
                      name="postcode"
                      required
                    />
                  </Grid>
                  <Button
                    onClick={() => setShowHomeFormExpanded(false)}
                    >
                    Search for address
                  </Button>
                </Grid>

              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSaveDetails}>Save details</Button>

        </CardActions>
      </Card>
    </form>
    </Box>

    <Box sx={{ mt: 3, mr: 3}}>
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Work" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <Grid style={{ display: showWorkFormExpanded ? 'none' : 'block' }} >
                <AddressAutofill 
                  fullWidth
                  accessToken={access_token}
                  style={{ height: '100px', padding: '10px' }}
                >
                  
                  <TextField 
                      fullWidth 
                      label="Address" 
                      value={workAddress}
                      onChange={(event) => setWorkAddress(event.target.value)}
                  />


                
                </AddressAutofill>
                </Grid>
                { !showWorkFormExpanded && 
                  <Button
                  
                  onClick={() => setShowWorkFormExpanded(true)}
                  >
                  Enter an address manually
                  </Button>
                }
                <Grid style={{ display: showWorkFormExpanded? 'block' : 'none' }}>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address1"
                      required
                    />
                  </Grid>
                  <Grid xs={12} md={6} mt={3}>
                    <TextField
                      fullWidth
                      label="Address Line 2"
                      name="address2"
                      required
                    />
                  </Grid>
                  <Grid xs={12} md={6} mt={3}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      required
                    />
                  </Grid>
                  <Grid xs={12} md={6} mt={3}>
                    <TextField
                      fullWidth
                      label="State / Region"
                      name="state"
                      required
                    />
                  </Grid>
                  <Grid xs={12} md={6} mt={3}>
                    <TextField
                      fullWidth
                      label="Zip / Postcode"
                      name="postcode"
                      required
                    />
                  </Grid>
                  <Button
                    onClick={() => setShowWorkFormExpanded(false)}
                    >
                    Search for address
                  </Button>
                </Grid>

              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSaveDetails}>Save details</Button>

        </CardActions>
      </Card>
    </form>
    </Box>
  </Grid>
  );
};

export default LocationForm;
