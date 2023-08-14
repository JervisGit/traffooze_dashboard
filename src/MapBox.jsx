import React, { useState } from 'react';
import { Map } from 'react-map-gl';
import { Stack, TextField } from '@mui/material';

const BoxMap = ({ apiKey }) => {
  return (
    <div style={{ position: 'relative', width: 600, height: 400 }}>
    <Map
        mapLib={import('mapbox-gl')}
        initialViewState={{
        longitude: 103.8198,
        latitude: 1.3521,
        zoom: 10
        }}
        style={{width: 1000, height: 800}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken= {apiKey}
    />

    <Stack
        direction="column"
        alignItems="flex-start"
        spacing={2}
        position="absolute"
        top={0}
        left={0}
        p={2}
        zIndex={1}
        bgcolor="white" // Set the background color here
      >
        <TextField label="Starting Point" variant="outlined" margin="dense" />
        <TextField label="Ending Point" variant="outlined" margin="dense" />
      </Stack>
    </div>
  );
};

export default BoxMap;
