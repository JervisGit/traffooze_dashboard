import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import LocationForm from './LocationForm';
import Loading from './Loading';
import { Box, Card, CardContent, CardHeader } from '@mui/material';

const FavoriteLocations = ({ currentUser }) => {
  const [openNav, setOpenNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  useEffect(() => {
    // Simulate loading content for a few seconds
    setTimeout(() => {
      setIsLoading(false);
      // Assuming currentUser has an identifier (e.g., user ID)
      const userFavoriteLocations = getFavoriteLocationsForUser(currentUser);
      setFavoriteLocations(userFavoriteLocations);
    }, 1000);
  }, [currentUser]);

  const getFavoriteLocationsForUser = (user) => {
    // Replace this with your logic to fetch the user's favorite locations
    // dummy data used 
    const userFavoriteData = {
      home: { title: 'Home', address: '123 Home Street' },
      work: { title: 'Work', address: '456 Work Avenue' },
    };

    return [userFavoriteData.home, userFavoriteData.work];
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
          {/* Display Favorite Locations */}
          {!isLoading && favoriteLocations.length > 0 && (
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
