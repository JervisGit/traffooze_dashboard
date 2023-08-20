import { 
    Box,
    Button,
    Card,
    Grid, 
    Stack, 
    TextField 
} from '@mui/material';

import { GoogleMap, Polyline } from '@react-google-maps/api'
import { useState, useEffect } from 'react'

import axios from 'axios'

import { LoadScript } from '@react-google-maps/api';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

import { AddressAutofill } from '@mapbox/search-js-react';

import Loading from './Loading';

import SideNav from './SideNav';

const apiKey = process.env.REACT_APP_APIKEY;

const access_token = process.env.REACT_APP_MAPBOX_API_KEY;

const api_url = process.env.REACT_APP_ETA_API;

const center = { lat: 1.3521, lng: 103.8198 }

const NavigationMap = () => {
    const [openNav, setOpenNav] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [dateTime, setDateTime] = useState(new Date());
    const [selectedRoute, setSelectedRoute] = useState(null);
  
    const [map, setMap] = useState(null);

    const today = dayjs();
    const tomorrow = dayjs().add(4, 'day').set('hour', 23).set('minute', 50);

    const containerStyle = {
        position: "relative", // Ensure the map container is relatively positioned
        width: "80vw",
        height: "95vh",
      };
    
      const mapBoxStyle = {
        position: "absolute",
        width: "300px",
        height: "200px",
        top: "20px",   // Adjust this value as needed
        left: "20px",  // Adjust this value as needed
        zIndex: 1000,  // Ensure the Box appears above the map
      };

    useEffect(() => {
        // Find the route with the lowest predicted_duration
        if (routes.length > 0) {
            const minPredictedDurationRoute = routes.reduce((minRoute, currentRoute) => {
                const minDuration = parseFloat(minRoute.predicted_duration);
                const currentDuration = parseFloat(currentRoute.predicted_duration);
                return currentDuration < minDuration ? currentRoute : minRoute;
            }, routes[0]);

            setSelectedRoute(minPredictedDurationRoute);
        }
    }, [routes]);

    const geocodeAddress = async (address) => {
        const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${access_token}`;
    
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
    
          if (data.features.length > 0) {
            const [longitude, latitude] = data.features[0].center;

            return { longitude, latitude };

          } else {
            console.error('No results found for the provided address.');
          }
        } catch (error) {
          console.error('Error while geocoding:', error);
        }
    };
    
    const handleApiRequest = async () => {

        setIsLoading(true);
    
        if (origin && destination && dateTime) {
            
            console.log("origin: ", origin);
            console.log("destination: ", destination);
            // Geocode origin and destination

            console.log("api url:", api_url);
            
            const oriLocation = await geocodeAddress(origin);
            const destLocation = await geocodeAddress(destination);

            if (oriLocation && destLocation) {
                const coords = `${oriLocation.longitude},${oriLocation.latitude};${destLocation.longitude},${destLocation.latitude}`;
          
                const formattedDate = dateTime.format('YYYY-MM-DD HH:mm:ss');
                    
                const requestData = {
                  coordinates: coords,
                  timestamp: formattedDate,
                };
          
                console.log("datetime:", requestData);
          
                try {
                  const response = await axios.post(
                    api_url,
                    requestData
                  );
          
                  console.log("Forecast generated successfully:", response.data);
          
                  setRoutes(response.data);

                  setIsLoading(false);

                } catch (error) {
                  console.error("Error generating forecast:", error);
                  setIsLoading(false);
                  window.alert("An error occured, Please make sure you enter valid locations.");
                }
              } else {
                console.log("Error geocoding addresses.");
                setIsLoading(false);
                window.alert("An error occured, Please make sure you enter valid locations.");
              }
            } else {
              console.log("Please select a road, destination, and datetime.");
              setIsLoading(false);
              window.alert("Please select a road, destination, and datetime.");
            }
    };

    return (
        <div className="app-container">
        <div style={{ display: 'flex' , paddingLeft: '290px', paddingTop: '20px'}}>
        <SideNav onClose={() => setOpenNav(false)} open={openNav}/>
        <LoadScript googleMapsApiKey={apiKey}>
            <div style={containerStyle}>
                <GoogleMap 
                    mapContainerStyle={{ width: '100%', height: '100%' }} 
                    center={center} 
                    zoom={12}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        styles: [
                        {
                            featureType: 'poi',
                            elementType: 'labels.icon',
                            stylers: [{ visibility: 'off' }],
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'geometry',
                            stylers: [{ visibility: 'off' }],
                        },
                        ],
                    }}
                    onLoad={map => setMap(map)}
                >
                    {selectedRoute && (
                        <Polyline
                            path={selectedRoute.coord_list.map(coord => ({ lat: coord.lat, lng: coord.lng }))}
                            options={{
                                strokeColor: '#0096FF',
                                strokeOpacity: 1.0,
                                strokeWeight: 5,
                            }}
                        />
                    )}
                </GoogleMap>
                <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
                    {routes.map((route, index) => (
                        <Card
                            key={index}
                            sx={{ margin: '0 10px', padding: '10px', border: '1px solid #ccc', cursor: 'pointer' , bgcolor:'white'}}
                            onClick={() => setSelectedRoute(route)}
                        >   
                            <h3>Route {String.fromCharCode(65 + index)}</h3>
                            <div>Distance: {route.distance} meters</div>
                            <div>Normal Travel Time: {route.normal_duration} mins</div>
                            <div>Predicted Travel Time: {route.predicted_duration} mins</div>
                            <div>Expected Congestion Level: {route.jam_factor}</div>
                            
                        </Card>
                    ))}
                </div>
                <Box sx={mapBoxStyle}>
                <Card
                    position='absolute'
                    top={10}
                    left={10}
                    bgcolor={'white'}
                    display="grid"
                >
                    <Stack spacing={2} style={{ width: '100%' }}>
                        {/*<AddressAutofill 
                            fullWidth
                            accessToken="" 
                            onSelect={(address) => {
                                console.log("Selected address:", address); // Debug logging
                                setOrigin(address.place_name); // Update the origin state with the selected address
                            }}
                        >*/}
                            <TextField label="Origin" value={origin} onChange={e => setOrigin(e.target.value)} fullWidth />
                        {/*</AddressAutofill>*/}
                        {/*<AddressAutofill 
                            fullWidth
                            accessToken=""
                            onSelect={(address) => setDestination(address.place_name)} // Update the destination state with the selected address
                        >*/}    
                            <TextField label="Destination" value={destination} onChange={e => setDestination(e.target.value)} fullWidth />
                        {/*</AddressAutofill>*/}
                    </Stack>
                    <Stack spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                        label="Select Date and Time"
                        minDateTime={today}
                        maxDateTime={tomorrow}
                        onChange={(datetime) => setDateTime(datetime)}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" onClick={handleApiRequest}>
                        Submit
                    </Button>
                    </Stack>
                </Card>
                </Box>
            </div>
        </LoadScript>
        {isLoading && <Loading />}
        </div>
        </div>
    )
  }

export default NavigationMap;