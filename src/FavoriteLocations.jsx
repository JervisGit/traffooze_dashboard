import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import LocationForm from './LocationForm';
import Loading from './Loading';
import axios from 'axios';
import { Box, Card, CardContent, CardHeader } from '@mui/material';

const FavoriteLocations = () => {
  const [openNav, setOpenNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    console.log(username);
    if (username) {
      // Simulate loading content for a few seconds
      setTimeout(async () => {
        setIsLoading(false);
        const userFavoriteLocations = await getFavoriteLocationsForUser(username);
        console.log(userFavoriteLocations);
        setFavoriteLocations(userFavoriteLocations);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, []);  

  const getFavoriteLocationsForUser = async () => {
    try {
      const usernameNOW = localStorage.getItem('username');
      const response = await axios.post('https://traffoozebackend.vercel.app/get-address/', {
        username: usernameNOW
      });
  
      if (response.data) {
        const homeAddress = response.data.homeAddress || "None";
        const workAddress = response.data.workAddress || "None";

        const homeLocation = { title: 'Home', address: homeAddress };
        const workLocation = { title: 'Work', address: workAddress };

        return [homeLocation, workLocation];
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error fetching favorite locations", error);
      return [];
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
