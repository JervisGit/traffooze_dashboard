import React from 'react';
import { useEffect, useState } from 'react';
import {
    Card
  } from '@mui/material';
import SideNav from './SideNav';
import BoxMap from './MapBox';
import Loading from './Loading';

const MapContainer = () => {
  const [openNav, setOpenNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading content for a few seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const access_token = process.env.REACT_APP_MAPBOX_API_KEY; 
  return (
    <div className="app-container">
    <div style={{ display: 'flex' }}>
      <SideNav onClose={() => setOpenNav(false)} open={openNav}/> 
      <div style={{ flex: '1', paddingLeft: '300px', paddingTop: '50px'}}>
        
        <BoxMap apiKey={access_token}></BoxMap>
      </div>
    </div>
    {isLoading && <Loading />}
    </div>
  );
};

export default MapContainer;