import React from 'react';
import Lottie from 'lottie-react';
import './Loading.css'; // Create this CSS file for styling
//import animationData from './loadingTruck.json'
import animationData from './gradientTruck.json'
import { Typography } from '@mui/material';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="blurred-background"></div>
      <div className="loading-icon">
        {/* Use your preferred loading icon, like a spinner or any other icon */}
        <Lottie animationData={animationData} />
        <Typography variant='body2'>Preparing your data...</Typography>
      </div>
    </div>
  );
};

export default Loading;
