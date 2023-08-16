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

const LocationForm = () => {
  const [showHomeFormExpanded, setShowHomeFormExpanded] = useState(false);
  const [showWorkFormExpanded, setShowWorkFormExpanded] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      // You can add save logic here if needed
    },
    []
  );

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
                      onChange={(event) => setTextFieldValue(event.target.value)}
                      onBlur={handleTextFieldBlur}
                    >
                  
                    </TextField>
                  
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
          <Button variant="contained">Save details</Button>
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
                  >
                
                  </TextField>
                
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
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
    </Box>
  </Grid>
  );
};

export default LocationForm;
