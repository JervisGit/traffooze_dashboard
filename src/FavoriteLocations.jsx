import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import LocationForm from './LocationForm';
import Loading from './Loading';
import axios from 'axios';
import { Box, Card, CardContent, CardHeader } from '@mui/material';

const FavoriteLocations = ({ currentUser }) => {
  const [openNav, setOpenNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  useEffect(() => {
    // Simulate loading content for a few seconds
    setTimeout(async () => {
      setIsLoading(false);
      // Assuming currentUser has an identifier (e.g., user ID)
      const userFavoriteLocations = await getFavoriteLocationsForUser(currentUser);
      setFavoriteLocations(userFavoriteLocations);
    }, 1000);
  }, [currentUser]);  

  const getFavoriteLocationsForUser = async (user) => {
    try {
      const username = localStorage.getItem('username');
      
      if(!username) {
        throw new Error("Username not found in local storage");
      }
  
      const response = await axios.post('https://traffoozebackend.vercel.app/get-address/', {
        username: username
      });
  
      if (response.data && response.data.homeAddress && response.data.workAddress) {
        const homeLocation = { title: 'Home', address: response.data.homeAddress };
        const workLocation = { title: 'Work', address: response.data.workAddress };
        return [homeLocation, workLocation];
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error fetching favorite locations", error);
      return []; // Return an empty array in case of an error
    }
  };

  return (
    <div className="app-container">
      <div style={{ display: 'flex' }}>
        <SideNav onClose={() => setOpenNav(false)} open={openNav} />
        <div
          style={{
            flex: '1',
            paddingLeft: '300px',
            paddingTop: '50px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Display Favorite Locations if there's a token in localStorage */}
          {!isLoading && favoriteLocations.length > 0 && localStorage.getItem('token') && (
            <Card sx={{ mb: 2 }}>
              <CardHeader title="Favorite Locations" />
              <CardContent>
                <div className="favorite-locations-list">
                  {favoriteLocations.map((location, index) => (
                    <div className="favorite-location" key={index}>
                      <h3>{location.title}</h3>
                      <p>{location.address}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
  
          {/* Location Form */}
          <Box mt={2}>
            <LocationForm />
          </Box>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default FavoriteLocations;
